const prepareData = (request, callback) => {
  // Resolve the incoming data promise
  Promise.resolve(request()).then((data) => {
    // Pass the data value to the callback function
    callback(data);
  });
};

export { prepareData };
