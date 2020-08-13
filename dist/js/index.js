// autoComplete.js input eventListener on connect event
document.querySelector("#autoComplete").addEventListener("connect", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on initialization event
document.querySelector("#autoComplete").addEventListener("init", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on data request event
document.querySelector("#autoComplete").addEventListener("request", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on data response event
document.querySelector("#autoComplete").addEventListener("response", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on post results list rendering event
document.querySelector("#autoComplete").addEventListener("rendered", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on results list navigation
document.querySelector("#autoComplete").addEventListener("navigation", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on post detaching from input event
document.querySelector("#autoComplete").addEventListener("detached", function (event) {
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

// autoComplete.detach();
