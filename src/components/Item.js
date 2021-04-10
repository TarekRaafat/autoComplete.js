/**
 * List Item element creator
 *
 * @param {String} itemValue - The item string value
 * @param {Number} resultIndex - The result item index
 * @param {Object} config - autoComplete configurations
 *
 * @returns {Element} - The created result item element
 */
export default (item, index, config) => {
  // Create a DIV element for each matching result item
  const result = document.createElement(config.resultItem.element);
  result.setAttribute("id", `${config.resultItem.idName}_${index}`);
  result.setAttribute("class", config.resultItem.className);
  result.setAttribute("role", "option");
  result.innerHTML = item.match;
  // If custom content set pass params
  if (config.resultItem.content) config.resultItem.content(item, result);

  return result;
};
