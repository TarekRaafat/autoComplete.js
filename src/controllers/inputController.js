/**
 * Gets the inputField search value "query"
 *
 * @param {Element} inputField - autoComplete inputField or textarea element
 *
 * @return {String} - Raw inputField value as a string
 */
const getInputValue = (inputField) => {
  return inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement
    ? inputField.value.toLowerCase()
    : inputField.innerHTML.toLowerCase();
};

/**
 * Intercept query value
 *
 * @param {String} inputValue - User's raw search query value
 * @param {Object} config - autoComplete configurations
 *
 * @return {String} - Manipulated Query Value
 */
const prepareQueryValue = (inputValue, config) => {
  return config.query && config.query.manipulate
    ? config.query.manipulate(inputValue)
    : config.diacritics
    ? inputValue
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .normalize("NFC")
    : inputValue;
};

export { getInputValue, prepareQueryValue };
