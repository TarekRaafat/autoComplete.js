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
 * @param {Object} dataFeedback - The available data object
 *
 */
export default (config, dataFeedback) => {
  // Remove previous keyboard Event listener
  config.inputField.removeEventListener(keyboardEvent, config.nav);

  // Reset cursor state
  let cursor = -1;

  /**
   * Update list item state
   *
   * @param {Object} event - The `keydown` event Object
   * @param {Array <elements>} list - The array of list items
   * @param {Boolean} state - Of the arrow Down/Up
   *
   */
  const update = (event, list, state) => {
    // prevent default behaviour
    event.preventDefault();
    // If list is NOT empty
    if (list.length) {
      // If the arrow `DOWN` key is pressed
      if (state) {
        // increase the cursor
        cursor++;
      } else {
        // Else if the arrow `UP` key is pressed
        // decrease the cursor
        cursor--;
      }
      // and add "active" class to the list item
      addActive(list);
      config.inputField.setAttribute(ariaActive, list[cursor].id);
      /**
       * @emit {navigate} Emit Event on results list navigation
       **/
      eventEmitter(event.srcElement, { event, ...dataFeedback, selection: dataFeedback.results[cursor] }, "navigate");
    }
  };

  /**
   * Remove list item active state
   *
   * @param {Array <elements>} list - The array of list items
   *
   */
  const removeActive = (list) => {
    // Remove "active" class from all list items
    for (let index = 0; index < list.length; index++) {
      // Remove "active" class from the item
      list[index].removeAttribute(ariaSelected);
      // Remove "selected" class from the item
      if (config.resultItem.selected.className) list[index].classList.remove(config.resultItem.selected.className);
    }
  };

  /**
   * Add active state to list item
   *
   * @param {Array <elements>} list - The array of list items
   *
   */
  const addActive = (list) => {
    // Remove "active" class from all list items
    removeActive(list);
    // Reset selection to first item
    if (cursor >= list.length) cursor = 0;
    // Move selection to the next item
    if (cursor < 0) cursor = list.length - 1;
    // Add "active" class to the current item
    list[cursor].setAttribute(ariaSelected, true);
    // Add "selected" class to the current item
    if (config.resultItem.selected.className) list[cursor].classList.add(config.resultItem.selected.className);
  };

  /**
   * List Navigation Function
   *
   * @param {Object} event - The `keydown` event Object
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
        case 40: // Down arrow
          update(event, list, 1);
          break;
        case 38: // Up arrow
          update(event, list);
          break;
        case 27: // Esc
          config.inputField.value = "";
          closeList(config);
          break;
        case 13: // Enter
          event.preventDefault();
          // If cursor moved
          if (cursor >= 0) {
            // Simulate a click on the selected "active" item
            list[cursor].click();
          }
          break;
        case 9: // Tab
          closeList(config);
          break;
      }
    }
  };

  /**
   * @listen {keydown} Listen to all `keydown` events on the inputField
   **/
  config.inputField.addEventListener(keyboardEvent, config.nav);
};
