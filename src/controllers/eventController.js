import debouncer from "../helpers/debouncer";
import { navigate } from "./navigationController";
import { closeList, selectItem } from "../controllers/listController";

const addEventListeners = (ctx) => {
  const { resultsList } = ctx;

  ctx._events = {
    input: {
      keydown: (event) => {
        resultsList.navigation ? resultsList.navigation(event) : navigate(ctx, event);

        // Esc key
        if (event.keyCode === 27) {
          event.preventDefault();

          ctx.input.value = "";

          closeList(ctx);
        }
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

  const events = ctx._events;

  // Attach inputField events
  ctx.trigger.event.forEach((eventType) => {
    events.input[eventType] = debouncer((event) => ctx.start(ctx, event), ctx.debounce);
  });

  // Attach all events
  for (const element in events) {
    for (const event in events[element]) {
      ctx[element].addEventListener(event, events[element][event]);
    }
  }
};

const removeEventListeners = (ctx) => {
  // Remove all events
  for (const element in events) {
    for (const event in events[element]) {
      ctx[element].removeEventListener(event, events[element][event]);
    }
  }
};

export { addEventListeners, removeEventListeners };
