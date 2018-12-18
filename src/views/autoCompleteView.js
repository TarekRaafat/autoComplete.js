// Gets the user's input value
const getSearchInput = () => document.querySelector("#autoComplete");

// Creats the results list HTML tag
const createResultsList = renderResults => {
	const list = document.createElement("ul");
	list.setAttribute("id", "autoComplete_results_list");
	renderResults.destination.insertAdjacentElement(renderResults.position, list);
};

// Hightlight matching values
const highlight = value => {
	return `<span class="autoComplete_highlighted_result">${value}</span>`;
};

// Adding matching results to the list
const addResultsToList = (results, cleanResults, dataAttribute) => {
	const resultsList = document.querySelector("#autoComplete_results_list");

	results.forEach((event, record) => {
		const result = document.createElement("li");
		result.setAttribute(
			`data-${dataAttribute.tag}`,
			dataAttribute.value || cleanResults[record]
		);
		result.setAttribute("id", cleanResults[record]);
		result.setAttribute("class", "autoComplete_result");
		result.innerHTML = results[record];
		resultsList.appendChild(result);
	});
};

// Clears user input
const clearInput = () => (getSearchInput().value = "");

// Clears the list of results
const clearResults = () => {
	const resultsList = document.querySelector("#autoComplete_results_list");
	resultsList.innerHTML = "";
};

// Gets user selection
const getSelection = value => {
	const results = document.querySelectorAll(".autoComplete_result");
	results.forEach(selection => {
		selection.addEventListener("mousedown", event => {
			// value(event.target.closest(".autoComplete_result"));
			value(event.target.closest(".autoComplete_result"));
			// Clear Input after selection is made
			clearInput();
			// Clear Results after selection is made
			clearResults();
		});
	});
};

// Error message render to UI
const error = error => {
	document.querySelector("body").innerHTML = `<div class="autoComplete_error"><div class="autoComplete_message"><strong>Error</strong>, ${error}</div></div>`;
};

export const renderResults = {
	getSearchInput,
	createResultsList,
	highlight,
	addResultsToList,
	getSelection,
	clearResults,
	error,
};
