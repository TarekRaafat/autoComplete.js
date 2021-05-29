import preInit from "./preInit";
import init from "./init";
import start from "./start";
import { removeEvents } from "../controllers/eventController";
import { open, goTo, next, previous, select, close } from "../controllers/listController";
import search from "../controllers/searchController";

/**
 * autoComplete.js API extension
 *
 * @param {Object} autoComplete - autoComplete.js object instance
 */
export default function (autoComplete) {
  const { prototype } = autoComplete;

  // Pre-Initialize autoComplete.js engine
  prototype.preInit = () => preInit(this);

  // Initialize autoComplete.js engine
  prototype.init = () => init(this);

  // Start autoComplete.js engine
  prototype.start = () => start(this);

  // Un-Initialize autoComplete.js engine
  prototype.unInit = () => removeEvents(this);

  // Open closed list
  prototype.open = () => open(this);

  // Close opened list
  prototype.close = () => close(this);

  /**
   * Go to result item by index
   *
   * @param {Number} index - of the selected result item
   *
   * @returns {void}
   */
  prototype.goTo = (index) => goTo(index, this);

  // Go to next result item
  prototype.next = () => next(this);

  // Go to previous result item
  prototype.previous = () => previous(this);

  /**
   * Select result item with given index or current cursor
   *
   * @param {Number} index - of the selected result item
   *
   * @returns {void}
   */
  prototype.select = (index) => select(this, null, index);

  /**
   * autoComplete.js Search Engine
   * Find matching characters in record
   *
   * @param {String} query - Search query value
   * @param {String} record - Data record string
   * @param {Object} options - Search Engine configuration options
   *
   * @returns {String} - Matching data record
   */
  autoComplete.search = prototype.search = (query, record, options) => search(query, record, options);
}
