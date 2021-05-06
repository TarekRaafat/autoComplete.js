/**
 * Event emitter/dispatcher function
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {String} name - Name of fired event
 *
 * @return {void}
 */
export default (ctx, name) => {
  // Dispatch event on input
  ctx.input.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      detail: ctx.dataFeedback,
      cancelable: true,
    })
  );
};
