/**
 * Debouncer
 *
 * @param {Function} callback - Callback function
 * @param {Number} delay - Delay number value
 *
 * @return {Function} - Debouncer function
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
