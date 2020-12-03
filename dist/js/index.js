// autoComplete.js input eventListener on connect event
document.querySelector("#autoCompleteJS").addEventListener("connect", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on initialization event
document.querySelector("#autoCompleteJS").addEventListener("init", function (event) {
  console.log(event);
});
// autoComplete.js input eventListener on data response event
document.querySelector("#autoCompleteJS").addEventListener("fetch", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on search results event
document.querySelector("#autoCompleteJS").addEventListener("results", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on post results list rendering event
document.querySelector("#autoCompleteJS").addEventListener("rendered", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on results list navigation
document.querySelector("#autoCompleteJS").addEventListener("navigation", function (event) {
  console.log(event.detail);
});
// autoComplete.js input eventListener on post un-initialization event
document.querySelector("#autoCompleteJS").addEventListener("unInit", function (event) {
  console.log(event);
});

// The autoComplete.js Engine instance creator
const autoComplete = new autoCompleteJS({
  name: "food & drinks",
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
  // query: {
  //   manipulate: function (query) {
  //     return `${query}`;
  //   },
  // },
  searchEngine: "strict",
  placeHolder: "Search for Food & Drinks!",
  maxResults: 5,
  highlight: true,
  debounce: 300,
  threshold: 1,
  resultsList: {
    render: true,
    container: (element) => {
      // console.log(element);
    },
  },
  resultItem: {
    content: (data, element) => {
      // Prepare Value's Key
      const key = Object.keys(data).find((key) => data[key] === element.innerText);
      // Modify Results Item
      element.style = "display: flex; justify-content: space-between;";
      element.innerHTML = `<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${element.innerHTML}</span>
        <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
      ${key}</span>`;
    },
  },
  noResults: (feedback, generateList) => {
    // Generate autoCompleteJS List
    generateList(autoComplete, feedback, feedback.results);
    // No Results List Item
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${feedback.query}"</span>`;
    document.querySelector(`#${autoComplete.resultsList.idName}`).appendChild(result);
  },
  feedback: (data) => {
    console.log(data);
  },
  onSelection: (feedback) => {
    document.querySelector("#autoCompleteJS").blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value[feedback.selection.key];
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Replace Input value with the selected value
    document.querySelector("#autoCompleteJS").value = selection;
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
    autoComplete.searchEngine = "loose";
  } else {
    // Set Search Engine mode to Strict
    document.querySelector(".toggle").style.justifyContent = "flex-start";
    document.querySelector(".toggler").innerHTML = "Strict";
    autoComplete.searchEngine = "strict";
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
// showing & hiding results list onfocus / blur
["focus", "blur"].forEach(function (eventType) {
  document.querySelector("#autoCompleteJS").addEventListener(eventType, function () {
    // Hide results list & show other elements
    if (eventType === "blur") {
      action("dim");
    } else if (eventType === "focus") {
      // Show results list & hide other elements
      action("light");
    }
  });
});
