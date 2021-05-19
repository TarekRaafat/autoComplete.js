import configure from "./controllers/configController";
import stage from "./controllers/stagingController";

/**
 * @desc This is autoComplete.js
 * @version 10.0.0
 * @example const autoCompleteJS = new autoComplete({config});
 */
export default function autoComplete(config) {
  // User's Configuration options
  this.options = config;
  // Default Configuration options
  this.id = autoComplete.instances = (autoComplete.instances || 0) + 1;
  this.name = "autoComplete";
  this.trigger = { events: ["input"] };
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
  };
  // Set all Configuration options
  configure(this);
  // Stage API methods
  stage(this, autoComplete);
  // Set to run "preInit" if "observer" enabled else "init"
  const run = this.observer ? this.preInit : this.init;
  // Check if DOM loaded
  if (document.readyState !== "loading") {
    run();
  } else {
    // Wait until DOM loaded
    document.addEventListener("DOMContentLoaded", run);
  }
}
