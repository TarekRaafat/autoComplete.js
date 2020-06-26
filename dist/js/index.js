// The autoComplete.js Engine instance creator
new autoComplete({
  selector: document.querySelector("#autoComplete"),
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
    cached: true,
  },
});
