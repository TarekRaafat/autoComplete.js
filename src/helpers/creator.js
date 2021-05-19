import selector from "./selector";

/**
 * Create new element
 *
 * @param {String} tag - html element
 * @param {Object} options - of the html element
 *
 * @returns {HTMLElement} - newly create html element
 */
export default (tag, options) => {
  const element = typeof tag === "string" ? document.createElement(tag) : tag;

  for (const key in options) {
    const value = options[key];

    if (key === "dest") {
      selector(value[0]).insertAdjacentElement(value[1], element);
    } else if (key === "around") {
      const reference = selector(value);

      reference.parentNode.insertBefore(element, reference);

      element.appendChild(reference);

      if (reference.getAttribute("autofocus") != null) reference.focus();
    } else if (key in element) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  return element;
};
