/**
 * List Item element creator
 *
 * @param {String} itemValue - The item string value
 * @param {String} itemClass - The item class string value
 * @param {Number} resultIndex - The result item index
 *
 * @return {Element} result - The created item element
 */
export default (itemValue, rawValue, resultIndex, itemClass, content) => {
  // Create a DIV element for each matching result item
  const result = document.createElement("div");
  result.setAttribute("id", `${itemClass}_${resultIndex}`);
  // result.setAttribute("data-value", rawValue);
  result.setAttribute("aria-selected", "false");
  result.setAttribute("class", itemClass);
  result.setAttribute("role", "option");
  result.innerHTML = itemValue;
  if (content) content(rawValue, result);
  return result;
};
