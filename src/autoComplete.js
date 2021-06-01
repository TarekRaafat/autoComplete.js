import configure from "./services/configure";
import extend from "./services/extend";
import preInit from "./services/preInit";
import init from "./services/init";

/**
 * @desc This is autoComplete.js
 * @version 10.1.1
 * @example const autoCompleteJS = new autoComplete({config});
 *
 * @param {Object} config - Configuration options
 */
export default function autoComplete(config) {
  // User's Configuration options
  this.options = config;
  // Default Configuration options
  this.id = autoComplete.instances = (autoComplete.instances || 0) + 1;
  this.name = "autoComplete";
  this.wrapper = 1;
  this.threshold = 1;
  this.debounce = 0;
  this.resultsList = {
    position: "afterend",
    tag: "ul",
    maxResults: 5,
  };
  this.resultItem = {
    tag: "li",
  };
  // Set all Configuration options
  configure(this);
  // Stage API methods
  extend.call(this, autoComplete);
  // Set to run "preInit" if "observer" enabled else "init"
  const run = this.observe ? preInit : init;
  // Run autoComplete.js
  run(this);
}
