/**
 * Search common characters within record
 *
 * @param {String} query - User's search query value after manipulation
 * @param {String} data - The data item string to be compared
 * @param {Object{searchEngine: String, highlight: Boolean}} config - The search engine configurations
 *
 * @return {String} match - The matched data item string
 */
export default (query, record, config) => {
  // Current record value toLowerCase
  const recordLowerCase = record.toLowerCase();
  // Loose mode
  if (config.searchEngine === "loose") {
    // Search query string sanitized & normalized
    query = query.replace(/ /g, "");
    // Array of matching characters
    const match = [];
    // Query character position based on success
    let searchPosition = 0;
    // Iterate over record characters
    for (let number = 0; number < recordLowerCase.length; number++) {
      // Holds current record character
      let recordChar = record[number];
      // Matching case
      if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
        // Highlight matching character
        recordChar = config.highlight ? `<span class="autoComplete_highlighted">${recordChar}</span>` : recordChar;
        // Increment search position
        searchPosition++;
      }
      // Adds matching character to the matching list
      match.push(recordChar);
    }
    // Non-Matching case
    if (searchPosition === query.length) {
      // Return the joined match
      return match.join("");
    }
    // Strict mode
  } else {
    if (recordLowerCase.includes(query)) {
      // Regular Expression Query Pattern Ignores caseSensitive
      const pattern = new RegExp(`${query}`, "i");
      // Search for a match Query in Record
      query = pattern.exec(record);
      const match = config.highlight
        ? record.replace(query, `<span class="autoComplete_highlighted">${query}</span>`)
        : record;
      // Returns the match
      return match;
    }
  }
};
