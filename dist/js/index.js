// // autoComplete.js on connect event emitter
// document.querySelector("#autoComplete").addEventListener("autoCompleteJS_connect", function (event) {
//   console.log(event);
// });
// // autoComplete.js on type event emitter
// document.querySelector("#autoComplete").addEventListener("autoCompleteJS_input", function (event) {
//   console.log(event);
// });
// The autoComplete.js Engine instance creator
const autoComplete = new autoCompleteJS({
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
    // key: ["food"],
    cache: true,
  },
  query: {
    manipulate: function (query) {
      return `${query}`;
    },
  },
  searchEngine: "loose",
  placeHolder: "Search for Food!",
  highlight: true,
  debounce: 500,
  threshold: 0,
  resultsList: {
    render: true,
  },
  feedback: (event, data) => {
    console.log(event, data);
  },
  onSelection: (feedback) => {
    console.log(feedback);
  },
});
