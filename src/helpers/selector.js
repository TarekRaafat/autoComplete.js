/**
 * DOM Element selector
 *
 * @param {String} element - html tag
 * @param {HTMLElement} from - the element will be selected
 *
 * @return {HTMLElement} - selected html element
 */
export default (element, from) =>
  typeof element === "string" ? (from || document).querySelector(element) : element || null;
