import search from "./searchController";

const dataStore = async (ctx) => {
  const { data } = ctx;

  if (data.cache && data.store) return data.store;

  try {
    return typeof data.src === "function" ? await data.src() : data.src;
  } catch (error) {
    return error;
  }
};

/**
 * Find matches to "query"
 *
 * @param {Object} ctx - Search engine configurations
 * @param {String} query - User's search query string
 *
 * @returns {Array} - Matches
 */
const findMatches = (ctx, query) => {
  const { data, searchEngine: customSearch } = ctx;

  const results = [];

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

      results.push(result);
    };

    if (data.key) {
      for (const key of data.key) {
        find(key);
      }
    } else {
      find();
    }
  });

  return results;
};

export { dataStore, findMatches };
