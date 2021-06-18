import { create } from "../helpers/io";
import eventEmitter from "../helpers/eventEmitter";

let classes;

// String holders
const Expand = "aria-expanded";
const Active = "aria-activedescendant";
const Selected = "aria-selected";

/**
 * Data feedback object constructor
 *
 * @param {Object} ctx - autoComplete.js context
 * @param {Number} index - of the selected result item
 */
const feedback = (ctx, index) => {
  ctx.feedback.selection = {
    index,
    ...ctx.feedback.results[index],
  };
};

/**
 * Render list of matching results
 *
 * @param {Object} ctx - autoComplete.js context
 */
const render = (ctx) => {
  let { resultsList, list, resultItem, feedback } = ctx;
  const { query, matches, results } = feedback;

  // Reset cursor
  ctx.cursor = -1;

  // Clear list
  list.innerHTML = "";

  if (matches.length || resultsList.noResults) {
    const fragment = document.createDocumentFragment();

    // Generate results elements
    results.forEach((result, index) => {
      // Create new list item
      const element = create(resultItem.tag, {
        id: `${resultItem.id}_${index}`,
        role: "option",
        innerHTML: result.match,
        inside: fragment,
        ...(resultItem.class && { class: resultItem.class }),
      });

      // If custom content is active pass params
      if (resultItem.element) resultItem.element(element, result);
    });

    // Add fragment of result items to DOM list
    list.append(fragment);

    // Run custom container function if active
    if (resultsList.element) resultsList.element(list, feedback);

    open(ctx);
  } else {
    // Check if there are NO results
    close(ctx);
  }
};

/**
 * Open closed list
 *
 * @param {Object} ctx - autoComplete.js context
 */
const open = (ctx) => {
  if (ctx.isOpen) return;
  // Set expanded attribute on the parent to true
  (ctx.wrapper || ctx.input).setAttribute(Expand, true);
  // Remove hidden attribute from list
  ctx.list.removeAttribute("hidden");
  // Set list to opened
  ctx.isOpen = true;

  /**
   * @emit {open} event after results list is opened
   **/
  eventEmitter("open", ctx);
};

/**
 * Close opened list
 *
 * @param {Object} ctx - autoComplete.js context
 */
const close = (ctx) => {
  if (!ctx.isOpen) return;
  // Set expanded attribute on the parent to false
  (ctx.wrapper || ctx.input).setAttribute(Expand, false);
  // Add input active descendant attribute
  ctx.input.setAttribute(Active, "");
  // Add hidden attribute from list
  ctx.list.setAttribute("hidden", "");
  // Set list to closed
  ctx.isOpen = false;

  /**
   * @emit {close} event after "resultsList" is closed
   **/
  eventEmitter("close", ctx);
};

/**
 * Go to result item by index
 *
 * @param {Number} index - of the selected result item
 * @param {Object} ctx - autoComplete.js context
 */
const goTo = (index, ctx) => {
  const results = ctx.list.getElementsByTagName(ctx.resultItem.tag);

  if (ctx.isOpen && results.length) {
    // Previous cursor state
    const state = ctx.cursor;

    // Reset cursor to first item if exceeding end of list
    if (index >= results.length) index = 0;
    // Move cursor to the last item if exceeding beginning of list
    if (index < 0) index = results.length - 1;

    // Current cursor position
    ctx.cursor = index;

    if (state > -1) {
      // Remove "aria-selected" attribute from the item
      results[state].removeAttribute(Selected);
      // Remove "selected" class from the item
      if (classes) results[state].classList.remove(...classes);
    }

    // Set "aria-selected" value to true
    results[index].setAttribute(Selected, true);
    // Add "selected" class to the selected item
    if (classes) results[index].classList.add(...classes);

    // Set "aria-activedescendant" value to the selected item
    ctx.input.setAttribute(Active, results[ctx.cursor].id);

    // Scroll to selection
    ctx.list.scrollTop = results[index].offsetTop - ctx.list.clientHeight + results[index].clientHeight + 5;

    // Prepare Selection data feedback object
    ctx.feedback.cursor = ctx.cursor;
    feedback(ctx, index);

    /**
     * @emit {navigate} event on results list navigation
     **/
    eventEmitter("navigate", ctx);
  }
};

/**
 * Go to next result item
 *
 * @param {Object} ctx - autoComplete.js context
 */
const next = function (ctx) {
  const index = ctx.cursor + 1;
  goTo(index, ctx);
};

/**
 * Go to previous result item
 *
 * @param {Object} ctx - autoComplete.js context
 */
const previous = (ctx) => {
  const index = ctx.cursor - 1;
  goTo(index, ctx);
};

/**
 * Select result item with given index or current cursor
 *
 * @param {Object} ctx - autoComplete.js context
 * @param {Object} event - of selection
 * @param {Number} index - of the selected result item
 */
const select = (ctx, event, index) => {
  // Check if cursor within list range
  index = index >= 0 ? index : ctx.cursor;

  // Prevent empty selection
  if (index < 0) return;

  // Prepare Selection data feedback object
  ctx.feedback.event = event;
  feedback(ctx, index);

  /**
   * @emit {selection} event on result item selection
   **/
  eventEmitter("selection", ctx);

  close(ctx);
};

/**
 * Click selection handler
 *
 * @param {Object} event - "Click" event object
 * @param {Object} ctx - autoComplete.js context
 */
const click = (event, ctx) => {
  const itemTag = ctx.resultItem.tag.toUpperCase();
  const items = Array.from(ctx.list.querySelectorAll(itemTag));
  const item = event.target.closest(itemTag);

  // Check if clicked item is a "result" item
  if (item && item.nodeName === itemTag) {
    event.preventDefault();

    const index = items.indexOf(item);

    select(ctx, event, index);
  }
};

/**
 * List navigation handler
 *
 * @param {Object} event - "keydown" press event Object
 * @param {Object} ctx - autoComplete.js context
 */
const navigate = function (event, ctx) {
  const key = event.keyCode;
  const selected = ctx.resultItem.selected;

  if (selected) classes = selected.split(" ");

  // Check pressed key
  switch (key) {
    // Down/Up arrow
    case 40:
    case 38:
      event.preventDefault();

      // Move cursor based on pressed key
      key === 40 ? next(ctx) : previous(ctx);

      break;
    // Enter
    case 13:
      event.preventDefault();

      // If cursor moved
      if (ctx.cursor >= 0) {
        select(ctx, event);
      }

      break;
    // Tab
    case 9:
      if (ctx.resultsList.tabSelect && ctx.cursor >= 0) {
        event.preventDefault();

        select(ctx, event);
      } else {
        close(ctx);
      }
      break;
    // Esc
    case 27:
      event.preventDefault();

      // Clear "input" value
      ctx.input.value = "";

      close(ctx);
      break;
  }
};

export { render, open, click, navigate, goTo, next, previous, select, close };
