import searchEngine from "../services/search";

// Prepare data from data source
const prepareData = (request, callback) => {
  // Resolve the incoming data promise
  Promise.resolve(request).then((data) => {
    // Pass the data value to the callback function
    callback(data);
  });
};
// Gets the input search value "query"
const getInputValue = (inputField) => {
  return inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement
    ? inputField.value.toLowerCase()
    : inputField.innerHTML.toLowerCase();
};
// Intercept query value
const prepareQueryValue = (query, inputValue) => {
  return query && query.manipulate ? query.manipulate(inputValue) : inputValue;
};
// App triggering condition
const checkTriggerCondition = (trigger, queryValue, threshold) => {
  return trigger.condition
    ? trigger.condition(queryValue)
    : queryValue.length >= threshold && queryValue.replace(/ /g, "").length;
};
// List search matching results
const listMatchingResults = (query, data, config) => {
  // Final highlighted results list
  const resList = [];
  // Checks input has matches in data source
  for (let index = 0; index < data.length; index++) {
    const record = data[index];
    // Search/Matching function
    const search = (key) => {
      // This Record value
      const recordValue = key ? record[key] : record;
      // Check if record does exist before search
      if (recordValue) {
        // Holds match value
        const match =
          typeof config.searchEngine === "function"
            ? config.searchEngine(query, recordValue, config)
            : searchEngine(query, recordValue, config);
        // Push match to results list with key if set
        if (match && key) {
          resList.push({
            key,
            index,
            match,
            value: record,
          });
          // Push match to results list without key if not set
        } else if (match && !key) {
          resList.push({
            index,
            match,
            value: record,
          });
        }
      }
    };
    // If no data key not set
    if (config.key) {
      // If data key is set
      // Iterates over all set data keys
      for (const key of config.key) {
        search(key);
      }
    } else {
      search();
    }
  }
  // Sorting / Slicing final results list
  const list = config.sort
    ? resList.sort(config.sort).slice(0, config.maxResults)
    : resList.slice(0, config.maxResults);
  // Returns rendered list
  return {
    matches: resList.length,
    list,
  };
};

export { prepareData, getInputValue, prepareQueryValue, checkTriggerCondition, listMatchingResults };
