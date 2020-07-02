/**
 * List element creator
 *
 * @param to
 *
 * @return list
 */
export default (to) => {
  // Create a DIV element that will contain the results items
  const list = document.createElement("div");
  list.setAttribute("id", "autoComplete_list");
  list.setAttribute("class", "autoComplete_list");
  // Append the DIV element as a child of autoCompleteJS container
  to.parentNode.appendChild(list);
  return list;
};
