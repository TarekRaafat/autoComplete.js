// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("autoComplete_input", function (event) {
  console.log(event.detail);
});

// The autoComplete.js Engine instance creator
new autoComplete({
  selector: "#autoComplete",
  data: {
    src: async () => {
      // Loading placeholder text
      // document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("./db/test.json");
      const data = await source.json();
      // Returns Fetched data
      return data;
    },
    cache: true,
  },
  // query: {
  //   manipulate: function (query) {
  //     return query;
  //   },
  // },
  searchEngine: "loose",
  placeHolder: "Search for Food!",
  highlight: true,
  // debounce: 3000,
  threshold: 2,
  onSelection: (feedback) => {
    console.log(feedback);
  },
});
