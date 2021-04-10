import inputComponent from "./components/Input";
import { generateList, closeList } from "./controllers/listController";
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
 * @version 9.0
 * @example let autoCompleteJS = new autoComplete({config});
 */
export default class autoComplete {
  constructor(config) {
    // Deconstructing config values
    const {
      selector = "#autoComplete",
      placeHolder,
      observer = false,
      data: { src, key, cache = false, store, results },
      query,
      trigger: { event = ["input"], condition = false } = {},
      threshold = 1,
      debounce = 0,
      diacritics = false,
      searchEngine = "strict",
      feedback,
      resultsList: {
        render: resultsListRender = true,
        container = false,
        destination,
        position = "afterend",
        element: resultsListElement = "ul",
        idName: resultsListId = "autoComplete_list",
        className: resultsListClass = "autoComplete_list",
        maxResults = 5,
        navigation = false,
        noResults,
      } = {},
      resultItem: {
        content = false,
        element: resultItemElement = "li",
        idName: resultItemId,
        className: resultItemClass = "autoComplete_result",
        highlight: { render: highlightRender = false, className: highlightClass = "autoComplete_highlighted" } = {},
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
      destination: destination || this.selector,
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

  // Run autoComplete processes
  start(input, query) {
    // 1- Get matching results list
    const results = this.data.results
      ? this.data.results(listMatchingResults(this, query))
      : listMatchingResults(this, query);
    // 2- Prepare data feedback object
    const dataFeedback = { input, query, matches: results, results: results.slice(0, this.resultsList.maxResults) };
    /**
     * @emits {results} Emits Event on search response with results
     **/
    eventEmitter(this.inputField, dataFeedback, "results");
    // 3- If resultsList set not to render
    if (!this.resultsList.render) return this.feedback(dataFeedback);
    // 4- Generate & Render results list
    generateList(this, dataFeedback, results);
    // 5- Initialize list navigation controls
    navigate(this, dataFeedback);
    /**
     * @emits {open} Emits Event after results list is opened
     **/
    eventEmitter(this.inputField, dataFeedback, "open");
    /**
     * @desc
     * Listens for all `click` events in the document
     * and closes list if clicked outside the list and inputField
     * @listens {click} Listens to all `click` events on the document
     **/
    document.addEventListener("click", (event) => closeList(this, event.target));
  }

  async dataStore() {
    // Check if cache is NOT true
    // and store is empty
    if (this.data.cache && this.data.store) return null;
    // Fetch new data from source and store it
    this.data.store = typeof this.data.src === "function" ? await this.data.src() : this.data.src;
    /**
     * @emits {fetch} Emits Event on data request
     **/
    eventEmitter(this.inputField, this.data.store, "fetch");
  }

  // Run autoComplete composer
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
     * @emits {unInit} Emits Event on input eventListener detachment
     **/
    eventEmitter(this.inputField, null, "unInit");
  }
}
