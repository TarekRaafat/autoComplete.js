/**
 * List Item element creator
 *
 * @param {String} itemValue - The item string value
 * @param {String} itemClass - The item class string value
 * @param {Number} resultIndex - The result item index
 *
 * @return {Element} result - The created item element
 */
export default (item, index, config) => {
  // Create a DIV element for each matching result item
  const result = document.createElement(config.resultItem.element);
  result.setAttribute("id", `${config.resultItem.className}_${index}`);
  result.setAttribute("class", config.resultItem.className);
  result.setAttribute("role", "option");
  result.innerHTML = item.match;
  if (config.resultItem.content) config.resultItem.content(item.value, result);
  return result;
};
