import createList from "../components/List";
import createItem from "../components/Item";
import navigation from "./navigationController";
import { closeList } from "./listController";
import eventEmitter from "../utils/eventEmitter";

// String holders
const clickEvent = "click";
const ariaExpanded = "aria-expanded";
const ariaActive = "aria-activedescendant";

/**
 * List all matching results
 *
 * @param {Object} config - autoComplete configurations
 * @param {Object|Array} data - The available data object
 *
 * @return {Component} - The matching results list component
 */
export default (config, data) => {
  const { input, query, matches, results } = data;
  // Results list element
  let list = document.getElementById(config.resultsList.idName);

  // Check if there is a rendered list
  if (list) {
    list.innerHTML = "";
    // Remove active descendant
    config.inputField.removeAttribute(ariaActive);
  } else {
    // Create new list
    list = createList(config);
    // Set list to opened
    config.inputField.setAttribute(ariaExpanded, true);
    /**
     * @emit {open} Emit Event after results list is opened
     **/
    eventEmitter(config.inputField, data, "open");
  }

  if (matches.length) {
    results.forEach((item, index) => {
      const resultItem = createItem(item, index, config);
      resultItem.addEventListener(clickEvent, (event) => {
        // Prepare onSelection feedback data object
        const dataFeedback = {
          event,
          ...data,
          selection: {
            ...item,
            index,
          },
        };
        // Returns the selected value onSelection if set
        if (config.onSelection) config.onSelection(dataFeedback);
      });
      list.appendChild(resultItem);
    });
  } else {
    // Check if there are NO results
    if (!config.resultsList.noResults) {
      closeList(config);
      // Set list to closed
      config.inputField.setAttribute(ariaExpanded, false);
    } else {
      // Run noResults action function
      config.resultsList.noResults(list, query);
    }
  }

  // If custom container is set pass the list
  if (config.resultsList.container) config.resultsList.container(list, data);
  // Initialize list navigation controls
  if (config.resultsList.navigation) 
    config.resultsList.navigation(list)
  else
    navigation(config, data);

  /**
   * @desc
   * Listen for all `click` events in the document
   * and close list if clicked outside the list and inputField
   * @listen {click} Listen to all `click` events on the document
   **/
  document.addEventListener(clickEvent, (event) => closeList(config, event.target));
};
