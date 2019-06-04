import { autoCompleteView } from "../views/autoCompleteView";

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
    // Search engine type
    this.searchEngine = config.searchEngine === "loose" ? "loose" : "strict";
    // Minimum characters length before engine starts rendering
    this.threshold = config.threshold || 0;
    // Minimum duration for API calls debouncing
    this.debounce = config.debounce || 0;
    // Keyboard event type
    this.keyBoardEvent = config.keyBoardEvent || "keyup";
    // Rendered results destination
    this.resultsList = {
      render: config.resultsList && config.resultsList.render ? config.resultsList.render : false,
      view: config.resultsList && config.resultsList.render ? autoCompleteView.createResultsList({
      // Results List function
        container:
        // If resultsList and container are set
        config.resultsList && config.resultsList.container
          // Then set resultsList container
          ? config.resultsList.container
          // Else set default false
          : false,
        // Results List selector
        destination:
        // If resultsList and destination are set
        config.resultsList && config.resultsList.destination
          // Then set resultList destination
          ? config.resultsList.destination
          // Else set Default
          : autoCompleteView.getInput(this.selector),
        // Results List position
        position:
        // If resultsList and position are set
        config.resultsList && config.resultsList.position
          // Then resultsList position
          ? config.resultsList.position
          // Else set default "afterend"
          : "afterend",
        // Results List element tag
        element: config.resultsList && config.resultsList.element
          ? config.resultsList.element : "ul"
      }) : null
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
      content: config.resultItem && config.resultItem.content
        ? config.resultItem.content : false,
      // Result Item element tag
      element: config.resultItem && config.resultItem.element
        ? config.resultItem.element : "li"
    };
    // No Results action
    this.noResults = config.noResults;
    // Highlighting matching results
    this.highlight = config.highlight || false;
    // Action function on result selection
    this.onSelection = config.onSelection;
    // Data source
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
   * @return {*}
   */
  listMatchedResults(data) {
    return new Promise(resolve => {
      // Final highlighted results list of array
      const resList = [];

      // Checks input has matches in data source
      data.filter((record, index) => {
        // Search/Matching function
        const search = key => {
          // Holds match value
          const match = this.search(this.inputValue, record[key] || record);
          // Push match to results list with key if set
          if (match && key) {
            resList.push({ key, index, match, value: record });
            // Push match to results list without key if not set
          } else if (match && !key) {
            resList.push({ index, match, value: record });
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

      // If resultsList set NOT to render
      if (this.resultsList.render) {
      // Rendering matching results to the UI list
        autoCompleteView.addResultsToList(this.resultsList.view, list, this.resultItem);
        // Keyboard Arrow Navigation
        autoCompleteView.navigation(this.selector, this.resultsList.view);
      }

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
    // Selector value holder
    const selector = this.selector;
    // Specified Input field selector
    const input = autoCompleteView.getInput(selector);
    // Placeholder value holder
    const placeHolder = this.placeHolder;

    // Placeholder setter
    if (placeHolder) {
      input.setAttribute("placeholder", placeHolder);
    }

    // Debouncer
    const debounce = (func, delay) => {
      let inDebounce;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() =>
          func.apply(context, args)
        , delay);
      };
    };

    // Excute autoComplete processes
    const exec = (event) => {
      // Gets the input search value
      this.inputValue = input instanceof HTMLInputElement
        ? input.value.toLowerCase()
        : input.innerHTML.toLowerCase();
      // resultsList Render Switch
      const renderResultsList = this.resultsList.render;
      // App triggering condition
      const triggerCondition =
      (this.inputValue.length > this.threshold && this.inputValue.replace(/ /g, "").length);
      // Event emitter on input field
      const eventEmitter = (event, results) => {
        // Dispatch event on input
        input.dispatchEvent(
          new CustomEvent("autoComplete", {
            bubbles: true,
            detail: {
              event,
              query: this.inputValue,
              matches: results.matches,
              results: results.list,
            },
            cancelable: true,
          }));
      };

      // Checks if results will be rendered or NOT
      if(renderResultsList){
        // onSelection function holder
        const onSelection = this.onSelection;
        // Get results list value
        const resultsList = this.resultsList.view;
        // Clear Results function holder
        const clearResults = autoCompleteView.clearResults(resultsList);

        // Check if input is not empty
        // or just have space before triggering the app
        if (triggerCondition) {
        // List matching results
          this.listMatchedResults(this.dataSrc).then(list => {
          // Event emitter on input field
            eventEmitter(event, list);
            // Checks if there's results
            if (list.list.length === 0 && this.noResults && this.resultsList.render) {
            // Runs noResults action function
              this.noResults();
            } else {
            // Gets user's selection
            // If action configured
              if (onSelection) {
                autoCompleteView.getSelection(selector, resultsList, onSelection, list);
              }
            }
          });
        } else {
        // clears all results list
          clearResults;
        }
      // If results will NOT be rendered
      } else if (!renderResultsList && triggerCondition) {
        this.listMatchedResults(this.dataSrc).then(list => {
        // Event emitter on input field
          eventEmitter(event, list);
        });
      }
    };

    // Input field handler fires an event onKeyup action
    input.addEventListener(this.keyBoardEvent, debounce((event) => {
      // If data src NOT to be cached
      // then we should invoke its function again
      if (!this.data.cache) {
        const data = this.data.src();
        // Check if data src is a Promise
        // and resolve it before setting data src
        if (data instanceof Promise) {
          data.then(response => {
            this.dataSrc = response;
            exec(event);
          });
        // Else if not Promise
        } else {
          this.dataSrc = data;
          exec(event);
        }
      // Else if data src is local
      // not external src
      } else {
        exec(event);
      }
    }, this.debounce));
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