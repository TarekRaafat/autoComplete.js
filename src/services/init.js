import create from "../helpers/creator";
import { getData } from "../controllers/dataController";
import { addEventListeners } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

export default async function (ctx) {
  let { placeHolder, resultsList } = ctx;

  // InputField attributes
  const inputAttributes = {
    "aria-controls": resultsList.idName,
    "aria-autocomplete": "both",
  };

  // Set placeholder attribute value
  if (placeHolder) inputAttributes.placeholder = placeHolder;

  // Create wrapper element
  ctx.wrapper = create("div", {
    class: ctx.name + "_wrapper",
    around: ctx.input,
    role: "combobox",
    "aria-owns": resultsList.idName,
    "aria-haspopup": true,
    "aria-expanded": false,
  });

  // Set "inputField" attributes
  create(ctx.input, inputAttributes);

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
  if (ctx.data.cache) await getData(ctx);

  // Event handlers
  addEventListeners(ctx);

  /**
   * @emit {init} event on Initialization
   **/
  eventEmitter(ctx, "init");
}
