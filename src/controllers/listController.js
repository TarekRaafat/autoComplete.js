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

  openList(ctx);
  // Reset cursor
  ctx.cursor = -1;

  if (matches.length) {
    const fragment = document.createDocumentFragment();
    // Generate results
    results.forEach((item, index) => {
      // Create new list
      const result = create(resultItem.element, {
        id: `${resultItem.idName}_${index}`,
        class: resultItem.className,
        role: "option",
        innerHTML: item.match,
      });
      // If custom content is active pass params
      if (resultItem.content) resultItem.content(item, result);
      // Add result to fragment before DOM
      fragment.appendChild(result);
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
  // Set list to opened
  ctx.list.removeAttribute("hidden");
  ctx.wrapper.setAttribute(ariaExpanded, true);
  // Remove "aria-activedescendant" attribute
  ctx.input.setAttribute(ariaActive, "");
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
  index = index > -1 ? index : ctx.cursor;

  // Get selected list item
  const list = ctx.list.getElementsByTagName(ctx.resultItem.element);
  const item = list[index];
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
  // Return selected value if onSelection is active
  if (ctx.onSelection) ctx.onSelection(dataFeedback);
  closeList(ctx);
};

export { renderList, openList, closeList, selectItem };
