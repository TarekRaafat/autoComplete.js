/**
 * Input field element
 *
 * @param {Object} config - autoComplete configurations
 *
 */
export default (config) => {
  // General attributes
  // ARIA attributes
  config.inputField.setAttribute("role", "combobox");
  config.inputField.setAttribute("aria-haspopup", true);
  config.inputField.setAttribute("aria-expanded", false);
  config.inputField.setAttribute("aria-controls", config.resultsList.idName);
  config.inputField.setAttribute("aria-autocomplete", "both");
};
