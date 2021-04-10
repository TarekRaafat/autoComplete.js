import { closeList } from "./listController";
import eventEmitter from "../utils/eventEmitter";

// Navigation keyboard event type
const keyboardEvent = "keydown";

/**
 * List navigation function initializer
 *
 * @param {Object} config - autoComplete configurations
 * @param {Object} dataFeedback - The available data object
 *
 */
const navigate = (config, dataFeedback) => {
  // Reset focus state
  let currentFocus = -1;

  /**
   * Update list item state
   *
   * @param {Object} event - The `keydown` event Object
   * @param {Array <elements>} list - The array of list items
   * @param {Boolean} state - Of the arrow Down/Up
   *
   */
  const update = (event, list, state) => {
    event.preventDefault();
    if (state) {
      // If the arrow DOWN or TAB key is pressed
      // increase the currentFocus
      currentFocus++;
    } else {
      // If the arrow UP or TAB key is pressed
      // decrease the currentFocus
      currentFocus--;
    }
    // and add "active" class to the list item
    addActive(list);
    config.inputField.setAttribute("aria-activedescendant", list[currentFocus].id);
    /**
     * @emits {navigate} Emits Event on results list navigation
     **/
    eventEmitter(
      event.srcElement,
      { event, ...dataFeedback, selection: dataFeedback.results[currentFocus] },
      "navigate"
    );
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
      list[index].removeAttribute("aria-selected");
      // list[index].setAttribute("aria-selected", "false");
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
    // Add "active" class to a list item
    if (!list) return false;
    // Remove "active" class from all list items
    removeActive(list);
    if (currentFocus >= list.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = list.length - 1;
    // Add "active" class to the item
    list[currentFocus].setAttribute("aria-selected", "true");
    if (config.resultItem.selected.className) list[currentFocus].classList.add(config.resultItem.selected.className);
  };

  /**
   * List Navigation Function
   *
   * @param {Object} event - The `keydown` event Object
   *
   */
  const navigation = (event) => {
    let list = document.getElementById(config.resultsList.idName);

    // Check if list is not opened
    if (!list) {
      // Remove keyboard event listener
      config.inputField.removeEventListener(keyboardEvent, navigate);
    } else {
      // Get list items
      list = list.getElementsByTagName(config.resultItem.element);

      // Check pressed key
      switch (event.keyCode) {
        case 27:
          // If the ESC key is pressed
          // Clear Input value
          config.inputField.value = "";
          // Closes open list
          closeList(config);
          break;
        case 9:
        case 40:
          // Update list items state
          update(event, list, true);
          break;
        case 38:
          // Update list items state
          update(event, list, false);
          break;
        case 13:
          // If the ENTER key is pressed
          // prevent the form from its default behaviour "being submitted"
          event.preventDefault();
          if (currentFocus > -1) {
            // Simulate a click on the selected "active" item
            list[currentFocus].click();
            // Closes open list
            closeList(config);
          }
          break;
      }
    }
  };

  // Navigator pointer
  const navigate = config.resultsList.navigation || navigation;

  // Remove previous keydown listener
  if (config.inputField.autoCompleteNavigate)
    config.inputField.removeEventListener(keyboardEvent, config.inputField.autoCompleteNavigate);
  config.inputField.autoCompleteNavigate = navigate;

  /**
   * @listens {keydown} Listens to all `keydown` events on the input field
   **/
  config.inputField.addEventListener(keyboardEvent, navigate);
};

export { navigate };
