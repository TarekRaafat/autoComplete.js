import configure from "./services/configure";
import extend from "./services/extend";
import init from "./services/init";

/**
 * @class autoComplete
 * @classdesc Creates a new instance of autoComplete.js with the given configuration.
 *
 * @see {@link https://tarekraafat.github.io/autoComplete.js/#/configuration} for more information on configuration options.
 * @example const autoCompleteJS = new autoComplete({config});
 *
 * @param {Object} config - Configuration options.
 * @param {Number|String} [config.id] - Auto assigned instance unique identifier.
 * @param {String} [config.name=autoComplete] - Prepended to all created DOM element class names.
 * @param {(String|Function)} [config.selector=#autoComplete] - Must point to or return the relevant input field or element that autoComplete.js should act upon.
 * @param {Object} config.data - Data source.
 * @param {(String[]|Object[]|Function)} config.data.src - Values to search or an async or immediate function that returns an array of values to search.
 * @param {String[]} [config.data.keys] - Only used if config.data.src is an array of objects. Specifies which keys in the objects autoComplete.js should search.
 * @param {Boolean} [config.data.cache=false] - If true, autoComplete.js fetches all config.data.src when initialized and never again.
 * @param {Function} [config.data.filter] - Used to filter and sort matching returns from config.data.src before showing them to the user. Signature: (Array), is given all the results from config.data.src that matches the query.
 * @param {Function} [config.trigger] - Return true if you want autoComplete.js to start. Signature: (event, query). Default trigger function returns true if input field is *NOT* empty *and* greater than or equal to config.threshold.
 * @param {Function} [config.query] - For manipulating the input value before running the search, for example if you want to remove spaces or anything else. Signature: (string), must return string, is given the raw input value.
 * @param {String} [config.placeHolder] - Placeholder to set on the input element. For example "Search...".
 * @param {Number} [config.threshold=1] - Minimum number of characters required in the input before triggering autocompletion.
 * @param {Number} [config.debounce=0] - Delay in milliseconds after input for autocompletion to start.
 * @param {Boolean} [config.wrapper=true] - Wraps the input element in a div for a11y purposes, adding some ARIA attributes.
 * @param {(String|Function)} [config.searchEngine=strict] - "strict" checks if the given query is contained within the data, "loose" returns every result where every character in the query is present in the data in any order and location. Signature: (query: string, record: any), given the manipulated query input and each data.src array entry or for each entry[config.data.keys].
 * @param {Boolean} [config.diacritics=false] - Enable to normalize query and data values using String.normalize and by removing u0300 through u036f. See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize}.
 * @param {(Object|Boolean)} [config.resultsList] - false to disable result list rendering.
 * @param {String} [config.resultsList.tag=ul] - HTML tag to use for rendering the result container.
 * @param {String} [config.resultsList.id=autoComplete_list_index] - ID given to the result container.
 * @param {String} [config.resultsList.class] - Class names to give to the result container.
 * @param {(String|Function)} [config.resultsList.destination=#autoComplete] - Selector that points to where you want to insert the result elements. Defaults to config.selector. Signature: ().
 * @param {String} [config.resultsList.position=afterend] - Position relative to config.selector where to insert the results list. See {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#parameters}.
 * @param {Function} [config.resultsList.element] - Invoked before showing the results list. Allows manipulation of the DOM before it is added to the document. Signature: (list: HTMLElement, data: { query, matches, results }), where list is the container element.
 * @param {Number} [config.resultsList.maxResults=5] - Maximum number of results to render.
 * @param {Boolean} [config.resultsList.tabSelect=false] - Makes the Tab key select the entry navigated to using the keyboard, just like Enter.
 * @param {Boolean} [config.resultsList.noResults=false] - If enabled the results list will render when there are zero matches. For example if you want to show a custom message or help to the user in config.resultsList.element.
 * @param {Object} [config.resultItem] - Customize each rendered autocompletion result.
 * @param {String} [config.resultItem.tag=li] - HTML tag to use for rendering each result.
 * @param {String} [config.resultItem.id=autoComplete_result_index] - Prefix to use for the ID of each result element. _ and a number from 0 to maxResults is appended, so the final ID is for example "autoComplete_result_0" to "autoComplete_result_10".
 * @param {String} [config.resultItem.class] - Class names to give to each result element.
 * @param {Function} [config.resultItem.element] - Invoked before showing the results list. Allows manipulation of the DOM before it is added to the document. Signature: (item: HTMLElement, data: { match, value, [key] }).
 * @param {(Boolean|String)} [config.resultItem.highlight=false] - Enable to highlight matching characters using HTMLMarkElement, or a string of CSS classes to add to any generated mark elements.
 * @param {String} [config.resultItem.selected] - CSS classes to add and remove from result items the user navigates to using the keyboard.
 * @param {Boolean} [config.submit=false] - If enabled pressing enter will not prevent default behavior.
 * @param {Object} [config.events] - Allows adding custom or overriding internal event handling.
 * @param {Object} [config.events.input] - Maps event names to event handlers for the input element. Each key must be a valid event name, see {@link https://developer.mozilla.org/en-US/docs/Web/Events}, and each value must be an event handler function. Default handlers are keydown and blur.
 * @param {Object} [config.events.list] - Same as config.events.input, but for the result list container element. Default handlers are mousedown and click.
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
  this.resultItem = { tag: "li" };
  // Set all Configuration options
  configure(this);
  // Stage API methods
  extend.call(this, autoComplete);
  // Initialize autoComplete.js
  init(this);
}
