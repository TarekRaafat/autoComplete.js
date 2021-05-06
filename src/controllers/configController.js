// Configuring options stage
export default (ctx) => {
  const { selector, options } = ctx;
  // Assign the "inputField" selector
  ctx.input = typeof selector === "string" ? document.querySelector(selector) : selector();

  // Inject sub options into options
  const inject = (option) => {
    for (const subOption in options[option]) {
      if (typeof options[option][subOption] === "object" && !options[option][subOption].length) {
        for (const subSubOption in options[option][subOption]) {
          ctx[option][subOption][subSubOption] = options[option][subOption][subSubOption];
        }
      } else {
        ctx[option][subOption] = options[option][subOption];
      }
    }
  };

  // Populate Configuration options
  for (const option in options) {
    if (typeof options[option] === "object") {
      if (ctx[option]) {
        inject(option);
      } else {
        ctx[option] = {};
        inject(option);
      }
    } else {
      ctx[option] = options[option];
    }
  }
};
