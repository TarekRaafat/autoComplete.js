/**
 * autoComplete triggering condition
 *
 * @param {Object} config - autoComplete configurations
 * @param {Object} event - Trigger event Object
 * @param {String} query - User's manipulated search query value
 *
 * @return {Boolean} triggerCondition - For autoComplete to run
 */
export default (config, event, query) =>
  config.trigger.condition
    ? config.trigger.condition(event, query)
    : query.length >= config.threshold && query.replace(/ /g, "").length;
