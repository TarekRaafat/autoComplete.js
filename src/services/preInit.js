/**
 * Pre-Initialization stage
 *
 * @param {Object} ctx - autoComplete.js context
 */
export default (ctx) => {
  // Callback function to execute when mutations are observed
  const callback = (mutations, observer) => {
    mutations.forEach((mutation) => {
      // Check if "inputField" added to the DOM
      if (ctx.input) {
        // If yes disconnect the observer
        observer.disconnect();
        // Initialize autoComplete.js
        ctx.init();
      }
    });
  };
  // Create mutation observer instance
  const observer = new MutationObserver(callback);
  // Start observing the entire DOM until "inputField" is present
  // The entire document will be observed for all changes
  observer.observe(document, { childList: true, subtree: true });
};
