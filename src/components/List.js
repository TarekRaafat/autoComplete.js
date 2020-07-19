/**
 * List element creator
 *
 * @param {Element} to - The list parent element
 * @param {Element} listClass - The list class string value
 * @param {String} itemClass - The item class string value
 *
 * @return {Element} list - The created list element
 */
export default (to, config) => {
  console.log(config);
  // Create a DIV element that will contain the results items
  const list = document.createElement("div");
  list.setAttribute("id", config.listId);
  list.setAttribute("aria-expanded", true);
  list.setAttribute("aria-labelledby", config.listId);
  list.setAttribute("class", config.listClass);
  list.setAttribute("role", "listbox");
  list.setAttribute("tabindex", "-1");
  if (config.container) container(list);
  // Append the DIV element as a child of autoCompleteJS container
  to.parentNode.appendChild(list);
  return list;
};
