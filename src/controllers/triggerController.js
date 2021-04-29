/**
 * App triggering condition
 *
 * @param {Object} config - Trigger Object with the Trigger function
 * @param {Object} event - The trigger event Object
 * @param {String} queryValue - User's search query value string after manipulation
 *
 * @return {Boolean} triggerCondition - For autoComplete trigger decision
 */
export default (config, event, queryValue) => {
  return config.trigger.condition
    ? config.trigger.condition(event, queryValue)
    : queryValue.length >= config.threshold && queryValue.replace(/ /g, "").length;
};
