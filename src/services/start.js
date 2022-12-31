import { getQuery, checkTrigger } from "../helpers/io";
import { getData, findMatches } from "../controllers/dataController";
import { render, close } from "../controllers/listController";

/**
 * Starts the search process by getting the search query, checking if it meets the trigger conditions,
 * and fetching and processing the data if necessary.
 *
 * @param {Object} ctx - The context object for the autoComplete.js script.
 * @param {String} q - The API search query value. If not provided, it will be retrieved from the input element.
 */
export default async function (ctx, q) {
  // Get "input" query value
  let queryVal = q || getQuery(ctx.input);
  // Apply the custom query function if provided
  queryVal = ctx.query ? ctx.query(queryVal) : queryVal;
  // Check if the query meets the trigger conditions
  const condition = checkTrigger(queryVal, ctx.trigger, ctx.threshold);
  // Cancel the previous debounce timeout
  clearTimeout(ctx.debouncer);

  // Validate the trigger condition
  if (condition) {
    // Set a new debounce timeout
    ctx.debouncer = setTimeout(() => {
      // Get data from the specified source
      await getData(ctx, queryVal);
      // Find matching results for the query in the data
      findMatches(queryVal, ctx);
      // Render the results list if it is enabled
      ctx.resultsList && render(ctx);
    }, ctx.debounce);
  } else {
    // Close the open results list if it exists
    close(ctx);
  }
}
