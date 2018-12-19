const search = (async () => {
	let dataBase = [];

	// Fetch External Data Source
	const source = await fetch("https://www.jasonbase.com/things/WArk.json");
	const data = await source.json();
	data.filter(record => {
		dataBase.push(record.food);
	});

	// The autoComplete.js app instance creator
	let autoCompletejs = new autoComplete({
		dataSrc: dataBase,
		placeHolder: "Food & Drinks...",
		highlight: true,
		onSelection: value => {
			document.querySelector(".selection").innerHTML = value.id;
			// Set placeholder with the selected value
			// after checking the value length and validate it
			document
				.querySelector("#autoComplete")
				.setAttribute(
					"placeholder",
					`${event.target.closest(".autoComplete_result").id}`
				);
		},
	});

	// Toggle Search Engine Type/Mode
	document.querySelector(".toggeler").addEventListener("click", () => {
		let toggele = document.querySelector(".toggele").style.justifyContent;

		if (toggele === "flex-start" || toggele === "") {
			document.querySelector(".toggele").style.justifyContent = "flex-end";
			document.querySelector(".toggeler").innerHTML = "Loose";
			autoCompletejs.searchEngine = "loose";
		} else {
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
})();
