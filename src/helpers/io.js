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
  const el = typeof tag === "string" ? document.createElement(tag) : tag;

  for (const key in options) {
    const val = options[key];

    if (key === "dest") {
      select(val[0]).insertAdjacentElement(val[1], el);
    } else if (key === "around") {
      const ref = select(val);

      ref.parentNode.insertBefore(el, ref);

      el.appendChild(ref);

      if (ref.getAttribute("autofocus") != null) ref.focus();
    } else if (key in el) {
      el[key] = val;
    } else {
      el.setAttribute(key, val);
    }
  }

  return el;
};

/**
 * Get the "inputField" search value
 *
 * @param {Element} field - autoComplete.js "inputField" or textarea element
 *
 * @returns {String} - Raw "inputField" value as a string
 */
const getInput = (field) =>
  field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : field.innerHTML;

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
 * @param {Function} query - query interceptor
 *
 * @returns {String} - Manipulated Query
 */
const getQuery = (input, query) => (query ? query(input) : input);

/**
 * Debouncer
 *
 * @param {Function} callback - Callback function
 * @param {Number} duration - Delay time value
 *
 * @returns {Function} - Debouncer function
 */
const debounce = (callback, duration) => {
  let timer;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => callback(), duration);
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

export { select, create, getInput, format, getQuery, debounce, checkTrigger, mark };
