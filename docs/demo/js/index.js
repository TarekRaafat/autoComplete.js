// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
	data: {
		src: async () => {
			// Loading place holder text
			document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
			// Fetch External Data Source
			const source = await fetch("./db/generic.json");
			const data = await source.json();
			// Returns Fetched data
			return data;
		},
		key: "food"
	},
	selector: "#autoComplete",
	placeHolder: "Food & Drinks...",
	threshold: 0,
	searchEngine: "strict",
	highlight: true,
	dataAttribute: { tag: "value", value: "" },
	maxResults: Infinity,
	renderResults: {
		destination: document.querySelector("#autoComplete"),
		position: "afterend"
	},
	onSelection: feedback => {
		// Render selected choice to selection div
		document.querySelector(".selection").innerHTML = feedback.selection.food;
		// Change placeholder with the selected value
		document
			.querySelector("#autoComplete")
			.setAttribute("placeholder", `${event.target.closest(".autoComplete_result").id}`);
		// Concole log autoComplete data feedback
		console.log(feedback);
	}
});

// Toggle Search Engine Type/Mode
document.querySelector(".toggeler").addEventListener("click", () => {
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

// Toggle event for search input
// showing & hidding results list onfocus / blur
["focus", "blur"].forEach(eventType => {
	const resultsList = document.querySelector("#autoComplete_results_list");
	const github = document.querySelector(".github-corner");
	const title = document.querySelector("h1");
	const query = document.querySelector("#autoComplete");
	const mode = document.querySelector(".mode");
	const selection = document.querySelector(".selection");
	const footer = document.querySelector(".footer");

	document.querySelector("#autoComplete").addEventListener(eventType, () => {
		// Hide results list & show other elemennts
		if (eventType === "blur") {
			resultsList.style.opacity = 0;
			github.style.opacity = 1;
			query.style = "color: transparent;";
			title.style.opacity = 1;
			mode.style.opacity = 1;
			selection.style.opacity = 1;
			footer.style.opacity = 1;
			setTimeout(() => {
				resultsList.style = "display: none;";
			}, 100);
		} else {
			// Show results list & hide other elemennts
			resultsList.style.opacity = 1;
			github.style.opacity = 0.1;
			query.style = "color: inheret;";
			title.style.opacity = 0.3;
			mode.style.opacity = 0.2;
			selection.style.opacity = 0.1;
			footer.style.opacity = 0.1;
			setTimeout(() => {
				resultsList.style = "display: block;";
			}, 1);
		}
	});
});
