/**
 * Event emitter/dispatcher function
 *
 * @param {Element} target - Target element to listen for
 * @param {Object|null} detail - Data object with relevant information or null
 * @param {String} name - Name of fired event
 *
 * @return {void}
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
