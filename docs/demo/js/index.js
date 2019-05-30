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
      // API key token
      const token = "5c2d4273b2930ee4b53f4e84a7c4440d";
      // User search query
      const query = document.querySelector("#autoComplete").value;
      // Fetch External Data Source
      const source = await fetch(`https://www.food2fork.com/api/search?key=${token}&q=${query}`);
      const data = await source.json();
      // Post loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", "Food & Drinks");
      // Return Fetched data
      return data.recipes;
    },
    key: ["title"],
    cache: false,
  },
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  selector: "#autoComplete",
  threshold: 3,
  debounce: 300,
  searchEngine: "strict",
  highlight: true,
  maxResults: Infinity,
  resultsList: {
    container: source => {
      resultsListID = "autoComplete_results_list";
      return resultsListID;
    },
    destination: document.querySelector("#autoComplete"),
    position: "afterend",
    element: "ul",
  },
  resultItem: {
    content: (data, source) => {
      return `${data.match}`;
    },
    element: "li",
  },
  noResults: () => {
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_results_list").appendChild(result);
  },
  onSelection: feedback => {
    const title = feedback.selection.value.title;
    const image = feedback.selection.value.image_url;
    // Render selected choice to selection div
    document.querySelector(
      ".selection",
    ).innerHTML = `<span style="display: block; font-size: 25px; width: 90vw; max-width: 400px; margin-bottom: 20px;">${title}</span><img src="${image}" style="height: 30vh; border-radius: 8px; box-shadow: 0 0 80px rgba(255, 122, 122,0.2), 0 4px 10px -3px rgba(255, 122, 122,0.4), inset 0 -10px 30px -5px rgba(255, 122, 122,0.1);"></img>`;
    // Clear Input
    document.querySelector("#autoComplete").value = "";
    // Change placeholder with the selected value
    document.querySelector("#autoComplete").setAttribute("placeholder", title);
    // Concole log autoComplete data feedback
    console.log(feedback);
  },
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
