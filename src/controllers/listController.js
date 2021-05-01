import eventEmitter from "../utils/eventEmitter";

// String holders
const ariaActive = "aria-activedescendant";
const ariaExpanded = "aria-expanded";

/**
 * Close open list
 *
 * @param {Object} config - autoComplete configurations
 * @param {String} target - autoComplete "inputField" element
 *
 * @return {void}
 */
const closeList = (config, target) => {
  const inputField = config.inputField;

  // Get autoComplete list
  const list = document.getElementById(config.resultsList.idName);
  if (list && target !== inputField) {
    // Remove open list
    list.remove();
    // Remove active descendant
    inputField.removeAttribute(ariaActive);
    // Set list to closed
    inputField.setAttribute(ariaExpanded, false);
    /**
     * @emit {close} event after "resultsList" is closed
     **/
    eventEmitter(inputField, null, "close");
  }
};

export { closeList };
