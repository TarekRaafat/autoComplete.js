/**
 * List element creator
 *
 * @param {Object} config - autoComplete configurations
 *
 * @return {Element} list - The created list element
 */
export default (config) => {
  // Create a DIV element that will contain the results items
  const list = document.createElement(config.resultsList.element);
  list.setAttribute("id", config.resultsList.idName);
  list.setAttribute("aria-label", config.name);
  list.setAttribute("class", config.resultsList.className);
  list.setAttribute("role", "listbox");
  list.setAttribute("tabindex", "-1");
  if (config.resultsList.container) config.resultsList.container(list);
  const destination =
    "string" === typeof config.resultsList.destination
      ? document.querySelector(config.resultsList.destination)
      : config.resultsList.destination();
  // Append the DIV element as a child of autoComplete container
  destination.insertAdjacentElement(config.resultsList.position, list);
  return list;
};
