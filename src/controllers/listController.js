import createList from "../components/List";
import createItem from "../components/Item";
import eventEmitter from "../utils/eventEmitter";

/**
 * Close all open lists
 *
 * @param {Object} config - autoComplete configurations
 * @param {Element} element - Current selected element
 *
 */
const closeList = (config, element) => {
  // Get autoComplete list
  const list = document.getElementById(config.resultsList.idName);
  if (list && element !== config.inputField) {
    // Remove open list
    list.remove();
    // Remove active descendant
    config.inputField.removeAttribute("aria-activedescendant");
    // Set list to closed
    config.inputField.setAttribute("aria-expanded", false);
    /**
     * @emits {close} Emits Event on list close
     **/
    eventEmitter(config.inputField, null, "close");
  }
};

/**
 * List all matching results
 *
 * @param {Object} config - autoComplete configurations
 * @param {Object|Array} data - The available data object
 * @param {Array} matches - autoComplete configurations
 *
 * @return {Component} - The matching results list component
 */
const generateList = (config, data, matches) => {
  // Results list element
  let list = document.getElementById(config.resultsList.idName);

  // Check if there is a rendered list
  if (list) {
    // Clear list
    list.innerHTML = "";
  } else {
    // Create new list
    list = createList(config);
  }
  // Set list to opened
  config.inputField.setAttribute("aria-expanded", true);
  // Check if there are results
  if (matches.length) {
    // Iterate over the data
    for (let index = 0; index < data.results.length; index++) {
      const item = data.results[index];
      // create result item
      const resultItem = createItem(item, index, config);
      // Listen to clicks on this item
      resultItem.addEventListener("click", (event) => {
        // Prepare onSelection feedback data object
        const dataFeedback = {
          event,
          matches,
          input: data.input,
          query: data.query,
          results: data.results,
          selection: {
            ...item,
            index,
          },
        };
        // Returns the selected value onSelection if set
        if (config.onSelection) config.onSelection(dataFeedback);
      });
      // Add result to the list
      list.appendChild(resultItem);
    }
  } else {
    // Check if there are NO results
    // Run noResults action function
    if (!config.resultsList.noResults) {
      list.remove();
    } else {
      config.resultsList.noResults(list, data.query);
    }
  }
};

export { generateList, closeList };
