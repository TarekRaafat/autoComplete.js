/**
 * Event emitter/dispatcher function
 *
 * @param {String} name - Name of fired event
 * @param {Object} ctx - autoComplete.js configurations
 *
 * @returns {void}
 */
export default (name, ctx) => {
  // Dispatch event on input
  ctx.input.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      detail: ctx.dataFeedback,
      cancelable: true,
    })
  );
};
