import create from "../helpers/creator";
import eventEmitter from "../helpers/eventEmitter";

// String holders
const ariaExpanded = "aria-expanded";
const ariaActive = "aria-activedescendant";

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

  // Clear list
  list.innerHTML = "";

  // Reset cursor
  ctx.cursor = -1;

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

      // If custom content is active pass params
      if (resultItem.content) resultItem.content(element, result);

      // Add result to fragment before DOM
      fragment.appendChild(element);
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
    ctx.wrapper.setAttribute(ariaExpanded, true);
    // Reset input active descendant attribute
    ctx.input.setAttribute(ariaActive, "");
    // Remove hidden attribute from list
    ctx.list.removeAttribute("hidden");
    // Set list to opened
    ctx.isOpened = true;

    /**
     * @emit {open} event after results list is opened
     **/
    eventEmitter(ctx, "open");
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
    // Get autoComplete.js results list
    const list = document.getElementById(ctx.resultsList.idName);
    // Set expanded attribute on the wrapper to false
    ctx.wrapper.setAttribute(ariaExpanded, false);
    // Add input active descendant attribute
    ctx.input.setAttribute(ariaActive, "");
    // Add hidden attribute from list
    list.setAttribute("hidden", "");
    // Set list to closed
    ctx.isOpened = false;

    /**
     * @emit {close} event after "resultsList" is closed
     **/
    eventEmitter(ctx, "close");
  }
};

export { renderList, openList, closeList };
