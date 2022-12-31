/**
 * Event emitter/dispatcher function that dispatches a custom event with the specified name and context.
 *
 * @param {String} name - Name of fired event
 * @param {Object} ctx - autoComplete.js context
 *
 * @returns {void}
 */
export default (name, ctx) => {
  // Dispatch event on "input" element
  ctx.input.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: ctx.feedback, cancelable: true }));
};
