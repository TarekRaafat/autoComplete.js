import { getQuery, checkTrigger } from "../helpers/io";
import { getData, findMatches } from "../controllers/dataController";
import { render, close } from "../controllers/listController";

/**
 * Start stage
 *
 * @param {Object} ctx - autoComplete.js context
 * @param {String} q - API search query value
 */
export default async function (ctx, q) {
  // Get "input" query value
  let queryVal = q || getQuery(ctx.input);
  queryVal = ctx.query ? ctx.query(queryVal) : queryVal;
  // Get trigger decision
  const condition = checkTrigger(queryVal, ctx.trigger, ctx.threshold);

  // Validate trigger condition
  if (condition) {
    // Get from source
    await getData(ctx, queryVal);
    // Check if data fetch failed
    if (ctx.feedback instanceof Error) return;
    // Find matching results to the query
    findMatches(queryVal, ctx);
    // Render "resultsList"
    if (ctx.resultsList) render(ctx);
  } else {
    // Close open list
    close(ctx);
  }
}
