import inputComponent from "./components/Input";
import { closeList } from "./controllers/listController";
import resultsList from "./controllers/resultsController";
import { getInputValue, prepareQueryValue } from "./controllers/inputController";
import findMatches from "./controllers/dataController";
import checkTriggerCondition from "./controllers/triggerController";
import debouncer from "./utils/debouncer";
import eventEmitter from "./utils/eventEmitter";

/**
 * @desc This is autoComplete.js
 * @version 9.1
 * @example const autoCompleteJS = new autoComplete({config});
 */
export default class autoComplete {
  constructor(config) {
    // Deconstructing config values
    const {
      selector = "#autoComplete",
      placeHolder,
      observer,
      data: { src, key, cache, store, results },
      query,
      trigger: { event = ["input"], condition } = {},
      threshold = 1,
      debounce = 0,
      diacritics,
      searchEngine,
      feedback,
      resultsList: {
        render: resultsListRender = true,
        container,
        destination = selector,
        position = "afterend",
        element: resultsListElement = "ul",
        idName: resultsListId = "autoComplete_list",
        className: resultsListClass,
        maxResults = 5,
        navigation,
        noResults,
      } = {},
      resultItem: {
        content,
        element: resultItemElement = "li",
        idName: resultItemId,
        className: resultItemClass = "autoComplete_result",
        highlight: { render: highlightRender, className: highlightClass = "autoComplete_highlighted" } = {},
        selected: { className: selectedClass = "autoComplete_selected" } = {},
      } = {},
      onSelection, // Action function on result selection
    } = config;

    // Assigning config values to properties
    this.selector = selector;
    this.observer = observer;
    this.placeHolder = placeHolder;
    this.data = { src, key, cache, store, results };
    this.query = query;
    this.trigger = { event, condition };
    this.threshold = threshold;
    this.debounce = debounce;
    this.diacritics = diacritics;
    this.searchEngine = searchEngine;
    this.feedback = feedback;
    this.resultsList = {
      render: resultsListRender,
      container,
      destination: destination,
      position,
      element: resultsListElement,
      idName: resultsListId,
      className: resultsListClass,
      maxResults: maxResults,
      navigation,
      noResults: noResults,
    };
    this.resultItem = {
      content,
      element: resultItemElement,
      idName: resultItemId,
      className: resultItemClass,
      highlight: { render: highlightRender, className: highlightClass },
      selected: { className: selectedClass },
    };
    this.onSelection = onSelection;

    // Assign the input field selector
    this.inputField = typeof this.selector === "string" ? document.querySelector(this.selector) : this.selector();
    // Invoke preInit if enabled
    // or initiate autoComplete instance directly
    this.observer ? this.preInit() : this.init();
  }

  /**
   * Run autoComplete processes
   *
   * @param {String} - Raw input value as a string
   * @param {Object} config - autoComplete configurations
   *
   * @return {void}
   */
  start(input, query) {
    // 1- Get matching results list
    const results = this.data.results ? this.data.results(findMatches(this, query)) : findMatches(this, query);
    // 2- Prepare data feedback object
    const dataFeedback = { input, query, matches: results, results: results.slice(0, this.resultsList.maxResults) };
    /**
     * @emit {results} Emit Event on search response with results
     **/
    eventEmitter(this.inputField, dataFeedback, "results");
    // 3- If resultsList set not to render
    if (!this.resultsList.render) return this.feedback(dataFeedback);
    // 4- Generate & Render results list
    resultsList(this, dataFeedback);
    /**
     * @emit {open} Emit Event after results list is opened
     **/
    eventEmitter(this.inputField, dataFeedback, "open");
  }

  async dataStore() {
    // Check if cache is set
    // and store is NOT empty
    if (this.data.cache && this.data.store) return null;
    // Else
    // Fetch new data from source and store it
    this.data.store = typeof this.data.src === "function" ? await this.data.src() : this.data.src;
    /**
     * @emit {fetch} Emit Event on data request
     **/
    eventEmitter(this.inputField, this.data.store, "fetch");
  }

  /**
   * Run autoComplete composer
   *
   * @param {Object} event - The trigger event Object
   *
   * @return {void}
   */
  async compose(event) {
    // 1- Prepare raw input value
    const input = getInputValue(this.inputField);
    // 2- Prepare manipulated query input value
    const query = prepareQueryValue(input, this);
    // 3- Get trigger condition
    const triggerCondition = checkTriggerCondition(this, event, query);
    // 4- Check trigger condition
    if (triggerCondition) {
      // 5- Prepare the data
      await this.dataStore();
      // 6- Start autoComplete engine
      this.start(input, query);
    } else {
      // 5- Close open list
      closeList(this);
    }
  }

  // Initialization stage
  init() {
    // 1- Set input field attributes
    inputComponent(this);
    // 2- Set placeholder attribute value
    if (this.placeHolder) this.inputField.setAttribute("placeholder", this.placeHolder);
    // 3- Run executer
    this.hook = debouncer((event) => {
      // Prepare autoComplete processes
      this.compose(event);
    }, this.debounce);
    /**
     * @listen {input} Listen to all `input` events on the input field
     **/
    this.trigger.event.forEach((eventType) => {
      this.inputField.removeEventListener(eventType, this.hook);
      this.inputField.addEventListener(eventType, this.hook);
    });
    /**
     * @emit {init} Emit Event on Initialization
     **/
    eventEmitter(this.inputField, null, "init");
  }

  // Pre-Initialization stage
  preInit() {
    // 1- Observe DOM changes
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    // 2- Callback function to execute when mutations are observed
    const callback = (mutationsList, observer) => {
      // Traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        // Check if this is the selected input field
        if (this.inputField) {
          // If yes disconnect the observer
          observer.disconnect();
          // Initialize autoComplete
          this.init();
        }
      }
    };
    // 3- Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // 4- Start observing the target node for configured mutations
    // The entire document will be observed for mutations
    observer.observe(document, config);
  }

  // Un-initialize autoComplete
  unInit() {
    // 1- Removes autoComplete input main eventListener
    this.inputField.removeEventListener("input", this.hook);
    /**
     * @emit {unInit} Emit Event on input eventListener detachment
     **/
    eventEmitter(this.inputField, null, "unInit");
  }
}
