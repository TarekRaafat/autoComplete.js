import { create } from "../helpers/io";
import { getData } from "../controllers/dataController";
import { addEventListeners } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

export default async function (ctx) {
  let { name, input, placeHolder, resultsList, data } = ctx;

  // Prepare "inputField" attributes
  const Attributes = {
    "aria-controls": resultsList.idName,
    "aria-autocomplete": "both",
  };

  // Add "placeholder" attribute value if available
  if (placeHolder) Attributes.placeholder = placeHolder;

  // Set "inputField" attributes
  create(input, Attributes);

  // Create wrapper element
  ctx.wrapper = create("div", {
    class: name + "_wrapper",
    around: input,
    role: "combobox",
    "aria-owns": resultsList.idName,
    "aria-haspopup": true,
    "aria-expanded": false,
  });

  // Create new list element
  ctx.list = create(resultsList.element, {
    hidden: "hidden",
    dest: [
      typeof resultsList.destination === "string"
        ? document.querySelector(resultsList.destination)
        : resultsList.destination(),
      resultsList.position,
    ],
    id: resultsList.idName,
    ...(resultsList.className && { class: resultsList.className }),
    role: "listbox",
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
