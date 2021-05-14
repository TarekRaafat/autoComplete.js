import { selectItem, closeList } from "../controllers/listController";
import eventEmitter from "../helpers/eventEmitter";

let classList;

// String holders
const ariaSelected = "aria-selected";
const ariaActive = "aria-activedescendant";

/**
 * Select result item by index
 *
 * @param {Number} index - of the selected result item
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
 */
const goTo = (index, ctx) => {
  let { list, state } = ctx;
  const results = list.getElementsByTagName(ctx.resultItem.element);

  if (ctx.isOpened && results.length) {
    // Previous cursor state
    state = ctx.cursor;

    // Reset cursor to first item
    if (index >= results.length) index = 0;
    // Move cursor to the last item
    if (index < 0) index = results.length - 1;

    // Current cursor state
    ctx.cursor = index;

    if (state > -1) {
      // Remove "aria-selected" attribute from the item
      results[state].removeAttribute(ariaSelected);
      // Remove "selected" class from the item
      if (classList) results[state].classList.remove(...classList);
    }

    // Set "aria-selected" value to true
    results[index].setAttribute(ariaSelected, true);
    // Add "selected" class to the selected item
    if (classList) results[index].classList.add(...classList);

    // Set "aria-activedescendant" value to the selected item
    ctx.input.setAttribute(ariaActive, results[ctx.cursor].id);
    ctx.dataFeedback.cursor = ctx.cursor;

    // Scroll to selection
    results[index].scrollIntoView({ behavior: ctx.resultsList.scroll || "smooth", block: "center" });

    /**
     * @emit {navigate} event on results list navigation
     **/
    eventEmitter(ctx, "navigate");
  }
};

/**
 * Select next result item
 *
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
 */
const next = function (ctx) {
  const index = ctx.cursor + 1;
  goTo(index, ctx);
};

/**
 * Select previous result item
 *
 * @param {Object} ctx - autoComplete configurations
 *
 * @return {void}
 */
const previous = (ctx) => {
  const index = ctx.cursor - 1;
  goTo(index, ctx);
};

/**
 * List navigation function initializer
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {Object} event - "keydown" Object
 *
 */
const navigate = function (ctx, event) {
  const key = event.keyCode;
  const selectedItem = ctx.resultItem.selected;
  classList = selectedItem ? selectedItem.className.split(" ") : "";

  // Check pressed key
  switch (key) {
    // Down/Up arrow
    case 40:
    case 38:
      event.preventDefault();

      // Move cursor
      key === 40 ? next(ctx) : previous(ctx);

      break;
    // Enter
    case 13:
      event.preventDefault();
      // If cursor moved
      if (ctx.cursor >= 0) {
        selectItem(ctx, event);
      }

      break;
    // Tab
    case 9:
      if (ctx.resultsList.tabSelect && ctx.cursor >= 0) {
        event.preventDefault();

        selectItem(ctx, event);
      } else {
        closeList(ctx);
      }
      break;
    // Esc
    case 27:
      event.preventDefault();

      // Clear input field
      ctx.input.value = "";

      closeList(ctx);
      break;
  }
};

export { navigate, goTo, next, previous };
