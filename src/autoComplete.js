import configure from "./controllers/configController";
import stage from "./controllers/stagingController";

/**
 * @desc This is autoComplete.js
 * @version 10.0
 * @example const autoCompleteJS = new autoComplete({config});
 */
export default function autoComplete(config) {
  // User's Configuration
  this.options = config;
  // Default Options
  this.name = "autoComplete";
  this.selector = "#" + this.name;
  this.trigger = { event: ["input"] };
  this.threshold = 1;
  this.debounce = 0;
  this.resultsList = {
    render: true,
    destination: this.selector,
    position: "afterend",
    element: "ul",
    idName: this.name + "_list",
    maxResults: 5,
  };
  this.resultItem = {
    element: "li",
    className: this.name + "_result",
    highlight: { className: this.name + "_highlighted" },
  };
  // Configure autoComplete.js
  configure(this);
  // Stage processes
  stage(this, autoComplete);
  // Invoke preInit function if enabled
  // or initiate autoComplete instance directly
  this.observer ? this.preInit() : this.init();
}
