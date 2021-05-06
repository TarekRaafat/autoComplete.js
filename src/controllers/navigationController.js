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
  const list = ctx.list.getElementsByTagName(ctx.resultItem.element);

  if (list.length) {
    let state = ctx.state;
    // Previous cursor state
    state = ctx.cursor;
    // Reset cursor to first item
    if (index >= list.length) index = 0;
    // Move cursor to the last item
    if (index < 0) index = list.length - 1;
    // Current cursor state
    ctx.cursor = index;

    if (state > -1) {
      // Remove "aria-selected" attribute from the item
      list[state].removeAttribute(ariaSelected);
      // Remove "selected" class from the item
      if (classList) list[state].classList.remove(...classList);
    }

    // Set "aria-selected" value to true
    list[index].setAttribute(ariaSelected, true);
    // Add "selected" class to the selected item
    if (classList) list[index].classList.add(...classList);

    // Set "aria-activedescendant" value to the selected item
    ctx.input.setAttribute(ariaActive, list[ctx.cursor].id);
    ctx.dataFeedback.cursor = ctx.cursor;

    // Scroll to selection
    ctx.list.scrollTop = list[index].offsetTop - ctx.list.clientHeight + list[index].clientHeight;

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
const next = (ctx) => {
  const index = ctx.cursor + 1;
  ctx.goTo(index, ctx);
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
  ctx.goTo(index, ctx);
};

/**
 * List navigation function initializer
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {Object} event - "keydown" Object
 *
 */
const navigate = (ctx, event) => {
  const key = event.keyCode;
  const selectedResultItem = ctx.resultItem.selected;
  classList = selectedResultItem ? selectedResultItem.className.split(" ") : "";

  // Check pressed key
  switch (key) {
    // Down/Up arrow
    case 40:
    case 38:
      event.preventDefault();
      ctx[key === 40 ? "next" : "previous"](ctx);
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
      // if (ctx.resultsList.tabSelect) {
      //   event.preventDefault();
      //   selectItem(ctx, event);
      // } else {
        closeList(ctx);
      // }
      break;
  }
};

export { navigate, goTo, next, previous };
