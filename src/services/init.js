import create from "../helpers/creator";
import { addEventListeners } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

export default (ctx) => {
  let { placeHolder, resultsList } = ctx;

  // Common attributes
  const cmnAttributes = {
    role: "combobox",
    "aria-expanded": false,
  };

  // InputField attributes
  const inputAttributes = {
    "aria-haspopup": true,
    "aria-controls": resultsList.idName,
    "aria-autocomplete": "both",
    ...cmnAttributes,
  };

  // Set placeholder attribute value
  if (placeHolder) inputAttributes.placeholder = placeHolder;

  // Create wrapper element
  ctx.wrapper = create("div", {
    class: ctx.name + "_wrapper",
    around: ctx.input,
    "aria-owns": resultsList.idName,
    ...cmnAttributes,
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

  // Event handlers
  addEventListeners(ctx);

  /**
   * @emit {init} event on Initialization
   **/
  eventEmitter(ctx, "init");
};
