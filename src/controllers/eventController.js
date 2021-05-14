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

const addEventListeners = (ctx) => {
  const { resultsList } = ctx;

  const publicEvents = (ctx._events = {
    input: {},
    list: {},
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

  // Add input field events
  ctx.trigger.event.forEach((eventType) => {
    publicEvents.input[eventType] = debouncer(ctx.start, ctx.debounce);
  });

  // Add private events to public events list
  if (ctx.resultsList.render) {
    eventsListManager(privateEvents, (event, element) => {
      publicEvents[element][event] = privateEvents[element][event];
    });
  }

  // Attach all public events
  eventsListManager(publicEvents, (event, element) => {
    ctx[element].addEventListener(event, publicEvents[element][event]);
  });
};

const removeEventListeners = (ctx) => {
  // Remove all attached events
  eventsListManager(ctx._events, (event, element) => {
    ctx[element].removeEventListener(event, ctx._events[element][event]);
  });
};

export { addEventListeners, removeEventListeners };
