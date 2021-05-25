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
  const { mode, diacritics, highlight } = options || {};

  const nRecord = format(record, diacritics);
  query = format(query, diacritics);

  if (mode === "loose") {
    // Query string with no spaces
    query = query.replace(/ /g, "");
    const qLength = query.length;
    // Query character cursor position based on match
    let cursor = 0;
    // Matching characters
    const match = Array.from(record)
      .map((character, index) => {
        // Matching case
        if (cursor < qLength && nRecord[index] === query[cursor]) {
          // Highlight matching character if active
          character = highlight ? mark(character, highlight) : character;
          // Move cursor position
          cursor++;
        }

        return character;
      })
      .join("");

    // If record is fully scanned
    if (cursor === qLength) return match;
  } else {
    // Get starting index of matching characters
    let match = nRecord.indexOf(query);
    // Strict mode
    if (match >= 0) {
      // Extract matching characters from record
      query = record.substring(match, match + query.length);
      // Highlight matching characters if active
      match = highlight ? record.replace(query, mark(query, highlight)) : record;

      return match;
    }
  }
};
