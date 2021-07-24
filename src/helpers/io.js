/**
 * DOM Element selector
 *
 * @param {String|HTMLElement} element - html tag | html element
 *
 * @returns {HTMLElement} - selected html element
 */
const select = (element) => (typeof element === "string" ? document.querySelector(element) : element());

/**
 * Create new element or Edit existing element
 *
 * @param {String|HTMLElement} tag - html tag | html element
 * @param {Object} options - of the html element
 *
 * @returns {HTMLElement} - created html element
 */
const create = (tag, options) => {
  const el = typeof tag === "string" ? document.createElement(tag) : tag;

  for (const key in options) {
    const val = options[key];

    if (key === "inside") {
      val.append(el);
    } else if (key === "dest") {
      select(val[0]).insertAdjacentElement(val[1], el);
    } else if (key === "around") {
      const ref = val;
      ref.parentNode.insertBefore(el, ref);

      el.append(ref);

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
 * Get the "input" query value
 *
 * @param {Element} field - input or textarea element
 *
 * @returns {String} - Raw query value as a string
 */
const getQuery = (field) =>
  field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : field.innerHTML;

/**
 * Format input value
 *
 * @param {String} value - user's raw search query value
 * @param {Object} diacritics - formatting on/off
 *
 * @returns {String} - Raw "input" value as a string
 */
const format = (value, diacritics) => {
  value = String(value).toLowerCase();

  return diacritics
    ? value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .normalize("NFC")
    : value;
};

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
 * Trigger condition validator
 *
 * @param {String} query - User's manipulated search query value
 * @param {Function} condition - trigger condition rule
 * @param {Number} threshold - of query length to trigger
 *
 * @returns {Boolean} - For autoComplete.js to run or not
 */
const checkTrigger = (query, condition, threshold) => (condition ? condition(query) : query.length >= threshold);

/**
 * Highlight matching characters
 *
 * @param {String} value - user's raw search query value
 * @param {String} cls - of highlighted character
 *
 * @returns {HTMLElement} - newly create html element
 */
const mark = (value, cls) =>
  create("mark", {
    innerHTML: value,
    ...(typeof cls === "string" && { class: cls }),
  }).outerHTML;

export { select, create, getQuery, format, debounce, checkTrigger, mark };
