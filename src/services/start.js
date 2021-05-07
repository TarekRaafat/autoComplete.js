import { getInputValue, prepareQuery } from "../helpers/io";
import checkTriggerCondition from "../helpers/trigger";
import { dataStore, findMatches } from "../controllers/dataController";
import eventEmitter from "../helpers/eventEmitter";
import { renderList, closeList } from "../controllers/listController";

export default async function (ctx, event) {
  let { input, data, resultsList, feedback } = ctx;
  // Prepare raw "inputField" value
  const inputValue = getInputValue(input);
  // Prepare manipulated query value
  const query = prepareQuery(ctx, inputValue);
  // Get trigger decision
  const triggerCondition = checkTriggerCondition(ctx, event, query);

  // Validate trigger condition
  if (triggerCondition) {
    // Prepare data
    data.store = await dataStore(ctx);
    /**
     * @emit {response} event on data request
     **/
    eventEmitter({ input: input, dataFeedback: data.store }, "response");
    // Start autoComplete engine
    const results = data.filter ? data.filter(findMatches(ctx, query)) : findMatches(ctx, query);
    // Prepare data feedback object
    ctx.dataFeedback = { input, query, matches: results, results: results.slice(0, resultsList.maxResults) };
    /**
     * @emit {results} event on search response with results
     **/
    eventEmitter(ctx, "results");
    // If "resultsList" NOT active
    if (!resultsList.render) return feedback(dataFeedback);
    // Generate & Render "resultsList"
    renderList(ctx);
  } else {
    // Close open list
    closeList(ctx);
  }
}
