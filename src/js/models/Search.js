import { renderResults as searchView } from "../views/searchView";
import { selectors } from "../views/selectors";
import { isBoolean, isNumber, isString } from "util";

export default class Search {
	constructor(config) {
		// Source of data list
		this.dataSrc = Array.isArray(config.dataSrc)
			? config.dataSrc
			: searchView.error(
				"<strong>Error</strong>, <strong>data source</strong> value is not an <strong>Array</string>."
			);
		// Placeholder text
		this.placeHolder = isString(config.placeHolder)
			? config.placeHolder
			: "Search ...";
		// Maximum number of results to show
		this.maxNum = isNumber(config.maxNum) ? config.maxNum : 10;
		// Highlighting matching results
		this.highlight = isBoolean(config.highlight) ? config.highlight : true;
		// Assign data attribute tag & value if set in object
		this.dataAttribute =
			typeof config.dataAttribute === "object" &&
				config.dataAttribute.constructor === Object
				? {
					tag: config.dataAttribute.tag,
					value: config.dataAttribute.value
				}
				: { tag: "autocomplete", value: "" };
		// Action function on result selection
		this.onSelection =
			typeof config.onSelection === "function"
				? config.onSelection
				: searchView.error(
					"<strong>Error</strong>, <strong>onSelection</strong> value is not a <strong>Function</string>."
				);

		// Starts the app Enigne
		this.init();
	}

	// Checks if the data source is valid
	dataSourceValidation(value) {
		return Array.isArray(value);
	}

	// Checks user's input search value validity
	searchInputValidation(selector) {
		// Input field handler fires an event onKeyup action
		selector.addEventListener("keyup", event => {
			// event.preventDefault();
			// Check if input is not empty or just have space before triggering the app
			if (selector.value.length > 0 && selector.value !== " ") {
				// clear results list
				searchView.clearResults();
				// List matching results
				this.listMatchedResults();
				// Gets user's selection
				searchView.getSelection(this.onSelection);
			} else {
				// clears all results list
				searchView.clearResults();
			}
		});
	}

	// List all matching results
	listMatchedResults() {
		// Final highlighted results list of array
		this.resList = [];

		// Final clean results list of array
		this.cleanResList = [];

		// Holds the input search value
		let inputValue = searchView.getSearchInput().value;

		try {
			// Checks input matches in data source
			this.dataSrc.filter(record => {
				if (record.toLowerCase().includes(inputValue.toLowerCase())) {
					if (this.highlight) {
						this.activateHighlight(record);
						this.cleanResList.push(record);
					} else {
						this.resList.push(record);
						this.cleanResList.push(record);
					}
				}
			});
		} catch (error) {
			searchView.error(error);
		}
		// Rendering matching results to the UI list
		searchView.addResultsToList(
			this.resList.slice(0, this.maxNum),
			this.cleanResList.slice(0, this.maxNum),
			this.dataAttribute
		);
	}

	// Placeholder setting function
	setPlaceHolder() {
		selectors.input.setAttribute("placeholder", this.placeHolder);
	}

	// Highlight matching results function
	activateHighlight(value) {
		// Replaces matching input with highlighted result
		let highlighted = value
			.toLowerCase()
			.replace(
				selectors.input.value.toLowerCase(),
				`<span class="autoComplete_highlighted_result">${selectors.input.value}</span>`
			);

		// Pushes matching results to the final list of array
		this.resList.push(highlighted);
	}

	// Starts the app Enigne
	init() {
		try {
			// If the data source is valid run the app else error
			if (this.dataSourceValidation(this.dataSrc)) {
				this.setPlaceHolder();
				this.searchInputValidation(searchView.getSearchInput());
			}
		} catch (error) {
			searchView.error(
				"<strong>error</strong>, autoComplete <strong>engine</strong> is not <strong>starting</strong>..."
			);
		}
	}
}