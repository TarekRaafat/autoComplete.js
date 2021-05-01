/**
 * List element creator
 *
 * @param {Object} config - autoComplete configurations
 *
 * @return {Element} - The created list element
 */
export default (config) => {
  const list = document.createElement(config.resultsList.element);
  // Setting list element attributes
  list.setAttribute("id", config.resultsList.idName);
  list.setAttribute("class", config.resultsList.className);
  list.setAttribute("role", "listbox");
  // List rendering destination
  const destination =
    "string" === typeof config.resultsList.destination
      ? document.querySelector(config.resultsList.destination)
      : config.resultsList.destination();
  // Append the DIV element as a child of autoComplete container
  destination.insertAdjacentElement(config.resultsList.position, list);

  return list;
};
