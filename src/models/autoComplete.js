import { autoCompleteView } from "../views/autoCompleteView";

export default class autoComplete {
	constructor(config) {
		// User input Selector
		this.selector = config.selector || "#autoComplete";
		// Source of data list
		this.data = {
			src: () => (typeof config.data.src === "function" ? config.data.src() : config.data.src),
			key: config.data.key
		};
		// Search engine type
		this.searchEngine = config.searchEngine === "loose" ? "loose" : "strict";
		// Minimum characters length before engine starts rendering
		this.threshold = config.threshold || 0;
		// Rendered results destination
		this.renderResults = autoCompleteView.createResultsList({
			destination: config.renderResults
				? config.renderResults.destination
				: autoCompleteView.getInput(this.selector),
			position: config.renderResults ? config.renderResults.position : "afterend"
		});
		// Placeholder text
		this.placeHolder = config.placeHolder || "";
		// Maximum number of results to show
		this.maxResults = config.maxResults || 5;
		// Highlighting matching results
		this.highlight = config.highlight || false;
		// Assign data attribute tag & value if set in object
		this.dataAttribute = {
			tag: config.dataAttribute ? config.dataAttribute.tag : "autocomplete",
			value: config.dataAttribute ? config.dataAttribute.value : ""
		};
		// Action function on result selection
		this.onSelection = config.onSelection;
		// Starts the app Enigne
		this.init();
	}

	// Search common characters within record
	search(query, record) {
		const recordLowerCase = record.toLowerCase();
		// Loose mode
		if (this.searchEngine === "loose") {
			// Search query string sanitized & normalized
			query = query.replace(/ /g, "");
			// Array of matching characters
			const match = [];
			// Query character position based on success
			let searchPosition = 0;
			// Iterate over record characters
			for (let number = 0; number < recordLowerCase.length; number++) {
				// Holds current record character
				let recordChar = recordLowerCase[number];
				// Matching case
				if (searchPosition < query.length && recordChar === query[searchPosition]) {
					// Highlight matching character
					recordChar = this.highlight ? autoCompleteView.highlight(recordChar) : recordChar;
					// Increment search position
					searchPosition++;
				}
				// Adds matching character to the matching list
				match.push(recordChar);
			}
			// Non-Matching case
			if (searchPosition !== query.length) {
				return false;
			}
			// Return the joined match
			return match.join("");
			// Strict mode
		} else {
			if (recordLowerCase.includes(query)) {
				// If Highlighted
				if (this.highlight) {
					const inputValue = autoCompleteView.getInput(this.selector).value.toLowerCase();
					return recordLowerCase.replace(inputValue, autoCompleteView.highlight(inputValue));
					// If NOT Hightligthed
				} else {
					return recordLowerCase;
				}
			}
		}
	}

	// List all matching results
	listMatchedResults(data) {
		// Final highlighted results list of array
		this.resList = [];
		// Holds the input search value
		const inputValue = autoCompleteView.getInput(this.selector).value.toLowerCase();
		// Checks input has matches in data source
		data.filter(record => {
			const match = this.search(inputValue, record[this.data.key] || record);
			if (match) {
				this.resList.push({ match, source: record });
			}
		});
		const list = this.resList.slice(0, this.maxResults);
		// Rendering matching results to the UI list
		autoCompleteView.addResultsToList(list, this.data.key, this.dataAttribute);
		// Returns rendered list
		return list;
	}

	ignite(data) {
		// If the data source is valid run the app
		if (this.data.src()) {
			// Placeholder setter
			autoCompleteView.getInput(this.selector).setAttribute("placeholder", this.placeHolder);
			// Specified Input field selector
			const input = autoCompleteView.getInput(this.selector);
			// Input field handler fires an event onKeyup action
			input.addEventListener("keyup", () => {
				// Check if input is not empty or just have space before triggering the app
				if (input.value.length > this.threshold && input.value !== " ") {
					// clear results list
					autoCompleteView.clearResults();
					// List matching results
					const list = this.listMatchedResults(data);
					// Gets user's selection
					// If action configured
					if (this.onSelection) {
						autoCompleteView.getSelection(this.selector, this.onSelection, list, this.data.key);
					}
				} else {
					// clears all results list
					autoCompleteView.clearResults();
				}
			});
		}
	}

	// Starts the app Enigne
	init() {
		try {
			// Data source is Async
			if (this.data.src() instanceof Promise) {
				// Return Data
				return this.data.src().then(data => this.ignite(data));
				// Data source is Array/Function
			} else {
				// Return Data
				return this.ignite(this.data.src());
			}
		} catch (error) {
			// Error in Engine failure
			autoCompleteView.error(error);
		}
	}
}