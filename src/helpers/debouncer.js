/**
 * Debouncer
 *
 * @param {Function} callback - Callback function
 * @param {Number} delay - Delay number value
 *
 * @returns {Function} - Debouncer function
 */
export default (callback, delay) => {
  let inDebounce;

  return () => {
    clearTimeout(inDebounce);

    inDebounce = setTimeout(() => callback(), delay);
  };
};
