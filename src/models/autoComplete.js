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
    this.resultsList = autoCompleteView.createResultsList({
      container: config.resultsList && config.resultsList.container ? config.resultsList.container : false,
      destination:
        config.resultsList && config.resultsList.destination
          ? config.resultsList.destination
          : autoCompleteView.getInput(this.selector),
      position: config.resultsList && config.resultsList.position ? config.resultsList.position : "afterend"
    });
    // Sorting results list
    this.sort = config.sort || false;
    // Placeholder text
    this.placeHolder = config.placeHolder;
    // Maximum number of results to show
    this.maxResults = config.maxResults || 5;
    // Rendered results item
    this.resultItem = config.resultItem;
    // Highlighting matching results
    this.highlight = config.highlight || false;
    // Action function on result selection
    this.onSelection = config.onSelection;
    // should cache data.src
    this.shouldCacheSrc = typeof config.shouldCacheSrc === "undefined" ? true : config.shouldCacheSrc;
    this.dataSrc;
    // Starts the app Enigne
    this.init();
  }

  /**
   * Search common characters within record
   *
   * @param query
   * @param record
   *
   * @return {*}
   */
  search(query, record) {
    // Hightlight State value holder
    const highlight = this.highlight;
    // Current record value toLowerCase
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
        let recordChar = record[number];
        // Matching case
        if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
          // Highlight matching character
          recordChar = highlight ? autoCompleteView.highlight(recordChar) : recordChar;
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
        // Regular Expression Query Pattern Ignores caseSensetive
        const pattern = new RegExp(`${query}`, "i");
        // Search for a match Query in Record
        query = pattern.exec(record);
        // Returns the match
        return highlight ? record.replace(query, autoCompleteView.highlight(query)) : record;
      }
    }
  }

  /**
   * List all matching results
   *
   * @param data
   *
   * @return array
   */
  listMatchedResults(data) {
    // Final highlighted results list of array
    const resList = [];
    // Holds the input search value
    const inputValue = autoCompleteView.getInput(this.selector).value.toLowerCase();
    // Checks input has matches in data source
    data.filter((record, index) => {
      // Search/Matching function
      const search = key => {
        // Holds match value
        const match = this.search(inputValue, record[key] || record);
        // Push match to results list with key if set
        if (match && key) {
          resList.push({ key, index, match, value: record });
          // Push match to results list without key if not set
        } else if (match && !key) {
          resList.push({ index, match, value: record });
        }
      };
      // Checks if data key is set
      if(this.data.key) {
        // Iterates over all set data keys
        for (const key of this.data.key) {
          search(key);
        }
        // If no data key not set
      } else {
        search();
      }
    });
    // Sorting / Slicing final results list
    const list = this.sort ? resList.sort(this.sort)
      .slice(0, this.maxResults) : resList.slice(0, this.maxResults);
    // Rendering matching results to the UI list
    autoCompleteView.addResultsToList(this.resultsList, list, this.data.key, this.resultItem);
    // Keyboard Arrow Navigation
    autoCompleteView.navigation(this.selector, this.resultsList);
    // Returns rendered list
    return {
      matches: resList.length,
      list
    };
  }

  ignite() {
    // Selector value holder
    const selector = this.selector;
    // Specified Input field selector
    const input = autoCompleteView.getInput(selector);
    // Placeholder value holder
    const placeHolder = this.placeHolder;
    // onSelection function holder
    const onSelection = this.onSelection;
    // Placeholder setter
    if (placeHolder) {
      input.setAttribute("placeholder", placeHolder);
    }
    // Input field handler fires an event onKeyup action
    input.onkeyup = (event) => {
      // if we should NOT cache src then we should invoke its function again
      if (!this.shouldCacheSrc) {
        const data = this.data.src();
        // check if it was a promise and resolve it before setting the data
        if (data instanceof Promise) {
          data.then(response => {
            this.dataSrc = response;
          });
        } else {
          this.dataSrc = data;
        }
      }
      // Get results list value
      const resultsList = this.resultsList;
      // Clear Results function holder
      const clearResults = autoCompleteView.clearResults(resultsList);
      // Check if input is not empty or just have space before triggering the app
      if (input.value.length > this.threshold && input.value.replace(/ /g, "").length) {
        // List matching results
        const list = this.listMatchedResults(this.dataSrc);
        // Event emitter on input field
        input.dispatchEvent(new CustomEvent("type", {
          bubbles: true,
          detail: {
            event,
            query: input.value,
            matches: list.matches,
            results: list.list
          },
          cancelable: true
        }));
        // Gets user's selection
        // If action configured
        if (onSelection) {
          autoCompleteView.getSelection(selector, resultsList, onSelection, list);
        }
      } else {
        // clears all results list
        clearResults;
      }
    };
  }

  /**
   * Starts the app Engine.
   *
   * @return void
   */
  init() {
    // Data Source holder
    const dataSrc = this.data.src();
    // Data source is Async
    if (dataSrc instanceof Promise) {
      // Return Data
      dataSrc.then(response => {
        this.dataSrc = response;
        this.ignite();
      });
      // Data source is Array/Function
    } else {
      this.dataSrc = dataSrc;
      this.ignite();
    }
  }
}
