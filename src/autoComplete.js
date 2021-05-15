import configure from "./controllers/configController";
import stage from "./controllers/stagingController";

/**
 * @desc This is autoComplete.js
 * @version 10.0
 * @example const autoCompleteJS = new autoComplete({config});
 */
export default function autoComplete(config) {
  // User's Configuration options
  this.options = config;
  // Default Configuration options
  this.id = autoComplete.instances = (autoComplete.instances || 0) + 1;
  this.name = "autoComplete";
  this.trigger = { event: ["input"] };
  this.threshold = 1;
  this.debounce = 0;
  this.resultsList = {
    render: true,
    position: "afterend",
    element: "ul",
    maxResults: 5,
  };
  this.resultItem = {
    element: "li",
    highlight: {},
  };
  // Set all Configurations
  configure(this);
  // Stage API methods
  stage(this, autoComplete);
  // Invoke preInit function if enabled
  // or initiate autoComplete instance directly
  this.observer ? this.preInit() : this.init();
}
