/**
 * Checking whether an element is a promise or async function
 *
 * @param {Object} element - Element to check
 */

export default function isPromise(element) {
  if (!element) return false;

  if (element[Symbol.toStringTag] === 'Promise' || element[Symbol.toStringTag] === 'AsyncFunction') {
    return true;
  }

  return false;
}
