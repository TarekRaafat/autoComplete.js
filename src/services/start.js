import { getInputValue, prepareQuery } from "../helpers/io";
import checkTriggerCondition from "../helpers/trigger";
import { getData, findMatches } from "../controllers/dataController";
import { renderList, closeList } from "../controllers/listController";

export default async function (ctx) {
  // Get raw "inputField" value
  const inputValue = getInputValue(ctx.input);
  // Prepare manipulated query value
  const query = prepareQuery(ctx, inputValue);
  // Get trigger decision
  const triggerCondition = checkTriggerCondition(ctx, query);

  // Validate trigger condition
  if (triggerCondition) {
    // Get from source
    await getData(ctx);
    // Find matching results to the query
    findMatches(ctx, inputValue, query);
    // Generate & Render "resultsList"
    if (ctx.resultsList.render) renderList(ctx);
  } else {
    // Close open list
    closeList(ctx);
  }
}
