export default (itemValue) => {
  // create a DIV element for each matching element:
  const result = document.createElement("div");
  result.setAttribute("class", "autoComplete_result");
  result.innerHTML = itemValue;
  return result;
};
