import eventEmitter from "../helpers/eventEmitter";
import search from "./searchController";

/**
 * Get data from source
 *
 * @param {Object} ctx - autoComplete.js context
 */
const getData = async (ctx, query) => {
  const { data } = ctx;

  if (data.cache && data.store) return;

  ctx.feedback = data.store = typeof data.src === "function" ? await data.src(query) : data.src;

  /**
   * @emit {response} event on data request
   **/
  eventEmitter("response", ctx);
};

/**
 * Find matches to "query"
 *
 * @param {String} query - User's search query string
 * @param {Object} ctx - autoComplete.js context
 */
const findMatches = (query, ctx) => {
  const { data, searchEngine } = ctx;

  let matches = [];

  // Find matches from data source
  data.store.forEach((record, index) => {
    const find = (key) => {
      const string = key ? record[key] : record;

      const match =
        typeof searchEngine === "function"
          ? searchEngine(query, record)
          : search(query, string, {
            mode: searchEngine,
            diacritics: ctx.diacritics,
            highlight: ctx.resultItem.highlight,
          });

      if (match) {
        let result = { match, record };

        if (key) result.key = key;

        matches.push(result);
      }
    };

    if (data.keys) {
      for (const key of data.keys) {
        find(key);
      }
    } else {
      find();
    }
  });

  // Filter matching results
  if (data.filter) matches = data.filter(matches);

  const results = matches.slice(0, ctx.resultsList.maxResults);

  // Prepare data feedback object
  ctx.feedback = { query, matches, results };

  /**
   * @emit {results} event on search response with matches
   **/
  eventEmitter("results", ctx);
};

export { getData, findMatches };
