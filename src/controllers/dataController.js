import searchEngine from "../services/search";

/**
 * Find matches to `query`
 *
 * @param {Object} config - The search engine configurations
 * @param {String} query - User's search query string
 *
 * @return {Array} - Matches
 */
export default (config, query) => {
  const { data, searchEngine: customSearchEngine } = config;

  const results = [];

  // Get matches in data source
  data.store.forEach((record, index) => {
    const search = (key) => {
      const recordValue = (key ? record[key] : record).toString();
      if (recordValue) {
        const match = typeof customSearchEngine === "function"
            ? customSearchEngine(query, recordValue)
            : searchEngine(query, recordValue, config);

        if (match && key) {
          results.push({
            key,
            index,
            match,
            value: record,
          });
        } else if (match && !key) {
          results.push({
            index,
            match,
            value: record,
          });
        }
      }
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
