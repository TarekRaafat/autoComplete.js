import { generateList, closeAllLists } from "./controllers/listController";
import { navigate, focusState } from "./controllers/navigationController";
import { prepareData } from "./controllers/dataController";

export default class autoComplete {
  constructor(config) {
    // Deconstructing config values
    const {
      selector = inputField,
      data: { src, cached },
    } = config;

    // Assigning config values to properties
    this.inputField;
    this.inputFieldSelector = selector;
    this.data = {
      src,
      cached,
    };
    // Invoking preInit automatically
    // when autoComplete.js instance gets initiated
    this.preInit();
  }

  // Run autoComplete.js processes
  run(event, inputField, data) {
    // 1- Close all open lists
    closeAllLists(false, inputField);
    // If input field empty STOP here
    if (!event.target.value) return false;
    // 2- Reset focus state
    focusState(-1);
    // 3- Generate & Render results list
    generateList(data, event, inputField);
    // 4- Initialize navigation
    navigate(inputField);
    // 5- Listen for all clicks in the document
    document.addEventListener("click", (event) => {
      // 6- Close all this menu if clicked
      // outside the menu and input field
      closeAllLists(event.target, inputField);
    });
  }

  // Initialization stage
  init() {
    console.log(this.inputFieldSelector);
    // If data source
    // set to be cached
    if (this.data.cached) {
      // 1- Prepare the data
      prepareData(this.data.src, (data) => {
        // 2- Listen for all clicks in the input field
        this.inputField.addEventListener("input", (event, inputField = this.inputField) => {
          // 3- Initialize autoComplete.js processes
          this.run(event, inputField, data);
        });
      });
      // Else if data source
      // set to be streamlined
    } else {
      // 1- Listen for all clicks in the input field
      this.inputField.addEventListener("input", (event, inputField = this.inputField) => {
        // 2- Prepare the data
        prepareData(this.data.src, (data) => {
          // 3- Initialize autoComplete.js processes
          this.run(event, inputField, data);
        });
      });
    }
  }

  // Pre-Initialization stage
  preInit() {
    // Observe DOM changes
    // Select the node that will be observed for mutations
    const targetNode = document;
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    // Callback function to execute when mutations are observed
    const callback = (mutationsList, observer) => {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        // ! Error occurs when addedNode doesn't has an ID
        // TODO Check needs to be fixed
        // Check if this is the selected input field
        if ("#" + mutation.addedNodes[0].id === this.inputFieldSelector) {
          // If yes disconnect the observer
          observer.disconnect();
          // Assign the input field selector
          this.inputField = document.querySelector(this.inputFieldSelector);
          // Initiate autoComplete.js
          this.init();
        }
      }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
}
