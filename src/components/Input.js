/**
 * Input field element
 *
 * @param {Object} config - autoCompleteJS configurations
 *
 */
export default (config) => {
  // General attributes
  config.inputField.setAttribute("type", "text");
  // config.inputField.setAttribute("dir", "ltr");
  // config.inputField.setAttribute("spellcheck", false);
  // config.inputField.setAttribute("autocorrect", "off");
  // config.inputField.setAttribute("autocomplete", "off");
  // config.inputField.setAttribute("autocapitalize", "off");
  // ARIA attributes
  config.inputField.setAttribute("role", "combobox");
  config.inputField.setAttribute("aria-haspopup", true);
  config.inputField.setAttribute("aria-expanded", false);
  config.inputField.setAttribute("aria-controls", config.resultsList.idName);
  config.inputField.setAttribute("aria-autocomplete", "both");
};
