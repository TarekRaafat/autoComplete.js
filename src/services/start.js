import { getInputValue, prepareQuery } from "../helpers/io";
import checkTriggerCondition from "../helpers/trigger";
import { dataStore, findMatches } from "../controllers/dataController";
import eventEmitter from "../helpers/eventEmitter";
import { renderList, closeList } from "../controllers/listController";

export default async function (ctx) {
  let { input, data, resultsList } = ctx;
  // Prepare raw "inputField" value
  const inputValue = getInputValue(input);
  // Prepare manipulated query value
  const query = prepareQuery(ctx, inputValue);
  // Get trigger decision
  const triggerCondition = checkTriggerCondition(ctx, query);

  // Validate trigger condition
  if (triggerCondition) {
    // Store the data from source
    data.store = await dataStore(ctx);

    /**
     * @emit {response} event on data request
     **/
    eventEmitter({ input, dataFeedback: data.store }, "response");

    // Find results matching to the query
    const results = data.filter ? data.filter(findMatches(ctx, query)) : findMatches(ctx, query);

    // Prepare data feedback object
    ctx.dataFeedback = {
      input: inputValue,
      query,
      matches: results,
      results: results.slice(0, resultsList.maxResults),
    };

    /**
     * @emit {results} event on search response with matches
     **/
    eventEmitter(ctx, "results");

    // Stop list rendering if "resultsList" NOT active
    if (!resultsList.render) return;

    // Generate & Render "resultsList"
    renderList(ctx);
  } else {
    // Close open list
    closeList(ctx);
  }
}
