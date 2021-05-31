import eventEmitter from "../helpers/eventEmitter";
import search from "./searchController";

/**
 * Get data from source
 *
 * @param {Object} ctx - autoComplete.js context
 */
const getData = async (ctx) => {
  let { input, query, data } = ctx;

  if (data.cache && data.store) return;

  query = query ? query(input.value) : input.value;

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
  const { data, searchEngine, diacritics, resultsList, resultItem } = ctx;

  let matches = [];

  // Find matches from data source
  data.store.forEach((value, index) => {
    const find = (key) => {
      const record = key ? value[key] : value;

      const match =
        typeof searchEngine === "function"
          ? searchEngine(query, record)
          : search(query, record, {
              mode: searchEngine,
              diacritics,
              highlight: resultItem.highlight,
            });

      if (!match) return;

      let result = { match, value };

      if (key) result.key = key;

      matches.push(result);
    };

    if (data.keys) {
      for (const key of data.keys) {
        find(key);
      }
    } else {
      find();
    }
  });

  // Find results matching to the query
  if (data.filter) matches = data.filter(matches);

  const results = matches.slice(0, resultsList.maxResults);

  // Prepare data feedback object
  ctx.feedback = { query, matches, results };

  /**
   * @emit {results} event on search response with matches
   **/
  eventEmitter("results", ctx);
};

export { getData, findMatches };
