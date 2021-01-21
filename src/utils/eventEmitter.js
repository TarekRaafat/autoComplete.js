/**
 * Event emitter/dispatcher `Function`
 *
 * @param {Element} target - The target element to listen for
 * @param {Object} detail - The detail object containing relevant information or null
 * @param {String} name - The name of the event fired
 * 
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
