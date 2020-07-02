/**
 * List Item element creator
 *
 * @param itemValue
 *
 * @return result
 */
export default (itemValue) => {
  // Create a DIV element for each matching result item
  const result = document.createElement("div");
  result.setAttribute("class", "autoComplete_result");
  result.innerHTML = itemValue;
  return result;
};
