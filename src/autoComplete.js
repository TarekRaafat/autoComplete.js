import inputComponent from "./components/Input";
import { generateList, closeAllLists } from "./controllers/listController";
import { navigate } from "./controllers/navigationController";
import {
  getInputValue,
  prepareQueryValue,
  checkTriggerCondition,
  listMatchingResults,
} from "./controllers/dataController";
import debouncer from "./utils/debouncer";
import eventEmitter from "./utils/eventEmitter";

/**
 * @desc This is autoComplete.js
 * @version 8.3.2
 * @example let autoCompleteJS = new autoComplete({config});
 */
export default class autoComplete {
  constructor(config) {
    // Deconstructing config values
    const {
      name = "Search",
      selector = "#autoComplete",
      observer = false,
      data: { src, key, cache = false, store, results },
      query,
      trigger: { event = ["input"], condition = false } = {},
      searchEngine = "strict",
      diacritics = false,
      threshold = 1,
      debounce = 0,
      resultsList: {
        render: resultsListRender = true,
        container = false,
        destination,
        position = "afterend",
        element: resultsListElement = "ul",
        idName: resultsListId = "autoComplete_list",
        className: resultsListClass = "autoComplete_list",
        navigation = false,
      } = {},
      sort = false,
      placeHolder,
      maxResults = 5,
      resultItem: {
        content = false,
        element: resultItemElement = "li",
        idName: resultItemId = "autoComplete_result",
        className: resultItemClass = "autoComplete_result",
      } = {},
      noResults,
      selection: { className: selectionClass = "autoComplete_selected" } = {},
      highlight: { render: highlightRender = false, className: highlightClass = "autoComplete_highlighted" } = {},
      feedback,
      onSelection,
    } = config;

    // Assigning config values to properties
    this.name = name;
    this.selector = selector;
    this.observer = observer;
    this.data = { src, key, cache, store, results };
    this.query = query;
    this.trigger = { event, condition };
    this.searchEngine = searchEngine;
    this.diacritics = diacritics;
    this.threshold = threshold;
    this.debounce = debounce;
    this.resultsList = {
      render: resultsListRender,
      container,
      destination: destination || this.selector,
      position,
      element: resultsListElement,
      idName: resultsListId,
      className: resultsListClass,
      navigation,
    };
    this.sort = sort;
    this.placeHolder = placeHolder;
    this.maxResults = maxResults;
    this.resultItem = { content, element: resultItemElement, idName: resultItemId, className: resultItemClass };
    this.noResults = noResults;
    this.selection = { className: selectionClass };
    this.highlight = { render: highlightRender, className: highlightClass };
    this.feedback = feedback;
    this.onSelection = onSelection;

    // Assign the input field selector
    this.inputField = typeof this.selector === "string" ? document.querySelector(this.selector) : this.selector();
    // Invoke preInit if enabled
    // or initiate autoComplete instance directly
    this.observer ? this.preInit() : this.init();
  }

  // Run autoComplete processes
  start(input, query) {
    // - Match query with existing value
    // Returns matching results list
    const results = this.data.results
      ? this.data.results(listMatchingResults(this, query))
      : listMatchingResults(this, query);
    // - Prepare data feedback object
    const dataFeedback = { input, query, matches: results, results: results.slice(0, this.maxResults) };
    /**
     * @emits {response} Emits Event on search response
     **/
    eventEmitter(this.inputField, dataFeedback, "results");
    // - Checks if there are NO results
    // Runs noResults action function
    if (!results.length) return this.noResults ? this.noResults(dataFeedback, generateList) : null;
    // - If resultsList set not to render
    if (!this.resultsList.render) return this.feedback(dataFeedback);
    // - Generate & Render results list
    const list = results.length ? generateList(this, dataFeedback, results) : null;
    /**
     * @emits {rendered} Emits Event after results list rendering
     **/
    eventEmitter(this.inputField, dataFeedback, "rendered");
    // - Initialize navigation
    navigate(this, dataFeedback);
    /**
     * @desc
     * Listens for all `click` events in the document
     * and closes this menu if clicked outside the list and input field
     * @listens {click} Listens to all `click` events on the document
     **/
    document.addEventListener("click", (event) => closeAllLists(this, event.target));
  }

  async dataStore() {
    // Check if cache is NOT true
    // and store is empty
    if (this.data.cache && this.data.store) return null;
    // Fetch new data from source and store it
    this.data.store = typeof this.data.src === "function" ? await this.data.src() : this.data.src;
    /**
     * @emits {request} Emits Event on data response
     **/
    eventEmitter(this.inputField, this.data.store, "fetch");
  }

  // Run autoComplete composer
  async compose() {
    // 0- Prepare raw input value
    const input = getInputValue(this.inputField);
    // 1- Prepare manipulated query input value
    const query = prepareQueryValue(input, this);
    // 2- Get trigger condition
    const triggerCondition = checkTriggerCondition(this, query);
    // 3- Check triggering condition
    if (triggerCondition) {
      // 4- Prepare the data
      await this.dataStore();
      // 5- Close all open lists
      closeAllLists(this);
      // 6- Start autoComplete engine
      this.start(input, query);
    } else {
      // 4- Close all open lists
      closeAllLists(this);
    }
  }

  // Initialization stage
  init() {
    // Set input field attributes
    inputComponent(this);
    // Set placeholder attribute value
    if (this.placeHolder) this.inputField.setAttribute("placeholder", this.placeHolder);
    // Run executer
    this.hook = debouncer(() => {
      // - Prepare autoComplete processes
      this.compose();
    }, this.debounce);
    /**
     * @listens {input} Listens to all `input` events on the input field
     **/
    this.trigger.event.forEach((eventType) => {
      this.inputField.removeEventListener(eventType, this.hook);
      this.inputField.addEventListener(eventType, this.hook);
    });
    /**
     * @emits {init} Emits Event on Initialization
     **/
    eventEmitter(this.inputField, null, "init");
  }

  // Pre-Initialization stage
  preInit() {
    // Observe DOM changes
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    // Callback function to execute when mutations are observed
    const callback = (mutationsList, observer) => {
      // Traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        // Check if this is the selected input field
        if (this.inputField) {
          // If yes disconnect the observer
          observer.disconnect();
          /**
           * @emits {connect} Emits Event on connection
           **/
          eventEmitter(this.inputField, null, "connect");
          // Initialize autoComplete
          this.init();
        }
      }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    // The entire document will be observed for mutations
    observer.observe(document, config);
  }

  // Un-initialize autoComplete
  unInit() {
    this.inputField.removeEventListener("input", this.hook);
    /**
     * @emits {detached} Emits Event on input eventListener detachment
     **/
    eventEmitter(this.inputField, null, "unInit");
  }
}
