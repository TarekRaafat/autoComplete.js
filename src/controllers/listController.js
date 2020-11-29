import createList from "../components/List";
import createItem from "../components/Item";

/**
 * Close all open lists
 *
 * @param {Element} element - Current selected element
 * @param {Element} inputField - autoCompleteJS input field
 */
const closeAllLists = (element, inputField) => {
  // Get all autoCompleteJS lists
  const list = document.getElementsByClassName("autoComplete_list");
  // Iterate over all autoCompleteJS open lists in the document
  for (let index = 0; index < list.length; index++) {
    // Close all lists
    // except the ones passed as an argument
    if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
  }
};

/**
 * List all matching results
 *
 * @param {Object} data - The available data object
 * @param {Object} config - autoCompleteJS configurations
 * @param {Function} feedback - The callback function on user's selection for API
 */
const generateList = (data, config, feedback) => {
  // Initiate creating list process
  const list = createList(config);
  // Iterate over the data
  for (let index = 0; index < data.length; index++) {
    const result = data[index].match;
    // create result item
    const resultItem = createItem(
      result,
      data[index].value,
      index,
      config.resultItem.className,
      config.resultItem.content
    );
    // Listen to clicks on this item
    resultItem.addEventListener("click", () => {
      // Prepare onSelection feedback data object
      const onSelectionData = {
        input: config.rawInputValue,
        query: config.queryInputValue,
        results: data,
        selection: data[index].value,
      };
      // Returns the selected value onSelection
      feedback(onSelectionData);
    });
    // Add result to the list
    list.appendChild(resultItem);
  }

  return list;
};

export { generateList, closeAllLists };
