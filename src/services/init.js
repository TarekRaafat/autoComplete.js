import { create } from "../helpers/io";
import { getData } from "../controllers/dataController";
import { addEvents } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

/**
 * Initialization stage
 *
 * @param {Object} ctx - autoComplete.js context
 */
export default async function (ctx) {
  let { resultsList } = ctx;

  const parentAttrs = {
    role: "combobox",
    "aria-owns": resultsList.id,
    "aria-haspopup": true,
    "aria-expanded": false,
  };

  // Set "input" attributes
  create(ctx.input, {
    "aria-controls": resultsList.id,
    "aria-autocomplete": "both",
    ...(!ctx.wrapper && { ...parentAttrs }),
    ...ctx.attrs,
  });

  // Create wrapper element
  if (ctx.wrapper) ctx.wrapper = create("div", { around: ctx.input, class: ctx.name + "_wrapper", ...parentAttrs });

  if (resultsList)
    // Create new list element
    ctx.list = create(resultsList.tag, {
      dest: [
        typeof resultsList.destination === "string"
          ? document.querySelector(resultsList.destination)
          : resultsList.destination(),
        resultsList.position,
      ],
      id: resultsList.id,
      role: "listbox",
      hidden: "hidden",
      ...(resultsList.class && { class: resultsList.class }),
    });

  // Get the data from store
  if (ctx.data.cache) await getData(ctx);

  // Attach Events listeners
  addEvents(ctx);

  /**
   * @emit {init} event on Initialization
   **/
  eventEmitter("init", ctx);
}
