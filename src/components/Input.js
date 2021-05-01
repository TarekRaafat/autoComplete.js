/**
 * InputField element
 *
 * @param {Object} config - autoComplete configurations
 *
 * @return {void}
 */
export default (config) => {
  const input = config.inputField;
  // ARIA attributes
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-haspopup", true);
  input.setAttribute("aria-expanded", false);
  input.setAttribute("aria-controls", config.resultsList.idName);
  input.setAttribute("aria-autocomplete", "both");
};
