// autoComplete.js on connect event emitter
document.querySelector("#autoComplete").addEventListener("autoCompleteJS_connect", function (event) {
  console.log(event);
});
// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("autoCompleteJS_init", function (event) {
  console.log(event);
});
// The autoComplete.js Engine instance creator
const autoComplete = new autoCompleteJS({
  selector: "#autoComplete",
  data: {
    src: async () => {
      // Loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("./db/generic.json");
      const data = await source.json();
      // Returns Fetched data
      return data;
    },
    key: ["food", "cities", "animals"],
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
  debounce: 300,
  threshold: 0,
  resultsList: {
    render: true,
    container: (element) => {
      // console.log(element);
    },
  },
  resultItem: {
    content: (data, element) => {
      // console.log(data, element);
    },
  },
  feedback: (event, data) => {
    console.log(event, data);
  },
  onSelection: (feedback) => {
    document.querySelector("#autoComplete").value = "";
    console.log(feedback);
  },
});
