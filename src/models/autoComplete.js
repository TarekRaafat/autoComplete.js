import { renderResults as autoCompleteView } from "../views/autoCompleteView";

export default class autoComplete {
	constructor(config) {
		// Source of data list
		this.dataSrc = () => {
			if (Array.isArray(config.dataSrc)) {
				return config.dataSrc;
			} else if (Array.isArray(config.dataSrc())) {
				return config.dataSrc();
			} else {
				autoCompleteView.error(
					"<strong>Error</strong>, <strong>data source</strong> value is not an <strong>Array</string>."
				);
			}
		};
		// Search engine type
		this.searchEngine = config.searchEngine === "loose" ? "loose" : "strict";
		// Rendered results destination
		this.renderResults = autoCompleteView.createResultsList(
			config.renderResults
				? {
					destination: config.renderResults.destination,
					position: config.renderResults.position
				}
				: {
					destination: autoCompleteView.getSearchInput(),
					position: "afterend"
				}
		);
		// Placeholder text
		this.placeHolder = String(config.placeHolder) ? config.placeHolder : false;
		// Maximum number of results to show
		this.maxResults = Number(config.maxResults) ? config.maxResults : 10;
		// Highlighting matching results
		this.highlight = config.highlight === true ? true : false;
		// Assign data attribute tag & value if set in object
		this.dataAttribute =
			config.dataAttribute === Object
				? {
					tag: config.dataAttribute.tag,
					value: config.dataAttribute.value
				}
				: { tag: "autocomplete", value: "" };
		// Action function on result selection
		this.onSelection =
			typeof config.onSelection === "function"
				? config.onSelection
				: autoCompleteView.error(
					"<strong>Error</strong>, <strong>onSelection</strong> value is not a <strong>Function</string>."
				);
		// Starts the app Enigne
		this.init();
	}

	// Search common characters within record
	search(query, record) {
		// Loose mode
		if (this.searchEngine === "loose") {
			// Search query string sanitized & normalized
			query = query.replace(/ /g, "").toLowerCase();
			// Array of matching characters
			let match = [];
			// Query character position based on success
			let searchPosition = 0;
			// Iterate over record characters
			for (let number = 0; number < record.length; number++) {
				// Holds current record character
				let recordChar = record[number];
				// Matching case
				if (
					searchPosition < query.length &&
					recordChar.toLowerCase() === query[searchPosition]
				) {
					if (this.highlight) {
						// Highlight matching character
						recordChar =
							"<span class=\"autoComplete_highlighted_result\">" +
							recordChar +
							"</span>";
						// Increment search position
						searchPosition++;
					} else {
						// Unhighlighted matching character
						recordChar;
						// Increment search position
						searchPosition++;
					}
				}
				// Adds matching character to the matching list
				match.push(recordChar);
			}
			// Non-Matching case
			if (searchPosition !== query.length) {
				return "";
			}
			// Return the joined match
			return match.join("");
			// Strict mode
		} else {
			if (record.toLowerCase().includes(query.toLowerCase())) {
				// If Highlighted
				if (this.highlight) {
					this.resList.push(
						record
							.toLowerCase()
							.replace(
								autoCompleteView.getSearchInput().value.toLowerCase(),
								`<span class="autoComplete_highlighted_result">${autoCompleteView
									.getSearchInput()
									.value.toLowerCase()}</span>`
							)
					);
					this.cleanResList.push(record);
					// If NOT Hightligthed
				} else {
					this.resList.push(record);
					this.cleanResList.push(record);
				}
			}
		}
	}

	// List all matching results
	listMatchedResults() {
		// Final highlighted results list of array
		this.resList = [];
		// Final clean results list of array
		this.cleanResList = [];
		// Holds the input search value
		let inputValue = autoCompleteView.getSearchInput().value;

		try {
			// Checks input matches in data source
			this.dataSrc().filter(record => {
				const match = this.search(inputValue, record);
				if (match) {
					this.resList.push(match);
					this.cleanResList.push(record);
				}
			});
		} catch (error) {
			autoCompleteView.error(error);
		}
		// Rendering matching results to the UI list
		autoCompleteView.addResultsToList(
			this.resList.slice(0, this.maxResults),
			this.cleanResList.slice(0, this.maxResults),
			this.dataAttribute
		);
	}

	// Checks user's input search value validity
	searchInputValidation(selector) {
		// Input field handler fires an event onKeyup action
		selector.addEventListener("keyup", () => {
			// event.preventDefault();
			// Check if input is not empty or just have space before triggering the app
			if (selector.value.length > 0 && selector.value !== " ") {
				// clear results list
				autoCompleteView.clearResults();
				// List matching results
				this.listMatchedResults();
				// Gets user's selection
				autoCompleteView.getSelection(this.onSelection);
			} else {
				// clears all results list
				autoCompleteView.clearResults();
			}
		});
	}

	// Placeholder setting function
	setPlaceHolder() {
		if (this.placeHolder) {
			autoCompleteView
				.getSearchInput()
				.setAttribute("placeholder", this.placeHolder);
		}
	}

	// Starts the app Enigne
	init() {
		try {
			// If the data source is valid run the app else error
			if (this.dataSrc()) {
				this.setPlaceHolder();
				this.searchInputValidation(autoCompleteView.getSearchInput());
			}
		} catch (error) {
			autoCompleteView.error(
				"<strong>error</strong>, autoComplete <strong>engine</strong> is not <strong>starting</strong>..."
			);
		}
	}
}
