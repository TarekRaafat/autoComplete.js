import createList from "../components/List";
import createItem from "../components/Item";

/**
 * Close all open lists
 *
 * @param {Element} element - Current selected element
 * @param {Element} inputField - autoCompleteJS input field
 */
const closeAllLists = (inputField, element) => {
  // Get all autoCompleteJS lists
  const list = document.getElementsByClassName("autoCompleteJS_list");
  // Iterate over all autoCompleteJS open lists in the document
  for (let index = 0; index < list.length; index++) {
    // Close all lists
    // except the ones passed as an argument
    if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
  }
  // Remove active descendant
  inputField.removeAttribute("aria-activedescendant");
  // Set list to closed
  inputField.setAttribute("aria-expanded", false);
};

/**
 * List all matching results
 *
 * @param {Object} data - The available data object
 * @param {Object} config - autoCompleteJS configurations
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
    resultItem.addEventListener("click", () => {
      // Prepare onSelection feedback data object
      const dataFeedback = {
        matches,
        input: data.input,
        query: data.query,
        results: data.results,
        selection: {
          ...item,
          index,
        },
      };
      // Returns the selected value onSelection
      config.onSelection(dataFeedback);
    });
    // Add result to the list
    list.appendChild(resultItem);
  }

  return list;
};

export { generateList, closeAllLists };
