import create from "../helpers/creator";
import eventEmitter from "../helpers/eventEmitter";

// String holders
const ariaExpanded = "aria-expanded";
const ariaActive = "aria-activedescendant";

/**
 * List all matching results
 *
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {Component} - Results list component
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
        class: resultItem.className,
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
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
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
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
 */
const closeList = (ctx) => {
  if (ctx.isOpened) {
    // Get autoComplete results list
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

/**
 * Select result item
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {Object} event - of selection
 * @param {Number} index - of the selected result item
 *
 * @return {void}
 */
const selectItem = (ctx, event, index) => {
  // Check if cursor within list range
  index = index > -1 ? index : ctx.cursor;

  const data = ctx.dataFeedback;

  // Prepare onSelection data feedback object
  const dataFeedback = {
    event,
    ...data,
    selection: {
      ...data.results[index],
      index,
    },
  };

  // Pass selection data value to "onSelection" if active
  if (ctx.onSelection) ctx.onSelection(dataFeedback);

  closeList(ctx);
};

export { renderList, openList, closeList, selectItem };
