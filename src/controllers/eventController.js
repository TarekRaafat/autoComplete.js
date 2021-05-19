import debouncer from "../helpers/debouncer";
import { navigate } from "./navigationController";
import { closeList, selectItem } from "../controllers/listController";

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

  const publicEvents = (ctx.events = {
    input: {
      ...(events && events.input),
    },
    ...(resultsList.render && { list: events ? { ...events.list } : {} }),
  });

  const privateEvents = {
    input: {
      keydown: (event) => {
        resultsList.navigation ? resultsList.navigation(event) : navigate(ctx, event);
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
        const resultItemElement = ctx.resultItem.element.toUpperCase();
        const items = Array.from(ctx.list.children);
        const item = event.target.closest(resultItemElement);

        if (item && item.nodeName === resultItemElement) {
          event.preventDefault();
          const index = items.indexOf(item) - 1;

          selectItem(ctx, event, index);
        }
      },
    },
  };

  // Add input field trigger events
  ctx.trigger.events.forEach((event) => {
    if (!publicEvents.input[event]) {
      publicEvents.input[event] = debouncer(ctx.start, ctx.debounce);
    }
  });

  // Populate private events to public events list
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

// Remove all attached event listeners
const removeEventListeners = (ctx) => {
  // Remove all attached events
  eventsListManager(ctx.events, (event, element) => {
    ctx[element].removeEventListener(event, ctx.events[element][event]);
  });
};

export { addEventListeners, removeEventListeners };
