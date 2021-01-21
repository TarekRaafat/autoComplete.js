// // autoComplete.js input eventListener on connect event
// document.querySelector("#autoComplete").addEventListener("connect", function (event) {
//   console.log(event);
// });
// autoComplete.js input eventListener on initialization event
document.querySelector("#autoComplete").addEventListener("init", function (event) {
  console.log(event);
});
// // autoComplete.js input eventListener on input event
// document.querySelector("#autoComplete").addEventListener("input", function (event) {
//   console.log(event);
// });
// // autoComplete.js input eventListener on data response event
// document.querySelector("#autoComplete").addEventListener("fetch", function (event) {
//   console.log(event.detail);
// });
// // autoComplete.js input eventListener on search results event
// document.querySelector("#autoComplete").addEventListener("results", function (event) {
//   console.log(event.detail);
// });
// // autoComplete.js input eventListener on post results list rendering event
// document.querySelector("#autoComplete").addEventListener("rendered", function (event) {
//   console.log(event.detail);
// });
// // autoComplete.js input eventListener on results list navigation
// document.querySelector("#autoComplete").addEventListener("navigation", function (event) {
//   console.log(event.detail);
// });
// // autoComplete.js input eventListener on post un-initialization event
// document.querySelector("#autoComplete").addEventListener("unInit", function (event) {
//   console.log(event);
// });

// The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
  name: "food & drinks",
  selector: "#autoComplete",
  observer: false,
  data: {
    src: async () => {
      // Loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");

      if (!JSON.parse(localStorage.getItem("acData"))) {
        // Fetch External Data Source
        const source = await fetch("./db/generic.json");
        const data = await source.json();
        // Saves the fetched data into local storage
        localStorage.setItem("acData", JSON.stringify(data));
        // Retrieve the cached data from local storage
        const localData = JSON.parse(localStorage.getItem("acData"));
        // Post Loading placeholder text
        document.querySelector("#autoComplete").setAttribute("placeholder", autoCompleteJS.placeHolder);
        // Returns Fetched data
        return localData;
      }

      // Post Loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", autoCompleteJS.placeHolder);

      return JSON.parse(localStorage.getItem("acData"));
    },
    key: ["food", "cities", "animals"],
    cache: true,
    results: (list) => {
      // Filter duplicates
      const filteredResults = Array.from(new Set(list.map((value) => value.match))).map((food) => {
        return list.find((value) => value.match === food);
      });

      return filteredResults;
    },
  },
  searchEngine: "strict",
  placeHolder: "Search for Food & Drinks!",
  maxResults: 5,
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  highlight: true,
  debounce: 100,
  threshold: 1,
  trigger: {
    event: ["input", "focus"],
  },
  resultItem: {
    content: (data, element) => {
      // Modify Results Item Style
      element.style = "display: flex; justify-content: space-between;";
      // Modify Results Item Content
      element.innerHTML = `
        <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
            ${data.match}
        </span>
        <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
            ${data.key}
        </span>`;
    },
  },
  noResults: (dataFeedback, generateList) => {
    // Generate autoComplete List
    generateList(autoCompleteJS, dataFeedback, dataFeedback.results);
    // No Results List Item
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${dataFeedback.query}"</span>`;
    document.querySelector(`#${autoCompleteJS.resultsList.idName}`).appendChild(result);
  },
  feedback: (data) => {
    console.log(data);
  },
  onSelection: (feedback) => {
    document.querySelector("#autoComplete").blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value[feedback.selection.key];
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Replace Input value with the selected value
    document.querySelector("#autoComplete").value = selection;
    // Console log autoComplete data feedback
    console.log(feedback);
  },
});

// autoComplete.unInit();

// Toggle Search Engine Type/Mode
document.querySelector(".toggler").addEventListener("click", function () {
  // Holds the toggle button alignment
  const toggle = document.querySelector(".toggle").style.justifyContent;

  if (toggle === "flex-start" || toggle === "") {
    // Set Search Engine mode to Loose
    document.querySelector(".toggle").style.justifyContent = "flex-end";
    document.querySelector(".toggler").innerHTML = "Loose";
    autoCompleteJS.searchEngine = "loose";
  } else {
    // Set Search Engine mode to Strict
    document.querySelector(".toggle").style.justifyContent = "flex-start";
    document.querySelector(".toggler").innerHTML = "Strict";
    autoCompleteJS.searchEngine = "strict";
  }
});

// Toggle results list and other elements
const action = function (action) {
  const github = document.querySelector(".github-corner");
  const title = document.querySelector("h1");
  const mode = document.querySelector(".mode");
  const selection = document.querySelector(".selection");
  const footer = document.querySelector(".footer");

  if (action === "dim") {
    github.style.opacity = 1;
    title.style.opacity = 1;
    mode.style.opacity = 1;
    selection.style.opacity = 1;
    footer.style.opacity = 1;
  } else {
    github.style.opacity = 0.1;
    title.style.opacity = 0.3;
    mode.style.opacity = 0.2;
    selection.style.opacity = 0.1;
    footer.style.opacity = 0.1;
  }
};

// Toggle event for search input
// showing & hiding results list onfocus/blur
["focus", "blur"].forEach(function (eventType) {
  document.querySelector("#autoComplete").addEventListener(eventType, function () {
    // Hide results list & show other elements
    if (eventType === "blur") {
      action("dim");
    } else if (eventType === "focus") {
      // Show results list & hide other elements
      action("light");
    }
  });
});
