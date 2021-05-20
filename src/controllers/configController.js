// Configuring options stage
export default (ctx) => {
  const { options, resultsList, resultItem } = ctx;

  // Inject sub options into options
  const inject = (option) => {
    for (const subOption in options[option]) {
      if (typeof options[option][subOption] === "object") {
        if (!ctx[option][subOption]) {
          ctx[option][subOption] = options[option][subOption];
        }
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

  // Dynamic Options
  ctx.selector = ctx.selector || "#" + ctx.name;
  resultsList.destination = resultsList.destination || ctx.selector;
  resultsList.idName = resultsList.idName || ctx.name + "_list_" + ctx.id;
  resultItem.idName = resultItem.idName || ctx.name + "_result";

  // Assign the "input" selector
  ctx.input = typeof ctx.selector === "string" ? document.querySelector(ctx.selector) : ctx.selector();
};
