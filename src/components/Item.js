/**
 * List Item element creator
 *
 * @param {String} itemValue - The item value string
 *
 * @return {Element} result - The created item element
 */
export default (itemValue) => {
  // Create a DIV element for each matching result item
  const result = document.createElement("div");
  result.setAttribute("class", "autoComplete_result");
  result.innerHTML = itemValue;
  return result;
};
