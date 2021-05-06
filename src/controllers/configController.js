// Configuring options stage
export default (ctx) => {
  // Assign the "inputField" selector
  ctx.input = typeof ctx.selector === "string" ? document.querySelector(ctx.selector) : ctx.selector();

  // Inject sub options into options
  const inject = (option) => {
    for (const subOption in ctx.options[option]) {
      if (typeof ctx.options[option][subOption] === "object" && !ctx.options[option][subOption].length) {
        for (const subSubOption in ctx.options[option][subOption]) {
          ctx[option][subOption][subSubOption] = ctx.options[option][subOption][subSubOption];
        }
      } else {
        ctx[option][subOption] = ctx.options[option][subOption];
      }
    }
  };

  // Populate Configuration options
  for (const option in ctx.options) {
    if (typeof ctx.options[option] === "object") {
      if (ctx[option]) {
        inject(option);
      } else {
        ctx[option] = {};
        inject(option);
      }
    } else {
      ctx[option] = ctx.options[option];
    }
  }
};
