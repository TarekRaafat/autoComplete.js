/**
 * List Item element creator
 *
 * @param {String} itemValue - The item string value
 * @param {String} itemClass - The item class string value
 * @param {Number} resultIndex - The result item index
 *
 * @return {Element} result - The created item element
 */
export default (itemValue, rawValue, resultIndex, config) => {
  // Create a DIV element for each matching result item
  const result = document.createElement(config.resultItem.element);
  result.setAttribute("id", `${config.resultItem.className}_${resultIndex}`);
  // result.setAttribute("data-value", rawValue);
  result.setAttribute("aria-selected", "false");
  result.setAttribute("class", config.resultItem.className);
  result.setAttribute("role", "option");
  result.innerHTML = itemValue;
  if (config.resultItem.content) config.resultItem.content(rawValue, result);
  return result;
};
