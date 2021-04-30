// Result item constructor
const item = (className, value) => `<span class="${className}">${value}</span>`;

/**
 * Search common characters within record
 *
 * @param {String} query - User's search query value after manipulation
 * @param {String} record - The data item string to be compared
 * @param {Object {searchEngine: String, highlight: Boolean}} config - The search engine configurations
 *
 * @return {String} - The matched data item string
 */
export default (query, record, config) => {
  // Current record value toLowerCase
  const recordLowerCase = config.diacritics
    ? record
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .normalize("NFC")
    : record.toLowerCase();
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
        recordChar = config.resultItem.highlight.render
          ? item(config.resultItem.highlight.className, recordChar)
          : recordChar;
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
      const pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
      // Search for a match Query in Record
      query = pattern.exec(record);
      const match = config.resultItem.highlight.render
        ? record.replace(query, item(config.resultItem.highlight.className, query))
        : record;
      // Return the match
      return match;
    }
  }
};
