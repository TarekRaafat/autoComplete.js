/**
 * autoComplete triggering condition
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {Object} event - Trigger event Object
 * @param {String} query - User's manipulated search query value
 *
 * @return {Boolean} triggerCondition - For autoComplete to run
 */
export default (ctx, event, query) => {
  query = query.replace(/ /g, "");

  return ctx.trigger.condition ? ctx.trigger.condition(event, query) : query.length >= ctx.threshold;
};
