const dataAttribute = "data-id";
const select = {
  resultsList: "autoComplete_list",
  result: "autoComplete_result",
  highlight: "autoComplete_highlighted",
  selectedResult: "autoComplete_selected",
};
const keys = {
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

/**
 * Gets the user's input value
 *
 * @param selector
 *
 * @return Element
 */
const getInput = selector => (typeof selector === "string" ? document.querySelector(selector) : selector());

/**
 * Creates the results list HTML tag
 *
 * @param renderResults
 *
 * @return HTMLElement
 */
const createResultsList = renderResults => {
  const resultsList = document.createElement(renderResults.element);
  resultsList.setAttribute("id", select.resultsList);
  if (renderResults.container) {
    renderResults.container(resultsList);
  }
  renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
  return resultsList;
};

/**
 * Highlight matching values
 *
 * @param value
 *
 * @return string
 */
const highlight = value => `<span class=${select.highlight}>${value}</span>`;

/**
 * Adding matching results to the list
 *
 * @param resultsList
 * @param dataSrc
 * @param resultItem
 *
 * @return void
 */
const addResultsToList = (resultsList, dataSrc, resultItem) => {
  const fragment = document.createDocumentFragment();
  dataSrc.forEach((event, record) => {
    const result = document.createElement(resultItem.element);
    const resultIndex = dataSrc[record].index;
    result.setAttribute(dataAttribute, resultIndex);
    result.setAttribute("class", select.result);
    resultItem.content ? resultItem.content(event, result) : (result.innerHTML = event.match || event);
    fragment.appendChild(result);
  });
  resultsList.appendChild(fragment);
};

/**
 * Clears the list of results
 *
 * @param resultsList
 *
 * @return string
 */
const clearResults = resultsList => (resultsList.innerHTML = "");

/**
 * onSelection function
 *
 * @param event
 * @param field
 * @param resultsList
 * @param callback
 * @param resultsValues
 *
 * @return void
 */
const onSelection = (event, field, resultsList, feedback, resultsValues, selection) => {
  // Data feedback function invoked on user selection
  feedback({
    event,
    query: field instanceof HTMLInputElement ? field.value : field.innerHTML,
    matches: resultsValues.matches,
    results: resultsValues.list.map(record => record.value),
    selection: resultsValues.list.find(value => {
      if (event.keyCode === keys.ENTER) {
        return value.index === Number(selection.getAttribute(dataAttribute));
      } else if (event.type === "mousedown") {
        return value.index === Number(event.currentTarget.getAttribute(dataAttribute));
      }
    }),
  });
  // Clear Results after selection is made
  clearResults(resultsList);
};

/**
 * Keyboard Arrow Navigation
 *
 * @param input
 * @param resultsList
 * @param feedback
 * @param resultsValues
 *
 * @return void
 */
const navigation = (input, resultsList, feedback, resultsValues) => {
  // Locals
  const li = resultsList.childNodes,
    liLength = li.length - 1;
  let liSelected = undefined,
    next;
  // Remove selection class
  const removeSelection = direction => {
    liSelected.classList.remove(select.selectedResult);
    if (direction === 1) {
      next = liSelected.nextSibling;
    } else {
      next = liSelected.previousSibling;
    }
  };
  // Add selection class
  const highlightSelection = current => {
    liSelected = current;
    liSelected.classList.add(select.selectedResult);
  };
  // Keyboard action
  input.onkeydown = event => {
    if (li.length > 0) {
      // console.log(liSelected);
      switch (event.keyCode) {
        // Arrow Up
        case keys.ARROW_UP:
          if (liSelected) {
            removeSelection(0);
            if (next) {
              highlightSelection(next);
            } else {
              highlightSelection(li[liLength]);
            }
          } else {
            highlightSelection(li[liLength]);
          }
          break;
        // Arrow Down
        case keys.ARROW_DOWN:
          if (liSelected) {
            removeSelection(1);
            if (next) {
              highlightSelection(next);
            } else {
              highlightSelection(li[0]);
            }
          } else {
            highlightSelection(li[0]);
          }
          break;
        case keys.ENTER:
          if (liSelected) {
            onSelection(event, input, resultsList, feedback, resultsValues, liSelected);
          }
      }
    }
  };
  // Mouse action
  li.forEach(selection => {
    selection.onmousedown = event => onSelection(event, input, resultsList, feedback, resultsValues);
  });
};

export const autoCompleteView = {
  getInput,
  createResultsList,
  highlight,
  addResultsToList,
  navigation,
  clearResults,
};
