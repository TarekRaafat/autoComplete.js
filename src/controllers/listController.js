import { create } from "../helpers/io";
import eventEmitter from "../helpers/eventEmitter";

// String holders
const Expanded = "aria-expanded";
const Active = "aria-activedescendant";

/**
 * List all matching results
 *
 * @param {Object} ctx - autoComplete.js configurations
 *
 * @returns {Component} - Results list component
 */
const renderList = (ctx) => {
  let { resultsList, list, resultItem, dataFeedback } = ctx;
  const { query, matches, results } = dataFeedback;

  // Reset cursor
  ctx.cursor = -1;

  // Clear list
  list.innerHTML = "";

  if (matches.length || resultsList.noResults) {
    const fragment = document.createDocumentFragment();

    // Generate results elements
    results.forEach((result, index) => {
      // Create new list item
      const element = create(resultItem.element, {
        id: `${resultItem.idName}_${index}`,
        ...(resultItem.className && { class: resultItem.className }),
        role: "option",
        innerHTML: result.match,
      });

      // Add result to fragment before DOM
      fragment.appendChild(element);

      // If custom content is active pass params
      if (resultItem.content) resultItem.content(element, result);
    });

    // Add fragment of result items to DOM list
    list.appendChild(fragment);

    // Run custom container function if active
    if (resultsList.container) resultsList.container(list, dataFeedback);

    openList(ctx);
  } else {
    // Check if there are NO results
    closeList(ctx);
  }
};

/**
 * Open closed list
 *
 * @param {Object} ctx - autoComplete.js configurations
 *
 * @returns {void}
 */

const openList = (ctx) => {
  if (!ctx.isOpened) {
    // Set expanded attribute on the wrapper to true
    ctx.wrapper.setAttribute(Expanded, true);
    // Reset input active descendant attribute
    ctx.input.setAttribute(Active, "");
    // Remove hidden attribute from list
    ctx.list.removeAttribute("hidden");
    // Set list to opened
    ctx.isOpened = true;

    /**
     * @emit {open} event after results list is opened
     **/
    eventEmitter("open", ctx);
  }
};

/**
 * Close open list
 *
 * @param {Object} ctx - autoComplete.js configurations
 *
 * @returns {void}
 */
const closeList = (ctx) => {
  if (ctx.isOpened) {
    // Set expanded attribute on the wrapper to false
    ctx.wrapper.setAttribute(Expanded, false);
    // Add input active descendant attribute
    ctx.input.setAttribute(Active, "");
    // Add hidden attribute from list
    ctx.list.setAttribute("hidden", "");
    // Set list to closed
    ctx.isOpened = false;

    /**
     * @emit {close} event after "resultsList" is closed
     **/
    eventEmitter("close", ctx);
  }
};

export { renderList, openList, closeList };
