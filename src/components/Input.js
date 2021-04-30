/**
 * InputField element
 *
 * @param {Object} config - autoComplete configurations
 * 
 * @return {void}
 */
export default (config) => {
  // General attributes
  // ARIA attributes
  let inf = config.inputField;
  inf.setAttribute("role", "combobox");
  inf.setAttribute("aria-haspopup", true);
  inf.setAttribute("aria-expanded", false);
  inf.setAttribute("aria-controls", config.resultsList.idName);
  inf.setAttribute("aria-autocomplete", "both");
};
