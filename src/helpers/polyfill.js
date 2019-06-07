// Refs: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
const CustomEventPolyfill = (event, params) => {
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  const evt = document.createEvent("CustomEvent");
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
};
CustomEventPolyfill.prototype = window.Event.prototype;

const CustomEventWrapper =
  (typeof window.CustomEvent === "function" && window.CustomEvent) || CustomEventPolyfill;

const initElementClosestPolyfill = () => {
  // Element.prototype.closest
  // Refs: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      let el = this;
      do {
        if (el.matches(s)) {
          return el;
        }
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
};

export const Polyfill = {
  CustomEventWrapper,
  initElementClosestPolyfill,
};
