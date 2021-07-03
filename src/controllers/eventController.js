import start from "../services/start";
import { debounce } from "../helpers/io";
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
  const { events, trigger, debounce: timer, resultsList } = ctx;

  const run = debounce(() => start(ctx), timer);

  // Public events listeners list
  const publicEvents = (ctx.events = {
    input: {
      ...(events && events.input),
    },
    ...(resultsList && { list: events ? { ...events.list } : {} }),
  });

  // Private events listeners list
  const privateEvents = {
    input: {
      input() {
        run();
      },
      keydown(event) {
        navigate(event, ctx);
      },
      blur() {
        close(ctx);
      },
    },
    list: {
      mousedown(event) {
        event.preventDefault();
      },
      click(event) {
        click(event, ctx);
      },
    },
  };

  // Populate all private events into public events list
  eventsManager(privateEvents, (element, event) => {
    // Do NOT populate any events except "input" If "resultsList" disabled
    if (!resultsList && event !== "input") return;
    // Do NOT overwrite public events
    if (publicEvents[element][event]) return;
    // Populate public events
    publicEvents[element][event] = privateEvents[element][event];
  });

  // Attach all public events
  eventsManager(publicEvents, (element, event) => {
    ctx[element].addEventListener(event, publicEvents[element][event]);
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
