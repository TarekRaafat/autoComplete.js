let resultsList;

// Gets the user's input value
const getInput = selector => typeof selector === 'string' ? document.querySelector(selector) : selector();

// Creats the results list HTML tag
const createResultsList = renderResults => {
	resultsList = document.createElement("ul");
	resultsList.setAttribute("id", "autoComplete_results_list");
	renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
};

// Hightlight matching values
const highlight = value => `<span class="autoComplete_highlighted">${value}</span>`;

// Adding matching results to the list
const addResultsToList = (dataSrc, dataKey, dataAttribute) => {
	dataSrc.forEach((event, record) => {
		const result = document.createElement("li");
		const resultValue = dataSrc[record].source[dataKey] || dataSrc[record].source;
		result.setAttribute(`data-${dataAttribute.tag}`, dataAttribute.value || resultValue);
		result.setAttribute("id", resultValue);
		result.setAttribute("class", "autoComplete_result");
		result.innerHTML = dataSrc[record].match || dataSrc[record];
		resultsList.appendChild(result);
	});
};

// Clears user input
const clearInput = selector => (getInput(selector).value = "");

// Clears the list of results
const clearResults = () => (resultsList.innerHTML = "");

// Gets user selection
const getSelection = (field, callback, resultsValues, dataKey) => {
	const results = document.querySelectorAll(".autoComplete_result");
	results.forEach(selection => {
		selection.addEventListener("mousedown", event => {
			// Callback function invoked on user selection
			callback({
				query: getInput(field).value,
				results: resultsValues.map(record => record.source),
				selection: resultsValues.find(value => {
					const resValue = value.source[dataKey] || value.source;
					return resValue === event.target.closest(".autoComplete_result").id;
				}).source
			});
			// Clear Input after selection is made
			clearInput(field);
			// Clear Results after selection is made
			clearResults();
		});
	});
};

// Error message render to UI
const error = error => {
	document.querySelector("body").innerHTML = `<div class="autoComplete_error">${error}</div>`;
};

export const autoCompleteView = {
	getInput,
	createResultsList,
	highlight,
	addResultsToList,
	getSelection,
	clearResults,
	error
};