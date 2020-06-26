export default (query, record, options) => {
  // Current record value toLowerCase
  const recordLowerCase = record.toLowerCase();
  // Loose mode
  if (options.searchEngine === "loose") {
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
        recordChar = options.highlight ? `<span class=${options.highlight}>${recordChar}</span>` : recordChar;
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
      // Returns the match
      return options.highlight ? record.replace(query, `<span class=${options.highlight}>${query}</span>`) : record;
    }
  }
};
