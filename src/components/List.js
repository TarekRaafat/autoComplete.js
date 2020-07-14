/**
 * List element creator
 *
 * @param {Element} to - The list parent element
 * @param {Element} listClass - The list class string value
 *
 * @return {Element} list - The created list element
 */
export default (to, listClass, container) => {
  // Create a DIV element that will contain the results items
  const list = document.createElement("div");
  list.setAttribute("id", "autoComplete_list");
  list.setAttribute("class", listClass);
  list.setAttribute("role", "listbox");
  list.setAttribute("tabindex", "-1");
  if (container) container(list);
  // Append the DIV element as a child of autoCompleteJS container
  to.parentNode.appendChild(list);
  return list;
};
