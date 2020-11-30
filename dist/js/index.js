// // autoComplete.js input eventListener on connect event
// document.querySelector("#autoComplete").addEventListener("connect", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on initialization event
// document.querySelector("#autoComplete").addEventListener("init", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on data response event
// document.querySelector("#autoComplete").addEventListener("fetch", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on search results event
// document.querySelector("#autoComplete").addEventListener("results", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on post results list rendering event
// document.querySelector("#autoComplete").addEventListener("rendered", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on results list navigation
// document.querySelector("#autoComplete").addEventListener("navigation", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on post un-initialization event
// document.querySelector("#autoComplete").addEventListener("unInit", function (event) {
//   console.log(event);
// });
// The autoComplete.js Engine instance creator
const autoComplete = new autoCompleteJS({
  selector: "#autoCompleteJS",
  data: {
    src: async () => {
      // Loading placeholder text
      document.querySelector("#autoCompleteJS").setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("./db/generic.json");
      const data = await source.json();
      // Post Loading placeholder text
      document.querySelector("#autoCompleteJS").setAttribute("placeholder", autoComplete.placeHolder);
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
    document.querySelector("#autoCompleteJS").value = "";
    console.log(feedback);
  },
});

// autoComplete.detach();
