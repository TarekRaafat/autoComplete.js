import searchEngine from "./searchController";

const dataStore = async (ctx) => {
  if (ctx.data.cache && ctx.data.store) return;

  return typeof ctx.data.src === "function" ? await ctx.data.src() : ctx.data.src;
};

/**
 * Find matches to "query"
 *
 * @param {Object} ctx - Search engine configurations
 * @param {String} query - User's search query string
 *
 * @return {Array} - Matches
 */
const findMatches = (ctx, query) => {
  const { data, searchEngine: customSearchEngine } = ctx;

  const results = [];

  // Find matches from data source
  data.store.forEach((record, index) => {
    const search = (key) => {
      const recordValue = key ? record[key] : record;

      const match =
        typeof customSearchEngine === "function"
          ? customSearchEngine(query, recordValue)
          : searchEngine(ctx, query, recordValue);

      if (!match) return;

      let result = {
        index,
        match,
        value: record,
      };

      if (key) result.key = key;

      results.push(result);
    };

    if (data.key) {
      for (const key of data.key) {
        search(key);
      }
    } else {
      search();
    }
  });

  return results;
};

export { dataStore, findMatches };
