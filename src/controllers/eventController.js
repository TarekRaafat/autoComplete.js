import start from "../services/start";
import { click, navigate, close } from "./listController";

/**
 * Manage all given events
 *
 * @param {Object} events - List of events
 * @param {Function} callback - Callback function
 */
const eventsManager = (events, callback) => {
  for (const element in events) {
    for (const event in events[element]) {
      callback(element, event);
    }
  }
};

/**
 * Attach all events listeners
 *
 * @param {Object} ctx - autoComplete.js context
 */
const addEvents = (ctx) => {
  const events = {
    input: {
      ...(ctx.events && ctx.events.input),
      input() {
        start(ctx);
      },
      keydown(event) {
        navigate(event, ctx);
      },
      blur() {
        close(ctx);
      },
    },
  };

  if (ctx.resultsList) {
    events.list = {
      ...(ctx.events && ctx.events.list),
      mousedown(event) {
        event.preventDefault();
      },
      click(event) {
        click(event, ctx);
      },
    };
  }

  // Populate all events into events list
  eventsManager(events, (element, event) => {
    ctx[element].addEventListener(event, events[element][event]);
  });
};

/**
 * Remove all attached public events listeners
 *
 * @param {Object} ctx - autoComplete.js context
 */
const removeEvents = (ctx) => {
  eventsManager(ctx.events, (element, event) => {
    ctx[element].removeEventListener(event, ctx.events[element][event]);
  });
};

export { addEvents, removeEvents };
