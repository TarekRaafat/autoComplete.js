import eventEmitter from "../helpers/eventEmitter";
import search from "./searchController";

/**
 * Get data from source
 *
 * @param {Object} ctx - The context object for the autoComplete.js script
 * @param {String} query - The search query string entered by the user
 */
const getData = async (ctx, query) => {
  // Return if data is already cached or stored in ctx.data
  if (ctx.data.cache && ctx.data.store) return;

  // Get data from source
  const src = ctx.data.src;

  // Set ctx.feedback and ctx.data.store to the result of src function or src itself
  // If src is an async function, await its result before assigning it to ctx.feedback and ctx.data.store
  ctx.feedback = ctx.data.store =
    src instanceof Function ? (src.constructor.name === "AsyncFunction" ? await src(query) : src(query)) : src;

  /**
   * Emit the "response" event with the updated context object
   **/
  eventEmitter("response", ctx);
};

/**
 * Find matches to the search query in the data source
 *
 * @param {String} query - The search query string entered by the user
 * @param {Object} ctx - The context object for the autoComplete.js script
 */
const findMatches = (query, ctx) => {
  // Destructure data and searchEngine from ctx
  const { data, searchEngine } = ctx;

  // Find matches in data.store
  // If data.keys is present, map over it and find a match for each key in value
  // If data.keys is not present, find a match for the entire value
  // Filter out any falsy values from the result
  const matches = data.store
    .flatMap((value, index) => {
      const find = (key) => {
        const record = key ? value[key] : value;

        // Find match using searchEngine function or search function from searchController module
        // Pass in the query, record, and relevant options to the search function
        const match =
          typeof searchEngine === "function"
            ? searchEngine(query, record)
            : search(query, record, {
                mode: searchEngine,
                diacritics: ctx.diacritics,
                highlight: ctx.resultItem.highlight,
              });
        // Return the match and value if match is truthy, otherwise return undefined
        return match && { match, value, key };
      };

      // If data.keys is present, map over it and find a match for each key in value
      // If data.keys is not present, find a match for the entire value
      return data.keys ? data.keys.map(find) : find();
    })
    .filter((result) => result);

  // Filter the matches using the data.filter function if it is present, otherwise use the matches as is
  // Then slice the result to get the first ctx.resultsList.maxResults number of items
  const results = (data.filter ? data.filter(matches) : matches).slice(0, ctx.resultsList.maxResults);

  // Prepare data feedback object
  ctx.feedback = { query, matches, results };

  /**
   * Emit the "results" event on search response with matches
   **/
  eventEmitter("results", ctx);
};

export { getData, findMatches };
