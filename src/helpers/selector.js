/**
 * DOM Element selector
 *
 * @param {String} element - html tag
 *
 * @returns {HTMLElement} - selected html element
 */
export default (element) => (typeof element === "string" ? document.querySelector(element) : element || null);
