import { format, mark } from "../helpers/io";

/**
 * Find matching characters in record
 *
 * @param {String} query - User's manipulated search query value
 * @param {String} record - Data record string to be compared
 * @param {Object} options - autoComplete.js configurations
 *
 * @returns {String} - Matched data record string
 */
export default (query, record, options) => {
  const { mode, diacritics, highlight, className } = options;

  const newRecord = format(record, diacritics);
  query = format(query, diacritics);

  if (mode === "loose") {
    // Query string with no spaces
    query = query.replace(/ /g, "");
    const queryLength = query.length;
    // Query character cursor position based on match
    let cursor = 0;
    // Matching characters
    const match = Array.from(record)
      .map((character, index) => {
        // Matching case
        if (cursor < queryLength && newRecord[index] === query[cursor]) {
          // Highlight matching character if active
          character = highlight ? mark(character, className) : character;
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
    if (newRecord.includes(query)) {
      // Ignore special characters & caseSensitivity
      const pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
      query = pattern.exec(record);
      // Highlight matching characters if active
      const match = highlight ? record.replace(query, mark(query, className)) : record;

      return match;
    }
  }
};
