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

  // Initialize autoComplete.js engine
  prototype.init = function () {
    init(this);
  };

  /**
   * Start autoComplete.js engine
   *
   * @param {String} query - Search query value
   *
   */
  prototype.start = function (query) {
    start(this, query);
  };

  // Un-Initialize autoComplete.js engine
  prototype.unInit = function () {
    if (this.wrapper) {
      const parentNode = this.wrapper.parentNode;

      parentNode.insertBefore(this.input, this.wrapper);
      parentNode.removeChild(this.wrapper);
    }

    removeEvents(this);
  };

  // Open closed list
  prototype.open = function () {
    open(this);
  };

  // Close opened list
  prototype.close = function () {
    close(this);
  };

  /**
   * Go to result item by index
   *
   * @param {Number} index - of the selected result item
   *
   */
  prototype.goTo = function (index) {
    goTo(index, this);
  };

  // Go to next result item
  prototype.next = function () {
    next(this);
  };

  // Go to previous result item
  prototype.previous = function () {
    previous(this);
  };

  /**
   * Select result item with given index or current cursor
   *
   * @param {Number} index - of the selected result item
   *
   */
  prototype.select = function (index) {
    select(this, null, index);
  };

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
  prototype.search = function (query, record, options) {
    return search(query, record, options);
  };
}
