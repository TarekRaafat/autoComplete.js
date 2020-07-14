/**
 * List Item element creator
 *
 * @param {String} itemValue - The item string value
 * @param {String} itemClass - The item class string value
 *
 * @return {Element} result - The created item element
 */
export default (itemValue, rawValue, itemClass, content) => {
  // Create a DIV element for each matching result item
  const result = document.createElement("div");
  result.setAttribute("class", itemClass);
  result.setAttribute("role", "option");
  result.innerHTML = itemValue;
  if (content) content(rawValue, result);
  return result;
};
