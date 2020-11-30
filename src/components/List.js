/**
 * List element creator
 *
 * @param {Object} config - autoCompleteJS configurations
 *
 * @return {Element} list - The created list element
 */
export default (config) => {
  // Create a DIV element that will contain the results items
  const list = document.createElement(config.resultsList.element);
  list.setAttribute("id", config.resultsList.idName);
  // list.setAttribute("aria-expanded", true);
  list.setAttribute("aria-labelledby", config.name);
  list.setAttribute("class", config.resultsList.className);
  list.setAttribute("role", "listbox");
  list.setAttribute("tabindex", "-1");
  if (config.resultsList.container) config.resultsList.container(list);
  // Append the DIV element as a child of autoCompleteJS container
  config.inputField.parentNode.appendChild(list);
  return list;
};
