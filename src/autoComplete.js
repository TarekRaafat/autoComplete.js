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
 * @desc This is autoCompleteJS
 * @version 8.0.0.0
 * @example let autoComplete = new autoCompleteJS({config});
 */
export default class autoCompleteJS {
  constructor(config) {
    // Deconstructing config values
    const {
      name = "Search",
      selector = "#autoComplete", // User input selector
      data: {
        src, // Data src selection
        key, // Data src key selection
        cache = true, // Flag to cache data src
      },
      query, // Query interceptor function
      trigger: {
        event = ["input"], // autoCompleteJS event
        condition = false, // condition trigger
      } = {},
      searchEngine = "strict", // Search engine type
      threshold = 0, // Minimum characters length before engine starts rendering
      debounce = 0, // Minimum duration for API calls debounce
      resultsList: {
        render = true,
        container = false,
        destination, // Results list selector
        position = "afterend", // Results list position
        element: resultsListElement = "ul", // Results list element tag
        idName: resultsListId = "autoComplete_list",
        className: resultsListClass = "autoComplete_list",
        navigation = false, // Results list navigation
      } = {},
      sort = false, // Sorting results list
      placeHolder, // Placeholder text
      maxResults = 5, // Maximum number of results to show
      resultItem: {
        content = false, // Result item function
        element: resultItemElement = "li", // Result item element tag
        idName: resultItemId = "autoComplete_result",
        className: resultItemClass = "autoComplete_result",
      } = {},
      noResults, // No results action
      highlight = false, // Highlighting matching results
      feedback, // Data feedback
      onSelection, // Action function on result selection
    } = config;

    // Assigning config values to properties
    this.name = name;
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
    this.searchEngine = searchEngine;
    this.threshold = threshold;
    this.debounce = debounce;
    this.resultsList = {
      render,
      container,
      destination: destination || this.inputField,
      position,
      element: resultsListElement,
      idName: resultsListId,
      className: resultsListClass,
      navigation,
    };
    this.sort = sort;
    this.placeHolder = placeHolder;
    this.maxResults = maxResults;
    this.resultItem = {
      content,
      element: resultItemElement,
      idName: resultItemId,
      className: resultItemClass,
    };
    this.noResults = noResults;
    this.highlight = highlight;
    this.feedback = feedback;
    this.onSelection = onSelection;
    // Invoking preInit automatically
    // when autoCompleteJS instance gets initiated
    this.preInit();
  }

  // Run autoCompleteJS processes
  start(data, rawInputValue, queryInputValue) {
    // - Match query with existing value
    const searchResults = listMatchingResults(queryInputValue, data, {
      searchEngine: this.searchEngine,
      highlight: this.highlight,
      key: this.data.key,
      sort: this.sort,
      maxResults: this.maxResults,
    });
    /**
     * @emits {response} Emits Event on search response
     **/
    eventEmitter(this.inputField, { input: rawInputValue, query: queryInputValue, results: searchResults }, "response");
    // - Checks if there are NO results
    // Runs noResults action function
    if (!data.length) return this.noResults();
    // - Prepare data feedback object
    const dataFeedback = { input: rawInputValue, query: queryInputValue, results: searchResults };
    // - If resultsList set not to render
    if (!this.resultsList.render) return this.feedback(dataFeedback);
    // - Generate & Render results list
    const list = searchResults.length ? generateList(searchResults, {
      inputField: this.inputField,
      rawInputValue: rawInputValue,
      queryInputValue: queryInputValue,
      listId: this.resultsList.idName,
      listClass: this.resultsList.className,
      itemId: this.resultItem.idName,
      itemClass: this.resultItem.className,
      listContainer: this.resultsList.container,
      itemContent: this.resultItem.content,
    }, this.onSelection) : null;
    /**
     * @emits {rendered} Emits Event after results list rendering
     **/
    eventEmitter(this.inputField, { input: rawInputValue, query: queryInputValue, results: searchResults }, "rendered");
    // - Initialize navigation
    navigate(this.inputField, list, this.resultsList.navigation);
    /**
     * @desc
     * Listens for all `click` events in the document
     * and closes this menu if clicked outside the list and input field
     * @listens {click} Listens to all `click` events on the document
     **/
    document.addEventListener("click", (event) => closeAllLists(event.target, this.inputField));
  }

  // Run autoCompleteJS composer
  async compose(event) {
    // 1- Prepare the data
    const data = await this.data.src();
    /**
     * @emits {request} Emits Event on search request
     **/
    eventEmitter(this.inputField, data, "request");
    // 2- Prepare input values
    const rawInputValue = getInputValue(this.inputField);
    const queryInputValue = prepareQueryValue(rawInputValue, this.query);
    // 0- Close all open lists
    closeAllLists(false, this.inputField);
    // 3- Get trigger condition
    const triggerCondition = checkTriggerCondition(this.trigger, queryInputValue, this.threshold);
    // 4- Check triggering condition
    if (triggerCondition) {
      this.start(data, rawInputValue, queryInputValue);
    }
  }

  // Initialization stage
  init() {
    // Set placeholder attribute value
    if (this.placeHolder) this.inputField.setAttribute("placeholder", this.placeHolder);
    // Run executer
    this.hook = debouncer((event) => {
      // 3- Prepare autoCompleteJS processes
      this.compose(event);
    }, this.debounce);
    /**
     * @listens {input} Listens to all `input` events on the input field
     **/
    this.inputField.addEventListener("input", this.hook);
    /**
     * @emits {init} Emits Event on Initialization
     **/
    eventEmitter(this.inputField, null, "init");
  }

  // Pre-Initialization stage
  preInit() {
    // Observe DOM changes
    // The entire document will be observed for mutations
    const targetNode = document;
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    // Callback function to execute when mutations are observed
    const callback = (mutationsList, observer) => {
      // Traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        // Check if this is the selected input field
        if (targetNode.querySelector(this.selector)) {
          // If yes disconnect the observer
          observer.disconnect();
          // Assign the input field selector
          this.inputField = targetNode.querySelector(this.selector);
          inputComponent(this.inputField, {
            inputName: this.name,
            listId: this.resultsList.idName,
            listClass: this.resultsList.className,
            itemId: this.resultItem.idName,
            itemClass: this.resultItem.className,
          });
          /**
           * @emits {connect} Emits Event on connection
           **/
          eventEmitter(this.inputField, { mutation }, "connect");
          // Initiate autoCompleteJS
          this.init();
        }
      }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }

  // un-initialize autoCompleteJS
  unInit() {
    this.inputField.removeEventListener("input", this.hook);
    /**
     * @emits {detached} Emits Event on input eventListener detachment
     **/
    eventEmitter(this.inputField, null, "uninit");
  }
}
