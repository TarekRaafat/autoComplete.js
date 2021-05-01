import { closeList } from "./listController";
import eventEmitter from "../utils/eventEmitter";

// String holders
const keyboardEvent = "keydown";
const ariaSelected = "aria-selected";
const ariaActive = "aria-activedescendant";

/**
 * List navigation function initializer
 *
 * @param {Object} config - autoComplete configurations
 * @param {Object} dataFeedback - Data object
 *
 */
export default (config, dataFeedback) => {
  // Remove previous keyboard Event listener
  config.inputField.removeEventListener(keyboardEvent, config.nav);

  // Reset cursor
  let cursor = -1;

  const classList = config.resultItem.selected.className.split(" ");

  /**
   * Update list item state
   *
   * @param {Object} event - "keydown" event Object
   * @param {Array} list - Array of list items
   * @param {Boolean} state - arrow Down/Up
   *
   */
  const update = (event, list, state) => {
    // Prevent default behaviour
    event.preventDefault();
    // If list is NOT empty
    if (list.length) {
      // If arrow "DOWN" key pressed
      if (state) {
        // Move cursor forward
        cursor++;
      } else {
        // Else if arrow "UP" key pressed
        // Move cursor backwards
        cursor--;
      }
      // Add "active/selected" class to the list item
      addActive(list);
      // Set "aria-activedescendant" value to the selected item
      config.inputField.setAttribute(ariaActive, list[cursor].id);
      /**
       * @emit {navigate} event on results list navigation
       **/
      eventEmitter(event.srcElement, { event, ...dataFeedback, selection: dataFeedback.results[cursor] }, "navigate");
    }
  };

  /**
   * Remove "active" class from all list items
   *
   * @param {Array} list - Array of list items
   *
   */
  const removeActive = (list) => {
    Array.from(list).forEach((item) => {
      // Remove "aria-selected" attribute from the item
      item.removeAttribute(ariaSelected);
      // Remove "selected" class from the item
      if (classList) item.classList.remove(...classList);
    });
  };

  /**
   * Add "selected" class to the selected item
   *
   * @param {Array} list - Array of list items
   *
   */
  const addActive = (list) => {
    // Remove "active" class from all list items
    removeActive(list);
    // Reset cursor to first item
    if (cursor >= list.length) cursor = 0;
    // Move cursor to the next item
    if (cursor < 0) cursor = list.length - 1;
    // Set "aria-selected" value to true
    list[cursor].setAttribute(ariaSelected, true);
    // Add "selected" class to the selected item
    if (classList) list[cursor].classList.add(...classList);
  };

  /**
   * List Navigation Function
   *
   * @param {Object} event - "keydown" event Object
   *
   * @return {void}
   */
  config.nav = (event) => {
    let list = document.getElementById(config.resultsList.idName);

    // Check if list is not opened
    if (list) {
      // Get list items
      list = list.getElementsByTagName(config.resultItem.element);

      // Check pressed key
      switch (event.keyCode) {
        // Down arrow
        case 40:
          update(event, list, 1);
          break;
        // Up arrow
        case 38:
          update(event, list);
          break;
        // Esc
        case 27:
          config.inputField.value = "";
          closeList(config);
          break;
        // Enter
        case 13:
          event.preventDefault();
          // If cursor moved
          if (cursor >= 0) {
            // Simulate a click event on the selected "active" item
            list[cursor].click();
          }
          break;
        // Tab
        case 9:
          closeList(config);
          break;
      }
    }
  };

  /**
   * @listen {keydown} events of inputField
   **/
  config.inputField.addEventListener(keyboardEvent, config.nav);
};
