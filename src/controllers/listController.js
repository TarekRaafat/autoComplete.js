import search from "../services/search";
import createList from "../components/List";
import createItem from "../components/Item";
import onSelection from "./selectionController";

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
 * @param data
 * @param event
 * @param { inputValue, searchEngine, highlight }
 *
 * @return {*}
 */
const generateList = (data, event, { inputValue, searchEngine, highlight , feedback}) => {
  // Initiate creating list process
  const list = createList(event.target);
  // Iterate over the data
  data.forEach((value) => {
    // Match query with existing value
    const result = search(inputValue, value, { searchEngine, highlight });
    // If there's a match generate result
    if (result) {
      // create result item
      const resultItem = createItem(result, inputValue);
      // Listen to clicks on this item
      resultItem.addEventListener("click", (event) => {
        // Returns the selected value onSelection
        onSelection(event, inputValue, data, feedback);
      });
      // Add result to the list
      list.appendChild(resultItem);
    }
  });
};

export { generateList, closeAllLists };
