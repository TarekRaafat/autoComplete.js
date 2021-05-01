/**
 * Format raw input value
 *
 * @param {String} inputValue - User's raw search query value
 * @param {Object} config - autoComplete configurations
 *
 * @return {String} - Raw "inputField" value as a string
 */
const formatRawInputValue = (value, config) => {
  value = value.toLowerCase();

  return config.diacritics
    ? value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .normalize("NFC")
    : value;
};

/**
 * Get the "inputField" search value
 *
 * @param {Element} inputField - autoComplete "inputField" or textarea element
 *
 * @return {String} - Raw "inputField" value as a string
 */
const getInputValue = (inputField) =>
  inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement
    ? inputField.value
    : inputField.innerHTML;

/**
 * Intercept query value
 *
 * @param {String} input - User's raw search input value
 * @param {Object} config - autoComplete configurations
 *
 * @return {String} - Manipulated Query
 */
const prepareQuery = (input, config) =>
  config.query && config.query.manipulate
    ? config.query.manipulate(input)
    : config.diacritics
    ? formatRawInputValue(input, config)
    : formatRawInputValue(input, config);

export { getInputValue, prepareQuery, formatRawInputValue };
