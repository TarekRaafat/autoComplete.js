import { autoCompleteView } from "../views/autoCompleteView";
import { Polyfill } from "../helpers/polyfill";

export default class autoComplete {
  constructor(config) {
    // User input Selector
    this.selector = config.selector || "#autoComplete";
    // Source of data list
    this.data = {
      // Data src selection
      src: () => (typeof config.data.src === "function" ? config.data.src() : config.data.src),
      // Data src key selection
      key: config.data.key,
      // Cache Data src or NOT
      cache: typeof config.data.cache === "undefined" ? true : config.data.cache,
    };
    // Query Interceptor function
    this.query = config.query;
    // autoCompleteJS event & condition trigger
    this.trigger = {
      event: config.trigger && config.trigger.event ? config.trigger.event : ["input"],
      condition: config.trigger && config.trigger.condition ? config.trigger.condition : false,
    };
    // Search engine type
    this.searchEngine =
      config.searchEngine === "loose"
        ? "loose"
        : typeof config.searchEngine === "function"
          ? config.searchEngine
          : "strict";
    // Minimum characters length before engine starts rendering
    this.threshold = config.threshold || 0;
    // Minimum duration for API calls debouncing
    this.debounce = config.debounce || 0;
    // Rendered results destination
    this.resultsList = {
      render: config.resultsList && config.resultsList.render ? config.resultsList.render : false,
      view:
        config.resultsList && config.resultsList.render
          ? autoCompleteView.createResultsList({
            // Results List function
            container:
                // If resultsList and container are set
                config.resultsList && config.resultsList.container // Then set resultsList container
                  ? config.resultsList.container // Else set default false
                  : false,
            // Results List selector
            destination:
                // If resultsList and destination are set
                config.resultsList && config.resultsList.destination // Then set resultList destination
                  ? config.resultsList.destination // Else set Default
                  : autoCompleteView.getInput(this.selector),
            // Results List position
            position:
                // If resultsList and position are set
                config.resultsList && config.resultsList.position // Then resultsList position
                  ? config.resultsList.position // Else set default "afterend"
                  : "afterend",
            // Results List element tag
            element: config.resultsList && config.resultsList.element ? config.resultsList.element : "ul",
          })
          : null,
      // Results List navigation
      navigation: config.resultsList && config.resultsList.navigation ? config.resultsList.navigation : false,
    };
    // Sorting results list
    this.sort = config.sort || false;
    // Placeholder text
    this.placeHolder = config.placeHolder;
    // Maximum number of results to show
    this.maxResults = config.maxResults || 5;
    // Rendered results item
    this.resultItem = {
      // Result Item function
      content: config.resultItem && config.resultItem.content ? config.resultItem.content : false,
      // Result Item element tag
      element: config.resultItem && config.resultItem.element ? config.resultItem.element : "li",
    };
    // No Results action
    this.noResults = config.noResults;
    // Highlighting matching results
    this.highlight = config.highlight || false;
    // Action function on result selection
    this.onSelection = config.onSelection;
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
        input instanceof HTMLInputElement ? input.value.toLowerCase() : input.innerHTML.toLowerCase();
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
