import create from "../helpers/creator";
import debouncer from "../helpers/debouncer";
import {addEventListeners} from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

export default (ctx) => {
  ctx.isOpened = false;

  const resultsList = ctx.resultsList;

  // InputField attributes
  const attributes = {
    role: "combobox",
    "aria-haspopup": true,
    "aria-expanded": false,
    "aria-controls": resultsList.idName,
    "aria-autocomplete": "both",
  };

  // Set placeholder attribute value
  if (ctx.placeHolder) attributes.placeholder = ctx.placeHolder;

  // Set "inputField" attributes
  create(ctx.input, attributes);

  // Create wrapper
  ctx.wrapper = create("div", {
    className: ctx.name + "_wrapper",
    around: ctx.input,
    role: "combobox",
    "aria-expanded": false,
    "aria-owns": resultsList.idName,
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
