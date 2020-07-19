/**
 * Input field element
 *
 * @param {Element} inputField - Input field element
 * @param {Object} config - Input field element configurations
 *
 */
export default (inputField, config) => {
  // Normal attributes
  inputField.setAttribute("dir", "ltr");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("spellcheck", false);
  inputField.setAttribute("autocorrect", "off");
  inputField.setAttribute("autocomplete", "off");
  inputField.setAttribute("autocapitalize", "off");
  inputField.setAttribute("title", config.inputName);
  // ARIA attributes
  inputField.setAttribute("role", "combobox");
  inputField.setAttribute("aria-label", config.inputName);
  //   inputField.setAttribute("aria-labelledby", config.listId);
  inputField.setAttribute("aria-owns", config.listId);
  //   inputField.setAttribute("aria-controls", config.listId);
  inputField.setAttribute("aria-haspopup", true);
  inputField.setAttribute("aria-autocomplete", "both");
};
