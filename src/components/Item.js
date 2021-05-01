/**
 * List Item element creator
 *
 * @param {String} itemValue - The item string value
 * @param {Number} resultIndex - The result item index
 * @param {Object} config - autoComplete configurations
 *
 * @return {Element} - The created result item element
 */
export default (data, index, config) => {
  const item = document.createElement(config.resultItem.element);
  // Setting item element attributes
  item.setAttribute("id", `${config.resultItem.idName}_${index}`);
  item.setAttribute("class", config.resultItem.className);
  item.setAttribute("role", "option");

  item.innerHTML = data.match;
  // If custom content is active pass params
  if (config.resultItem.content) config.resultItem.content(data, item);

  return item;
};
