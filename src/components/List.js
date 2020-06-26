export default (to) => {
  // create a DIV element that will contain the items (values):
  const list = document.createElement("div");
  list.setAttribute("id", "autoComplete_list");
  list.setAttribute("class", "autoComplete_list");
  // append the DIV element as a child of the autocomplete container:
  to.parentNode.appendChild(list);
  return list;
};
