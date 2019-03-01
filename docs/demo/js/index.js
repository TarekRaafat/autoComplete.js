// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("type", event => {
  console.log(event);
});
// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
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
    key: ["food", "cities", "animals"]
  },
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  placeHolder: "Food & Drinks",
  selector: "#autoComplete",
  threshold: 0,
  searchEngine: "strict",
  highlight: true,
  maxResults: 10,
  resultsList: {
    container: source => {
      resultsListID = "autoComplete_results_list";
      return resultsListID;
    },
    destination: document.querySelector("#autoComplete"),
    position: "afterend"
  },
  resultItem: (data, source) => {
    return `${data.match}`;
  },
  onSelection: feedback => {
    const selection = feedback.selection.value.food;
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Clear Input
    document.querySelector("#autoComplete").value = "";
    // Change placeholder with the selected value
    document.querySelector("#autoComplete").setAttribute("placeholder", selection);
    // Concole log autoComplete data feedback
    console.log(feedback);
  }
});

// On page load add class to input field
window.addEventListener("load", () => {
  document.querySelector("#autoComplete").classList.add("out");
  document.querySelector("#autoComplete_results_list").style.display = "none";
});

// Toggle Search Engine Type/Mode
document.querySelector(".toggeler").addEventListener("click", () => {
  // Holdes the toggle buttin alignment
  const toggele = document.querySelector(".toggele").style.justifyContent;

  if (toggele === "flex-start" || toggele === "") {
    // Set Search Engine mode to Loose
    document.querySelector(".toggele").style.justifyContent = "flex-end";
    document.querySelector(".toggeler").innerHTML = "Loose";
    autoCompletejs.searchEngine = "loose";
  } else {
    // Set Search Engine mode to Strict
    document.querySelector(".toggele").style.justifyContent = "flex-start";
    document.querySelector(".toggeler").innerHTML = "Strict";
    autoCompletejs.searchEngine = "strict";
  }
});

// Toggle results list and other elements
const action = action => {
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
  } else if ("light") {
    github.style.opacity = 0.1;
    title.style.opacity = 0.3;
    mode.style.opacity = 0.2;
    selection.style.opacity = 0.1;
    footer.style.opacity = 0.1;
  }
};

// Toggle event for search input
// showing & hidding results list onfocus / blur
// ["focus", "blur"].forEach(eventType => {
["focus", "blur", "mousedown", "keydown"].forEach(eventType => {
  const input = document.querySelector("#autoComplete");
  const resultsList = document.querySelector("#autoComplete_results_list");

  document.querySelector("#autoComplete").addEventListener(eventType, event => {
    // Hide results list & show other elemennts
    if (eventType === "blur") {
      action("dim");
    } else if (eventType === "focus") {
      // Show results list & hide other elemennts
      action("light");
    }
  });

  // Hide Results list when not used
  document.addEventListener(eventType, event => {
    var current = event.target;
    if (
      current === input ||
      current === resultsList ||
      input.contains(current) ||
      resultsList.contains(current)
    ) {
      resultsList.style.display = "block";
    } else {
      resultsList.style.display = "none";
    }
  });
});

// Toggle Input Classes on results list focus to keep style
["focusin", "focusout", "keydown"].forEach(eventType => {
  document.querySelector("#autoComplete_results_list").addEventListener(eventType, event => {
    if (eventType === "focusin") {
      if (event.target && event.target.nodeName === "LI") {
        action("light");
        document.querySelector("#autoComplete").classList.remove("out");
        document.querySelector("#autoComplete").classList.add("in");
      }
    } else if (eventType === "focusout" || event.keyCode === 13) {
      action("dim");
      document.querySelector("#autoComplete").classList.remove("in");
      document.querySelector("#autoComplete").classList.add("out");
    }
  });
});
