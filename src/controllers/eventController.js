import start from "../services/start";
import { debounce } from "../helpers/io";
import { click, navigate, closeList } from "./listController";

// Manage all given events
const eventsListManager = (events, callback) => {
  for (const element in events) {
    for (const event in events[element]) {
      callback(event, element);
    }
  }
};

// Attach all events listeners
const addEventListeners = (ctx) => {
  const { events, trigger, debounce: timer, resultsList } = ctx;

  const run = debounce(() => start(ctx), timer);

  // Public events listeners list
  const publicEvents = (ctx.events = {
    input: {
      ...(events && events.input),
    },
    ...(resultsList.render && { list: events ? { ...events.list } : {} }),
  });

  // Private events listeners list
  const privateEvents = {
    input: {
      input: () => {
        run();
      },
      keydown: (event) => {
        resultsList.navigation ? resultsList.navigation(event) : navigate(event, ctx);
      },
      blur: () => {
        closeList(ctx);
      },
    },
    list: {
      mousedown: (event) => {
        event.preventDefault();
      },
      click: (event) => {
        click(event, ctx);
      },
    },
  };

  // Populate all private events into public events list
  eventsListManager(privateEvents, (event, element) => {
    // do NOT populate list events If "resultsList" disabled
    element = resultsList.render ? element : "input";
    // do NOT overwrite public events
    if (publicEvents[element][event]) return;
    publicEvents[element][event] = privateEvents[element][event];
  });

  // Attach all public events
  eventsListManager(publicEvents, (event, element) => {
    ctx[element].addEventListener(event, publicEvents[element][event]);
  });
};

// Remove all attached public events listeners
const removeEventListeners = (ctx) => {
  eventsListManager(ctx.events, (event, element) => {
    ctx[element].removeEventListener(event, ctx.events[element][event]);
  });
};

export { addEventListeners, removeEventListeners };
