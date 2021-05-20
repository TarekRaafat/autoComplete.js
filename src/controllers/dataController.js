import eventEmitter from "../helpers/eventEmitter";
import search from "./searchController";

const getData = async (ctx) => {
  const { input, data } = ctx;

  if (data.cache && data.store) return;

  try {
    data.store = typeof data.src === "function" ? await data.src() : data.src;
  } catch (error) {
    data.store = error;
  }

  /**
   * @emit {response} event on data request
   **/
  eventEmitter({ input, dataFeedback: data.store }, "response");
};

/**
 * Find matches to "query"
 *
 * @param {Object} ctx - Search engine configurations
 * @param {String} input - User's raw input value
 * @param {String} query - User's search query string
 *
 * @returns {Array} - Matches
 */
const findMatches = (ctx, input, query) => {
  const { data, searchEngine: customSearch } = ctx;

  let matches = [];

  // Find matches from data source
  data.store.forEach((record, index) => {
    const find = (key) => {
      const recordValue = key ? record[key] : record;

      const match =
        typeof customSearch === "function" ? customSearch(query, recordValue) : search(ctx, query, recordValue);

      if (!match) return;

      let result = {
        index,
        match,
        value: record,
      };

      if (key) result.key = key;

      matches.push(result);
    };

    if (data.key) {
      for (const key of data.key) {
        find(key);
      }
    } else {
      find();
    }
  });

  // Find results matching to the query
  if (data.filter) matches = data.filter(matches);

  // Prepare data feedback object
  ctx.dataFeedback = {
    input,
    query,
    matches,
    results: matches.slice(0, ctx.resultsList.maxResults),
  };

  /**
   * @emit {results} event on search response with matches
   **/
  eventEmitter(ctx, "results");
};

export { getData, findMatches };
