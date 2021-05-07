/**
 * autoComplete triggering condition
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {Object} event - Trigger Object
 * @param {String} query - User's manipulated search query value
 *
 * @return {Boolean} triggerCondition - For autoComplete to run
 */
export default (ctx, event, query) => {
  query = query.replace(/ /g, "");
  const condition = ctx.trigger.condition;

  return condition ? condition(event, query) : query.length >= ctx.threshold;
};
