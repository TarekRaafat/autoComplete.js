import { selectors } from "./selectors";

// Gets the user's input value
const getSearchInput = () => selectors.input;

// Creats the results list HTML tag
const createResultsList = listContainer => {
	const list = document.createElement("ul");
	list.setAttribute("class", "autoComplete_results_list");
	listContainer.appendChild(list);
};

// Creates results list container
const createResultsListContainer = () => {
	const listContainer = document.createElement("div");
	listContainer.setAttribute("class", "autoComplete_results_list_container");
	selectors.input.insertAdjacentElement("afterend", listContainer);
	createResultsList(listContainer);
};
createResultsListContainer();

// Adding matching results to the list
const addResultsToList = (results, cleanResults, dataAttribute) => {
	let resState;
	const resList = document.querySelector(".autoComplete_results_list");

	results.forEach((event, record) => {
		const result = document.createElement("li");
		result.setAttribute(`data-${dataAttribute.tag}`, dataAttribute.value || cleanResults[record]);
		result.setAttribute("tabindex", record + 1);
		if (results.length === 1) {
			resState = "autoComplete_result autoComplete_single_result";
		} else {
			resState = "autoComplete_result";
		}
		result.setAttribute("id", cleanResults[record]);
		result.setAttribute("class", resState);
		result.innerHTML = results[record];
		resList.appendChild(result);
	});
};

// Clears user input
const clearInput = () => (selectors.input.value = "");

// Clears the list of results
const clearResults = () => {
	const resList = document.querySelector(".autoComplete_results_list");
	resList.innerHTML = "";
};

// Toggle event for search input
// showing & hidding results list onfocus / blur
["focus", "blur"].forEach(eventType => {
	const result = document.querySelector(".autoComplete_results_list");
	selectors.input.addEventListener(eventType, () => {
		if (eventType === "blur") {
			result.style = "opacity: 0;";
			setTimeout(() => {
				result.style = "display: none;s";
			}, 1000);
		} else {
			result.style = "opacity: 1; visibility: visible;";
		}
	});
});

// Gets user selection
const getSelection = value => {
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
			selectors.input.setAttribute(
				"placeholder",
				`${event.target.closest(".autoComplete_result").id.length > 13 ? event.target.closest(".autoComplete_result").id.slice(0, 13) +
					"..." : event.target.closest(".autoComplete_result").id}`
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