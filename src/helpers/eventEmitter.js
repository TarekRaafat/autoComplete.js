/**
 * Event emitter/dispatcher
 *
 * @param {String} name - Name of fired event
 * @param {Object} ctx - autoComplete.js context
 */
export default (name, ctx) => {
  // Dispatch event on "input"
  ctx.input.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: ctx.feedback, cancelable: true }));
};
