/**
 * Configuring options stage
 *
 * @param {Object} ctx - autoComplete.js configuration options
 */
export default (ctx) => {
  const { id, name, options, resultsList, resultItem } = ctx;

  // Populate Configuration options
  for (const option in options) {
    if (typeof options[option] === "object") {
      if (!ctx[option]) ctx[option] = {};

      for (const subOption in options[option]) {
        ctx[option][subOption] = options[option][subOption];
      }
    } else {
      ctx[option] = options[option];
    }
  }

  // Dynamic Config Options
  ctx.selector = ctx.selector || "#" + name;
  resultsList.destination = resultsList.destination || ctx.selector;
  resultsList.id = resultsList.id || name + "_list_" + id;
  resultItem.id = resultItem.id || name + "_result";

  // Assign the "input" html element
  ctx.input = typeof ctx.selector === "string" ? document.querySelector(ctx.selector) : ctx.selector();
};
