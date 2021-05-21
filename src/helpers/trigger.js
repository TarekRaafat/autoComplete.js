/**
 * autoComplete.js triggering condition
 *
 * @param {Object} ctx - autoComplete.js configurations
 * @param {String} query - User's manipulated search query value
 *
 * @returns {Boolean} triggerCondition - For autoComplete.js to run
 */
export default (ctx, query) => {
  query = query.replace(/ /g, "");
  const condition = ctx.trigger.condition;

  return condition ? condition(query) : query.length >= ctx.threshold;
};
