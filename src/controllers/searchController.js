import { formatRawInputValue, highlightChar } from "../helpers/io";

/**
 * Find matching characters in record
 *
 * @param {Object} ctx - autoComplete configurations
 * @param {String} query - User's manipulated search query value
 * @param {String} record - Data record string to be compared
 *
 * @returns {String} - Matched data record string
 */
export default (ctx, query, record) => {
  const formattedRecord = formatRawInputValue(ctx, record);
  const resultItemHighlight = ctx.resultItem.highlight;
  let className, highlight;

  if (resultItemHighlight) {
    className = resultItemHighlight.className;
    highlight = resultItemHighlight.render;
  }

  if (ctx.searchEngine === "loose") {
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
          character = highlight ? highlightChar(className, character) : character;
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
      const match = highlight ? record.replace(query, highlightChar(className, query)) : record;

      return match;
    }
  }
};
