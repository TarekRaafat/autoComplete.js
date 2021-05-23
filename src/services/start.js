import { getInput, getQuery, checkTrigger } from "../helpers/io";
import { getData, findMatches } from "../controllers/dataController";
import { renderList, closeList } from "../controllers/listController";

export default async function (ctx) {
  const { input, query, trigger, threshold, resultsList } = ctx;

  // Get raw "inputField" value
  const inputVal = getInput(input);
  // Prepare manipulated query value
  const queryVal = getQuery(inputVal, query);
  // Get trigger decision
  const condition = checkTrigger(queryVal, trigger, threshold);

  // Validate trigger condition
  if (condition) {
    // Get from source
    await getData(ctx);
    // Find matching results to the query
    findMatches(inputVal, queryVal, ctx);
    // Generate & Render "resultsList"
    if (resultsList.render) renderList(ctx);
  } else {
    // Close open list
    closeList(ctx);
  }
}
