import { closeAllLists } from "./listController";
import eventEmitter from "../utils/eventEmitter";

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
   * @param {Object} config - autoComplete configurations
   *
   */
  const update = (event, list, state, config) => {
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
     * @emits {navigation} Emits Event on results list navigation
     **/
    eventEmitter(
      event.srcElement,
      { event, ...dataFeedback, selection: dataFeedback.results[currentFocus] },
      "navigation"
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
      if (config.selection.className) list[index].classList.remove(config.selection.className);
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
    if (config.selection.className) list[currentFocus].classList.add(config.selection.className);
  };

  /**
   * List Navigation Function
   *
   * @param {Object} event - The `keydown` event Object
   *
   */
  const navigation = (event) => {
    let list = document.getElementById(config.resultsList.idName);

    if (!list) return config.inputField.removeEventListener("keydown", navigate);

    list = list.getElementsByTagName(config.resultItem.element);

    if (event.keyCode === 27) {
      // If the ESC key is pressed
      // Clear Input value
      config.inputField.value = "";
      // Closes open lists
      closeAllLists(config);
    } else if (event.keyCode === 40 || event.keyCode === 9) {
      // Update list items state
      update(event, list, true, config);
    } else if (event.keyCode === 38 || event.keyCode === 9) {
      // Update list items state
      update(event, list, false, config);
    } else if (event.keyCode === 13) {
      // If the ENTER key is pressed
      // prevent the form from its default behaviour "being submitted"
      event.preventDefault();
      if (currentFocus > -1) {
        // and simulate a click on the selected "active" item
        if (list) list[currentFocus].click();
      }
    }
  };

  const navigate = config.resultsList.navigation || navigation;

  // Remove previous keydown listener
  if (config.inputField.autoCompleteNavigate)
    config.inputField.removeEventListener("keydown", config.inputField.autoCompleteNavigate);
  config.inputField.autoCompleteNavigate = navigate;

  /**
   * @listens {keydown} Listens to all `keydown` events on the input field
   **/
  config.inputField.addEventListener("keydown", navigate);
};

export { navigate };
