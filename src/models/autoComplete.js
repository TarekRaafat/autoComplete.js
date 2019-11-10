import { autoCompleteView } from "../views/autoCompleteView";
import { Polyfill } from "../helpers/polyfill";

export default class autoComplete {
  constructor(config) {
    const {
      selector = "#autoComplete", // User input selector
      data: {
        key, // Data src key selection
        src, // Data src selection
        cache = true, // Flag to cache data src
      },
      query, // Query interceptor function
      trigger: {
        event = ["input"], // autoCompleteJS event
        condition = false, // condition trigger
      } = {},
      searchEngine = "strict", // Search engine type
      threshold = 0, // Minimum characters length before engine starts rendering
      debounce = 0, // Minimum duration for API calls debouncing,
      resultsList: {
        render = false,
        container = false,
        destination, // Results list selector
        position = "afterend", // Results list position
        element: resultsListElement = "ul", // Results list element tag
        navigation = false, // Results list navigation
      } = {},
      sort = false, // Sorting results list
      placeHolder, // Placeholder text
      maxResults = 5, // Maximum number of results to show
      resultItem: {
        content = false, // Result item function
        element: resultItemElement = "li", // Result item element tag
      } = {},
      noResults, // No results action
      highlight = false, // Highlighting matching results
      onSelection, // Action function on result selection
    } = config;

    // Build results list DOM element
    const resultsListView = render
      ? autoCompleteView.createResultsList({
        container,
        destination: destination || autoCompleteView.getInput(selector),
        position,
        element: resultsListElement,
      })
      : null;

    this.selector = selector;
    this.data = {
      src: () => (typeof src === "function" ? src() : src),
      key,
      cache,
    };
    this.query = query;
    this.trigger = {
      event,
      condition,
    };
    this.searchEngine =
      searchEngine === "loose" ? "loose" : typeof searchEngine === "function" ? searchEngine : "strict";
    this.threshold = threshold;
    this.debounce = debounce;
    this.resultsList = {
      render,
      view: resultsListView,
      navigation,
    };
    this.sort = sort;
    this.placeHolder = placeHolder;
    this.maxResults = maxResults;
    this.resultItem = {
      content,
      element: resultItemElement,
    };
    this.noResults = noResults;
    this.highlight = highlight;
    this.onSelection = onSelection;

    // Starts the app Engine
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
        // Regular Expression Query Pattern Ignores caseSensetive
        const pattern = new RegExp(`${query}`, "i");
        // Search for a match Query in Record
        query = pattern.exec(record);
        // Returns the match
        return this.highlight ? record.replace(query, autoCompleteView.highlight(query)) : record;
      }
    }
  }

  /**
   * List all matching results
   *
   * @param data
   *
   * @return {*}
   */
  listMatchedResults(data) {
    return new Promise(resolve => {
      // Final highlighted results list
      const resList = [];
      // Checks input has matches in data source
      data.filter((record, index) => {
        // Search/Matching function
        const search = key => {
          // This Record value
          const recordValue = key ? record[key] : record;
          // Check if record does exist before search
          if (recordValue) {
            // Holds match value
            const match =
              typeof this.searchEngine === "function"
                ? this.searchEngine(this.queryValue, recordValue)
                : this.search(this.queryValue, recordValue);
            // Push match to results list with key if set
            if (match && key) {
              resList.push({
                key,
                index,
                match,
                value: record,
              });
              // Push match to results list without key if not set
            } else if (match && !key) {
              resList.push({
                index,
                match,
                value: record,
              });
            }
          }
        };
        // Checks if data key is set
        if (this.data.key) {
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
      const list = this.sort
        ? resList.sort(this.sort).slice(0, this.maxResults)
        : resList.slice(0, this.maxResults);
      // Returns rendered list
      return resolve({
        matches: resList.length,
        list,
      });
    });
  }

  /**
   * App Engine Ignition.
   *
   * @return void
   */
  ignite() {
    // Specified Input field selector
    const input = autoCompleteView.getInput(this.selector);
    // Placeholder setter
    if (this.placeHolder) {
      input.setAttribute("placeholder", this.placeHolder);
    }

    /**
     * Debouncer
     *
     * @param func
     * @param delay
     *
     * @return void
     */
    const debounce = (func, delay) => {
      let inDebounce;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
      };
    };

    /**
     * Excute autoComplete processes
     *
     * @param event
     *
     * @return void
     */
    const exec = event => {
      // Gets the input search value
      const inputValue =
        input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement
          ? input.value.toLowerCase()
          : input.innerHTML.toLowerCase();
      // Intercept query value
      const queryValue = (this.queryValue =
        this.query && this.query.manipulate ? this.query.manipulate(inputValue) : inputValue);
      // resultsList Render Switch
      const renderResultsList = this.resultsList.render;
      // App triggering condition
      const triggerCondition = this.trigger.condition
        ? this.trigger.condition(queryValue)
        : queryValue.length > this.threshold && queryValue.replace(/ /g, "").length;

      /**
       * Event emitter on input field
       *
       * @param event
       * @param results
       *
       * @return void
       */
      const eventEmitter = (event, results) => {
        // Dispatch event on input
        input.dispatchEvent(
          new Polyfill.CustomEventWrapper("autoComplete", {
            bubbles: true,
            detail: {
              event,
              input: inputValue,
              query: queryValue,
              matches: results ? results.matches : null,
              results: results ? results.list : null,
            },
            cancelable: true,
          }),
        );
      };
      // Checks if results will be rendered or NOT
      if (renderResultsList) {
        const resultsList = this.resultsList.view;
        // Clear Results function holder
        const clearResults = autoCompleteView.clearResults(resultsList);
        // Check if input is not empty
        // or just have space before triggering the app
        if (triggerCondition) {
          // > List matching results
          this.listMatchedResults(this.dataStream, event).then(list => {
            // 1- Event emitter on input field
            eventEmitter(event, list);
            // 2- If resultsList set to render
            if (this.resultsList.render) {
              // 3- Checks if there's results
              if (list.list.length === 0 && this.noResults) {
                // 4- Runs noResults action function
                this.noResults();
              } else {
                // 4- Rendering matching results to the UI list
                autoCompleteView.addResultsToList(resultsList, list.list, this.resultItem);
                // 5- Gets user's selection
                // If action configured
                if (this.onSelection) {
                  // 6- Keyboard & Mouse Navigation
                  // If Navigation customMethod is set or default
                  this.resultsList.navigation
                    ? this.resultsList.navigation(event, input, resultsList, this.onSelection, list)
                    : autoCompleteView.navigation(input, resultsList, this.onSelection, list);
                }
              }
            }
          });
        } else {
          // Event emitter on input field
          eventEmitter(event);
          // clears all results list
          clearResults;
        }
        // If results will NOT be rendered
      } else if (!renderResultsList && triggerCondition) {
        this.listMatchedResults(this.dataStream, event).then(list => {
          // Event emitter on input field
          eventEmitter(event, list);
        });
      }
    };

    /**
     * autoComplete.js run processes
     *
     * @param event
     *
     * @return void
     */
    const run = event => {
      // Check if data src set to be cached or NOT
      // Resolve data src before assigning and excuting
      Promise.resolve(this.data.cache ? this.dataStream : this.data.src()).then(data => {
        // Assign resolved data to the main data stream
        this.dataStream = data;
        // Invoke execution function
        exec(event);
      });
    };
    // Updates results on input by default if navigation should be excluded
    // If option is provided as true, results will be shown on focus if input has initial text
    this.trigger.event.forEach(eventType => {
      input.addEventListener(eventType, debounce(event => run(event), this.debounce));
    });
  }

  /**
   * Starts the app Engine
   *
   * @return void
   */
  init() {
    // Checks if data set to be cached
    if (this.data.cache) {
      // Resolve data src before assigning and igniting
      Promise.resolve(this.data.src()).then(data => {
        // Assigning resolved data to the main data stream
        this.dataStream = data;
        // Invoke ignition function
        this.ignite();
      });
      // Else if data is NOT set to be  cached
    } else {
      // Invoke ignition function
      this.ignite();
    }
    // Polyfilling for IE11
    Polyfill.initElementClosestPolyfill();
  }
}
