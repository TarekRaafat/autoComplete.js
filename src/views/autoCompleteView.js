// Gets the user's input value
const getSearchInput = () => document.querySelector("#autoComplete");

// Creats the results list HTML tag
const createResultsList = () => {
	const list = document.createElement("ul");
	list.setAttribute("class", "autoComplete_results_list");
	getSearchInput().insertAdjacentElement("afterend", list);
};
createResultsList();

// Adding matching results to the list
const addResultsToList = (results, cleanResults, dataAttribute) => {
	let resultState;
	const resultsList = document.querySelector(".autoComplete_results_list");

	results.forEach((event, record) => {
		const result = document.createElement("li");
		result.setAttribute(`data-${dataAttribute.tag}`, dataAttribute.value || cleanResults[record]);
		resultState = results.length === 1 ? "autoComplete_result autoComplete_single_result" : "autoComplete_result";
		result.setAttribute("id", cleanResults[record]);
		result.setAttribute("class", resultState);
		result.innerHTML = results[record];
		resultsList.appendChild(result);
	});
};

// Clears user input
const clearInput = () => getSearchInput().value = "";

// Clears the list of results
const clearResults = () => {
	const resultsList = document.querySelector(".autoComplete_results_list");
	resultsList.innerHTML = "";
};

// Gets user selection
const getSelection = (value) => {
	const results = document.querySelectorAll(".autoComplete_result");
	results.forEach(selection => {
		selection.addEventListener("click", event => {
			// value(event.target.closest(".autoComplete_result"));
			value(event.target.closest(".autoComplete_result"));
			// Clear Input after selection is made
			clearInput();
			//Clear Results after selection is made
			clearResults();
			// Set placeholder with the selected value
			// after checking the value length and validate it
			getSearchInput().setAttribute(
				"placeholder",
				`${event.target.closest(".autoComplete_result").id}`
			);
		});
	});
};

// Error message render to UI
const error = error => {
	document.querySelector("body").innerHTML = `
		<div class="autoComplete_error">
			<div class="autoComplete_message">${error}</div>
		</div>
	`;
};

export const renderResults = {
	getSearchInput,
	addResultsToList,
	getSelection,
	clearInput,
	clearResults,
	error
};