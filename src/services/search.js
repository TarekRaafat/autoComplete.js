import { formatRawInputValue } from "../controllers/inputController";

// Highlighted result item constructor
const highlightChar = (className, value) => `<span class="${className}">${value}</span>`;

/**
 * Find matching characters in record
 *
 * @param {String} query - User's manipulated search query value
 * @param {String} record - Data record string to be compared
 * @param {Object} config - autoComplete configurations
 *
 * @return {String} - Matched data record string
 */
export default (query, record, config) => {
  const formattedRecord = formatRawInputValue(record, config);

  if (config.searchEngine === "loose") {
    // Query string with no spaces
    query = query.replace(/ /g, "");
    const queryLength = query.length;
    // Query character cursor position based on match
    let cursor = 0;
    // Matching characters
    const match = Array.from(record)
      .map((character, index) => {
        // Matching case
        if (cursor < queryLength && formattedRecord[index] === query[cursor]) {
          // Highlight matching character if active
          character = config.resultItem.highlight.render
            ? highlightChar(config.resultItem.highlight.className, character)
            : character;
          // Move cursor position
          cursor++;
        }

        return character;
      })
      .join("");
    // If record is fully scanned
    if (cursor === queryLength) return match;
  } else {
    // Strict mode
    if (formattedRecord.includes(query)) {
      // Ignore special characters & caseSensitivity
      const pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
      query = pattern.exec(record);
      // Highlight matching characters if active
      const match = config.resultItem.highlight.render
        ? record.replace(query, highlightChar(config.resultItem.highlight.className, query))
        : record;

      return match;
    }
  }
};
