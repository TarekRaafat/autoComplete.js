const dataAttribute = "data-result";
const select = {
  resultsList: "autoComplete_results_list",
  result: "autoComplete_result",
  highlight: "autoComplete_highlighted",
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
  dataSrc.forEach((event, record) => {
    const result = document.createElement(resultItem.element);
    const resultValue = dataSrc[record].value[event.key] || dataSrc[record].value;
    result.setAttribute(dataAttribute, resultValue);
    result.setAttribute("class", select.result);
    result.setAttribute("tabindex", "1");
    resultItem.content ? resultItem.content(event, result) : (result.innerHTML = event.match || event);
    resultsList.appendChild(result);
  });
};

/**
 * Keyboard Arrow Navigation
 *
 * @param selector
 * @param resultsList
 */
const navigation = (selector, resultsList) => {
  const input = getInput(selector);
  const first = resultsList.firstChild;
  document.onkeydown = event => {
    // if (!event.target.matches(selector)) {return;}
    const active = document.activeElement;
    switch (event.keyCode) {
      // Arrow Up
      case 38:
        if (active !== first && active !== input) {
          active.previousSibling.focus();
        } else if (active === first) {
          input.focus();
        }
        break;
      // Arrow Down
      case 40:
        if (active === input && resultsList.childNodes.length > 0) {
          first.focus();
        } else if (active !== resultsList.lastChild) {
          active.nextSibling.focus();
        }
        break;
    }
  };
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
 * Gets user selection
 *
 * @param field
 * @param resultsList
 * @param callback
 * @param resultsValues
 */
const getSelection = (field, resultsList, callback, resultsValues) => {
  const results = resultsList.querySelectorAll(`.${select.result}`);
  Object.keys(results).forEach(selection => {
    ["mousedown", "keydown"].forEach(eventType => {
      results[selection].addEventListener(eventType, event => {
        if (eventType === "mousedown" || event.keyCode === 13 || event.keyCode === 39) {
          // Callback function invoked on user selection
          callback({
            event,
            query:
              getInput(field) instanceof HTMLInputElement ? getInput(field).value : getInput(field).innerHTML,
            matches: resultsValues.matches,
            results: resultsValues.list.map(record => record.value),
            selection: resultsValues.list.find(value => {
              const resValue = value.value[value.key] || value.value;
              return resValue === event.target.closest(`.${select.result}`).getAttribute(dataAttribute);
            }),
          });
          // Clear Results after selection is made
          clearResults(resultsList);
        }
      });
    });
  });
};

export const autoCompleteView = {
  getInput,
  createResultsList,
  highlight,
  addResultsToList,
  navigation,
  clearResults,
  getSelection,
};
