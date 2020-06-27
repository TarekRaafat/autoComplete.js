import search from "../services/search";
import createList from "../components/List";
import createItem from "../components/Item";

const closeAllLists = (element, inputField) => {
  // Get all autoCompletejs lists
  const list = document.getElementsByClassName("autoComplete_list");
  // Iterate over all autoCompletejs open lists in the document
  for (let index = 0; index < list.length; index++) {
    // Close all lists
    // except the ones passed as an argument
    if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
  }
};

const generateList = (data, event, inputField) => {
  const inputValue = inputField.value;
  // Initiate creating list proccess
  const list = createList(event.target);
  // Iterate over the data
  data.forEach((value) => {
    // Match query with existing value
    const result = search(inputValue, value, { searchEngine: "strict", highlight: { class: "highlighted" } });
    // If there's a match generate result
    if (result) {
      // create result item
      const resultItem = createItem(result, inputValue);
      // Listen to clicks on this item
      resultItem.addEventListener("click", (event) => {
        // Logs the selected value into console log
        console.log(event.target.innerText);
      });
      // Add result to the list
      list.appendChild(resultItem);
    }
  });
};

export { generateList, closeAllLists };
