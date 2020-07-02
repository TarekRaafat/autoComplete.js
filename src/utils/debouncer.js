/**
 * Debouncer
 *
 * @param func
 * @param delay
 *
 * @return func
 */
export default (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
