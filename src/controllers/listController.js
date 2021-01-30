import createList from "../components/List";
import createItem from "../components/Item";

/**
 * Close all open lists
 *
 * @param {Object} config - autoComplete configurations
 * @param {Element} element - Current selected element
 *
 */
const closeAllLists = (config, element) => {
  // Get all autoComplete lists
  const list = document.getElementsByClassName(config.resultsList.className);
  // Iterate over all autoComplete open lists in the document
  for (let index = 0; index < list.length; index++) {
    // Close all lists
    // except the ones passed as an argument
    if (element !== list[index] && element !== config.inputField) list[index].parentNode.removeChild(list[index]);
  }
  // Remove active descendant
  config.inputField.removeAttribute("aria-activedescendant");
  // Set list to closed
  config.inputField.setAttribute("aria-expanded", false);
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
  // Initiate creating list process
  const list = createList(config);
  // Set list to opened
  config.inputField.setAttribute("aria-expanded", true);
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

  return list;
};

export { generateList, closeAllLists };
