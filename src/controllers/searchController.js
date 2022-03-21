import { format, mark } from "../helpers/io";

/**
 * Find matching characters in record
 *
 * @param {String} query - Search query value
 * @param {String} record - Data record string
 * @param {Object} options - Search Engine configuration options
 *
 * @returns {String} - Matching data record
 */
export default (query, record, options) => {
  const { mode, diacritics, highlight } = options || {};

  const nRecord = format(record, diacritics);
  record = String(record);
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
  } else if (mode === "multiple") {
      let match = '';
        query.split(' ').forEach( sStr => {
          let _match = nRecord.indexOf(sStr);
          if (~_match) {
              query = record.substring(_match, _match + query.length);
              //Add Existing match to a new match
              if ( match.length ) {
                _match = match.indexOf(sStr);
                query = match.substring(_match, _match + sStr.length);
                record = match;
              }
              // Highlight matching characters if active
              _match = highlight ? record.replace(query, mark(query, highlight)) : record;
              match = _match;
          }
      });
          return match;
  } else {
    // Get starting index of matching characters
    let match = nRecord.indexOf(query);
    // Strict mode
    if (~match) {
      // Extract matching characters from record
      query = record.substring(match, match + query.length);
      // Highlight matching characters if active
      match = highlight ? record.replace(query, mark(query, highlight)) : record;

      return match;
    }
  }
};
