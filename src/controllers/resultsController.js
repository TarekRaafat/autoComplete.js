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
 * @param {Object|Array} data - Data object
 *
 * @return {Component} - Results list component
 */
export default (config, data) => {
  const { query, matches, results } = data;
  const input = config.inputField;
  const resultsList = config.resultsList;

  // Results list element
  let list = document.getElementById(config.resultsList.idName);

  // Check if there is a rendered list
  if (list) {
    list.innerHTML = "";
    // Remove "aria-activedescendant" attribute
    input.removeAttribute(ariaActive);
  } else {
    // Create new list
    list = createList(config);
    // Set list to opened
    input.setAttribute(ariaExpanded, true);
    /**
     * @emit {open} event after results list is opened
     **/
    eventEmitter(input, data, "open");
  }

  if (matches.length) {
    results.forEach((item, index) => {
      const resultItem = createItem(item, index, config);
      resultItem.addEventListener(clickEvent, (event) => {
        // Prepare onSelection data feedback object
        const dataFeedback = {
          event,
          ...data,
          selection: {
            ...item,
            index,
          },
        };
        // Return selected value if onSelection is active
        if (config.onSelection) config.onSelection(dataFeedback);
      });
      list.appendChild(resultItem);
    });
  } else {
    // Check if there are NO results
    if (!resultsList.noResults) {
      closeList(config);
      // Set list to closed
      input.setAttribute(ariaExpanded, false);
    } else {
      // Run "noResults" action function
      resultsList.noResults(list, query);
    }
  }

  // Run custom container function if active
  if (resultsList.container) resultsList.container(list, data);
  // Initialize list navigation controls
  resultsList.navigation ? resultsList.navigation(list) : navigation(config, data);

  /**
   * @desc
   * Listen for all "click" events in the document
   * and close list if clicked outside "resultsList" or "inputField"
   * @listen {click} events of the entire document
   **/
  document.addEventListener(clickEvent, (event) => closeList(config, event.target));
};
