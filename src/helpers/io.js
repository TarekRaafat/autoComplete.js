/**
 * DOM Element selector
 *
 * @param {String} element - html tag
 *
 * @returns {HTMLElement} - selected html element
 */
const select = (element) => (typeof element === "string" ? document.querySelector(element) : element || null);

/**
 * Create new element
 *
 * @param {String} tag - html element
 * @param {Object} options - of the html element
 *
 * @returns {HTMLElement} - newly create html element
 */
const create = (tag, options) => {
  const element = typeof tag === "string" ? document.createElement(tag) : tag;

  for (const key in options) {
    const value = options[key];

    if (key === "dest") {
      select(value[0]).insertAdjacentElement(value[1], element);
    } else if (key === "around") {
      const reference = select(value);

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

/**
 * Get the "inputField" search value
 *
 * @param {Element} inputField - autoComplete.js "inputField" or textarea element
 *
 * @returns {String} - Raw "inputField" value as a string
 */
const getInput = (inputField) =>
  inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement
    ? inputField.value
    : inputField.innerHTML;

/**
 * Format raw input value
 *
 * @param {String} inputValue - user's raw search query value
 * @param {Object} diacritics - formatting on/off
 *
 * @returns {String} - Raw "inputField" value as a string
 */
const format = (value, diacritics) => {
  value = value.toLowerCase();

  return (
    diacritics
      ? value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .normalize("NFC")
      : value
  ).toString();
};

/**
 * Intercept query value
 *
 * @param {String} input - user's raw search input value
 * @param {Object} query - query interceptor
 * @param {Boolean} diacritics - formatting on/off
 *
 * @returns {String} - Manipulated Query
 */
const getQuery = (input, query, diacritics) => {
  return query && query.manipulate ? query.manipulate(input) : format(input, diacritics);
};

/**
 * Debouncer
 *
 * @param {Function} callback - Callback function
 * @param {Number} delay - Delay number value
 *
 * @returns {Function} - Debouncer function
 */
const delay = (callback, delay) => {
  let inDebounce;

  return () => {
    clearTimeout(inDebounce);

    inDebounce = setTimeout(() => callback(), delay);
  };
};

/**
 * autoComplete.js triggering condition
 *
 * @param {String} query - User's manipulated search query value
 * @param {Function} condition - trigger condition rule
 * @param {Number} threshold - of query length to trigger
 *
 * @returns {Boolean} triggerCondition - For autoComplete.js to run
 */
const checkTrigger = (query, condition, threshold) => {
  query = query.replace(/ /g, "");

  return condition ? condition(query) : query.length >= threshold;
};

/**
 * Highlight result item
 *
 * @param {String} value - user's raw search query value
 * @param {Array} className - of highlighted character
 *
 * @returns {String} - highlighted character
 */
const mark = (value, className) =>
  create("mark", {
    ...(className && { className }),
    innerHTML: value,
  }).outerHTML;

export { select, create, getInput, format, getQuery, delay, checkTrigger, mark };
