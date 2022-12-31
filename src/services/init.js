import { create } from "../helpers/io";
import { getData } from "../controllers/dataController";
import { addEvents } from "../controllers/eventController";
import eventEmitter from "../helpers/eventEmitter";

/**
 * Initializes the autoComplete.js script by setting up the input element, creating the wrapper and results list elements,
 * attaching event listeners, and fetching data if necessary.
 *
 * @param {Object} ctx - The context object for the autoComplete.js script.
 *
 * @returns {void}
 */
export default async function (ctx) {
  const { resultsList } = ctx;

  const parentAtr = {
    role: "combobox", // Set the role of the parent element to "combobox"
    "aria-owns": resultsList.id, // Set the ID of the element that the parent element owns
    "aria-haspopup": true, // Set the parent element as having a pop-up element
    "aria-expanded": false, // Set the parent element as not expanded (pop-up element is not currently visible)
  };

  // Create a wrapper element around the input element if specified
  if (ctx.wrapper)
    ctx.wrapper = create("div", {
      around: ctx.input, // Insert the wrapper element around the input element
      class: ctx.name + "_wrapper", // Set the class of the wrapper element to the name of the autoComplete.js script plus "_wrapper"
      ...parentAtr, // Add the parentAtr object to the wrapper element
    });

  // Set "input" element attributes
  create(ctx.input, {
    "aria-controls": resultsList.id, // Set the ID of the element that the input element controls
    "aria-autocomplete": "both", // Set the input element as capable of both inline and list autocomplete
    ...(!ctx.wrapper && parentAtr), // Add the parentAtr object to the input element if no wrapper is present
    ...ctx.atr, // Add any additional attributes specified in the context object
  });

  if (resultsList)
    // Create a new list element
    ctx.list = create(resultsList.tag, {
      dest: [resultsList.destination, resultsList.position], // Insert the list element in the specified destination element at the specified position
      id: resultsList.id, // Set the ID of the list element
      role: "listbox", // Set the role of the list element to "listbox"
      hidden: "hidden", // Set the list element as hidden
      ...resultsList.atr, // Add any additional attributes specified in the context object
    });

  // Attach event listeners to the input and list elements
  addEvents(ctx);

  // Get the data from the store if it is cached
  if (ctx.data.cache) await getData(ctx);

  /**
   * Emit the "init" event after the initialization stage is complete
   **/
  eventEmitter("init", ctx);
}
