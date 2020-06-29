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

export { prepareData, getInputValue, prepareQueryValue, checkTriggerCondition };
