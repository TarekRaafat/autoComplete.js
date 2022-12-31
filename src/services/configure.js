import { select } from "../helpers/io";

/**
 * Applies the specified configuration options to the autoComplete.js script.
 *
 * @param {Object} ctx - An object containing the configuration options for the autoComplete.js script.
 *
 * @returns {void}
 */
export default (ctx) => {
  const { name, options, resultsList, resultItem } = ctx;

  // Apply the provided configuration options to the context object
  for (const option in options) {
    if (typeof options[option] === "object") {
      // If the option value is an object, merge it with the existing value in the context object
      if (!ctx[option]) ctx[option] = {};
      Object.assign(ctx[option], options[option]);
    } else {
      // Otherwise, set the option value directly in the context object
      ctx[option] = options[option];
    }
  }

  // Set default values for dynamic configuration options
  ctx.selector = ctx.selector || "#" + name;
  resultsList.destination = resultsList.destination || ctx.selector;
  resultsList.id = resultsList.id || name + "_list_" + ctx.id;
  resultItem.id = resultItem.id || name + "_result";

  // Select the HTML "input" element using the specified selector
  ctx.input = select(ctx.selector);
};
