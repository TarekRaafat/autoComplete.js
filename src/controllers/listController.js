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

  openList(ctx);

  if (matches.length) {
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
  } else if (!resultsList.noResults) {
    // Check if there are NO results
    closeList(ctx);
  }
  // Run custom container function if active
  if (resultsList.container) resultsList.container(list, dataFeedback);
};

/**
 * Open closed list
 *
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
 */

const openList = (ctx) => {
  ctx.wrapper.setAttribute(ariaExpanded, true);
  ctx.input.setAttribute(ariaActive, "");
  ctx.list.removeAttribute("hidden");
  // Set list to opened
  ctx.isOpened = true;

  /**
   * @emit {open} event after results list is opened
   **/
  eventEmitter(ctx, "open");
};

/**
 * Close open list
 *
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
 */
const closeList = (ctx) => {
  // Get autoComplete list
  const list = document.getElementById(ctx.resultsList.idName);
  // Remove open list
  list.setAttribute("hidden", "");
  // Set list to closed
  ctx.isOpened = false;
  // Remove active descendant
  ctx.input.setAttribute(ariaActive, "");
  // Set list to closed
  ctx.wrapper.setAttribute(ariaExpanded, false);

  /**
   * @emit {close} event after "resultsList" is closed
   **/
  eventEmitter(ctx, "close");
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

  closeList(ctx);

  // Return selected value if onSelection is active
  if (ctx.onSelection) ctx.onSelection(dataFeedback);
};

export { renderList, openList, closeList, selectItem };
