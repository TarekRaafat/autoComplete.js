# FAQ <!-- {docsify-ignore} -->

Frequently asked questions based on common usage patterns

***

### How do I get the selected value?

Listen for the `selection` event on the input element. The selected value is available in `event.detail.selection.value`.

**For string data:**
```js
document.querySelector("#autoComplete").addEventListener("selection", function (event) {
    const selection = event.detail.selection.value;
    autoCompleteJS.input.value = selection;
});
```

**For object data with keys:**
```js
document.querySelector("#autoComplete").addEventListener("selection", function (event) {
    const feedback = event.detail;
    const selection = feedback.selection.value[feedback.selection.key];
    autoCompleteJS.input.value = selection;
});
```

***

### How do I show all results when the input is focused?

Set `threshold` to `0` and trigger `start()` on the `focus` event.

```js
const autoCompleteJS = new autoComplete({
    data: {
        src: ["Apple", "Banana", "Cherry"],
        cache: true,
    },
    threshold: 0,
    events: {
        input: {
            focus() {
                autoCompleteJS.start();
            },
        },
    },
});
```

***

### How do I use multiple autocomplete instances on the same page?

Create a separate `autoComplete` instance for each input element, each with its own unique `selector`.

```js
const searchOne = new autoComplete({
    selector: "#search-one",
    data: { src: ["Apple", "Banana"] },
});

const searchTwo = new autoComplete({
    selector: "#search-two",
    data: { src: ["Red", "Blue", "Green"] },
});
```

> **Note:** Using a class selector (e.g., `.search`) only matches the first element. Always use unique selectors with separate instances.

***

### How do I fetch data from an API?

Use an async function as `data.src`. The function receives the current query as a parameter.

```js
const autoCompleteJS = new autoComplete({
    data: {
        src: async (query) => {
            try {
                const response = await fetch(`https://api.example.com/search?q=${query}`);
                const data = await response.json();
                return data;
            } catch (error) {
                return error;
            }
        },
        keys: ["name"],
    },
    debounce: 300,
});
```

Set `data.cache: true` if you want to fetch once and search locally, or `false` (default) to fetch on every keystroke.

***

### How do I update the data source at runtime?

With `data.cache: false` (default), the `data.src` function is called on every search, so it naturally picks up new data. If you use `data.cache: true`, you can update the cached store directly:

```js
// Update cached data
autoCompleteJS.data.store = newDataArray;
```

Or call `unInit()` and `init()` to reinitialize with a new configuration.

***

### How do I force the user to select from the list?

Validate the input value on blur and clear it if it doesn't match any entry.

```js
const autoCompleteJS = new autoComplete({
    data: {
        src: ["Apple", "Banana", "Cherry"],
        cache: true,
    },
    events: {
        input: {
            blur() {
                if (!autoCompleteJS.data.store.includes(autoCompleteJS.input.value)) {
                    autoCompleteJS.input.value = "";
                }
            },
            selection(event) {
                autoCompleteJS.input.value = event.detail.selection.value;
            },
        },
    },
});
```

***

### How do I show a "No Results" message?

Enable `resultsList.noResults` and use `resultsList.element` to add a message when there are no matches.

```js
const autoCompleteJS = new autoComplete({
    data: {
        src: ["Apple", "Banana", "Cherry"],
    },
    resultsList: {
        noResults: true,
        element: (list, data) => {
            if (!data.results.length) {
                const message = document.createElement("div");
                message.setAttribute("class", "no_result");
                message.innerHTML = `Found no results for "${data.query}"`;
                list.prepend(message);
            }
        },
    },
});
```

***

### How do I disable the wrapper element?

Set `wrapper: false` in the configuration. The ARIA attributes will be applied directly to the input element instead.

```js
const autoCompleteJS = new autoComplete({
    wrapper: false,
    data: {
        src: ["Apple", "Banana", "Cherry"],
    },
});
```

***

### How do I search across multiple object keys at the same time?

Pass multiple keys in the `data.keys` array. Each record will be searched against all specified keys.

```js
const autoCompleteJS = new autoComplete({
    data: {
        src: [
            { name: "Apple", category: "Fruit" },
            { name: "Carrot", category: "Vegetable" },
        ],
        keys: ["name", "category"],
    },
});
```

***

### How do I customize the appearance of each result item?

Use the `resultItem.element` callback to modify each item before it is rendered.

```js
const autoCompleteJS = new autoComplete({
    data: {
        src: [
            { name: "Apple", category: "Fruit" },
            { name: "Carrot", category: "Vegetable" },
        ],
        keys: ["name"],
    },
    resultItem: {
        element: (item, data) => {
            item.innerHTML = `
                <span>${data.match}</span>
                <span style="color: gray; font-size: 0.8em;">${data.value.category}</span>
            `;
        },
    },
});
```

***

### How do I use autoComplete.js with a form submit?

By default, pressing Enter while a result is highlighted selects the result and prevents form submission. Set `submit: true` to allow the Enter key to submit the form.

```js
const autoCompleteJS = new autoComplete({
    submit: true,
    data: {
        src: ["Apple", "Banana", "Cherry"],
    },
});
```
