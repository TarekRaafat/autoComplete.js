import { create } from "../helpers/io";
import { getData } from "../controllers/dataController";
import { addEventListeners } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

export default async function (ctx) {
  let { name, input, placeHolder, resultsList, data } = ctx;

  // Set "inputField" attributes
  create(input, {
    ...(placeHolder && { placeholder: placeHolder }),
    "aria-controls": resultsList.id,
    "aria-autocomplete": "both",
  });

  // Create wrapper element
  ctx.wrapper = create("div", {
    around: input,
    class: name + "_wrapper",
    role: "combobox",
    "aria-owns": resultsList.id,
    "aria-haspopup": true,
    "aria-expanded": false,
  });

  // Create new list element
  ctx.list = create(resultsList.tag, {
    dest: [
      typeof resultsList.destination === "string"
        ? document.querySelector(resultsList.destination)
        : resultsList.destination(),
      resultsList.position,
    ],
    id: resultsList.id,
    ...(resultsList.class && { class: resultsList.class }),
    role: "listbox",
    hidden: "hidden",
  });

  // Get the data from store
  if (data.cache) await getData(ctx);

  // Attach Events listeners
  addEventListeners(ctx);

  /**
   * @emit {init} event on Initialization
   **/
  eventEmitter("init", ctx);
}
