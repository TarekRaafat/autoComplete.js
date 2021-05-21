import start from "../services/start";
import debouncer from "../helpers/debouncer";
import { click, navigate } from "./actionController";
import { closeList } from "./listController";

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
  const { events, resultsList } = ctx;

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

  // Add "inputField" trigger events
  ctx.trigger.events.forEach((event) => {
    if (!publicEvents.input[event]) {
      publicEvents.input[event] = debouncer(() => start(ctx), ctx.debounce);
    }
  });

  // Populate all private events into public events list
  if (resultsList.render) {
    eventsListManager(privateEvents, (event, element) => {
      if (!publicEvents[element][event]) {
        publicEvents[element][event] = privateEvents[element][event];
      }
    });
  }

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
