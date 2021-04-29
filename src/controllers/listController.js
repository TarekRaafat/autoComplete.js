import eventEmitter from "../utils/eventEmitter";

// String holders
const ariaActive = "aria-activedescendant";
const ariaExpanded = "aria-expanded";

/**
 * Close open list
 *
 * @param {Object} config - autoComplete configurations
 * @param {String} target - autoComplete input field ID
 *
 * @return {void}
 */
const closeList = (config, target) => {
  // Get autoComplete list
  const list = document.getElementById(config.resultsList.idName);
  if (list && target !== config.inputField) {
    // Remove open list
    list.remove();
    // Remove active descendant
    config.inputField.removeAttribute(ariaActive);
    // Set list to closed
    config.inputField.setAttribute(ariaExpanded, false);
    /**
     * @emit {close} Emit Event on list close
     **/
    eventEmitter(config.inputField, null, "close");
  }
};

export { closeList };
