import { getInput, getQuery, checkTrigger } from "../helpers/io";
import { getData, findMatches } from "../controllers/dataController";
import { renderList, closeList } from "../controllers/listController";

export default async function (ctx) {
  const { input, query, trigger, threshold, resultsList } = ctx;

  // Get raw "inputField" value
  const inputValue = getInput(input);
  // Prepare manipulated query value
  const queryValue = getQuery(inputValue, (query || {}).manipulate);
  // Get trigger decision
  const condition = checkTrigger(queryValue, (trigger || {}).condition, threshold);

  // Validate trigger condition
  if (condition) {
    // Get from source
    await getData(ctx);
    // Find matching results to the query
    findMatches(inputValue, queryValue, ctx);
    // Generate & Render "resultsList"
    if (resultsList.render) renderList(ctx);
  } else {
    // Close open list
    closeList(ctx);
  }
}
