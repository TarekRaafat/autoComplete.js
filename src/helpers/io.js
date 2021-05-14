import create from "./creator";

/**
 * Format raw input value
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {String} inputValue - user's raw search query value
 *
 * @return {String} - Raw "inputField" value as a string
 */
const formatRawInputValue = (ctx, value) => {
  value = value.toLowerCase();

  return (
    ctx.diacritics
      ? value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .normalize("NFC")
      : value
  ).toString();
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
 * @param {Object} ctx - autoComplete configurations
 * @param {String} input - user's raw search input value
 *
 * @return {String} - Manipulated Query
 */
const prepareQuery = (ctx, input) => {
  const query = ctx.query;

  return query && query.manipulate ? query.manipulate(input) : formatRawInputValue(ctx, input);
};

/**
 * Highlight result item
 *
 * @param {Array} className - of highlighted character
 * @param {String} value - user's raw search query value
 *
 * @return {String} - highlighted character
 */
const highlightChar = (className, value) =>
  create("mark", {
    ...(className && { className }),
    innerHTML: value,
  }).outerHTML;

export { getInputValue, prepareQuery, formatRawInputValue, highlightChar };
