import create from "../helpers/creator";
import debouncer from "../helpers/debouncer";
import { addEventListeners } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

export default (ctx) => {
  ctx.isOpened = false;

  const resultsList = ctx.resultsList;

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
  if (ctx.placeHolder) inputAttributes.placeholder = ctx.placeHolder;

  // Set "inputField" attributes
  create(ctx.input, inputAttributes);

  // Create wrapper
  ctx.wrapper = create("div", {
    className: ctx.name + "_wrapper",
    around: ctx.input,
    "aria-owns": resultsList.idName,
    ...cmnAttributes,
  });

  // Create new list
  ctx.list = create(resultsList.element, {
    hidden: "hidden",
    dest: [
      "string" === typeof resultsList.destination
        ? document.querySelector(resultsList.destination)
        : resultsList.destination(),
      resultsList.position,
    ],
    id: resultsList.idName,
    class: resultsList.classList,
    role: "listbox",
  });

  // Event handlers
  addEventListeners(ctx);

  /**
   * @emit {init} event on Initialization
   **/
  eventEmitter(ctx, "init");
};
