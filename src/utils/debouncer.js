/**
 * Debouncer
 *
 * @param {Function} callback - The callback function
 * @param {Number} delay - The delay number value
 *
 * @returns {Function} - The callback function wrapped in `setTimeout` function
 */
export default (callback, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => callback.apply(context, args), delay);
  };
};
