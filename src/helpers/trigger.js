/**
 * autoComplete triggering condition
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {String} query - User's manipulated search query value
 *
 * @returns {Boolean} triggerCondition - For autoComplete to run
 */
export default (ctx, query) => {
  query = query.replace(/ /g, "");
  const condition = ctx.trigger.condition;

  return condition ? condition(query) : query.length >= ctx.threshold;
};
