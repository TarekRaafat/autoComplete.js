import searchEngine from "../services/search";

/**
 * Find matching results
 *
 * @param {Object} config - The search engine configurations
 * @param {String} query - User's search query string
 *
 * @return {Array} - The matching results list array
 */
export default (config, query) => {
  // Deconstructing config object
  const { data, searchEngine: customSearchEngine } = config;

  // Matching results list
  const results = [];

  // Get matches in data source
  data.store.forEach((record, index) => {
    // Search/Matching function
    const search = (key) => {
      // This Record value
      const recordValue = (key ? record[key] : record).toString();
      // Check if record does exist before search
      if (recordValue) {
        // Holds match value
        const match = typeof customSearchEngine === "function"
            ? customSearchEngine(query, recordValue)
            : searchEngine(query, recordValue, config);
        // Push match to results list with key if set
        if (match && key) {
          results.push({
            key,
            index,
            match,
            value: record,
          });
          // Push match to results list without key if not set
        } else if (match && !key) {
          results.push({
            index,
            match,
            value: record,
          });
        }
      }
    };
    // If no data key not set
    if (data.key) {
      // If data key is set
      // Iterates over all set data keys
      for (const key of data.key) {
        search(key);
      }
    } else {
      search();
    }
  });

  // Return matching results list
  return results;
};
