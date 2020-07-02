/**
 * Event emitter on input field
 *
 * @param target
 * @param {*}
 * @param name
 *
 * @return void
 */
export default (target, detail, name) => {
  // Dispatch event on input
  target.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      detail,
      cancelable: true,
    })
  );
};
