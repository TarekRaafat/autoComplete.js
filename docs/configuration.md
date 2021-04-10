# Configuration

API configuration options and events

## Options

#### selector (optional)

***

> Input field selector.

- Type: `String` of [selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) | `Function` <small>(optional)</small>

- Defaults: `#autoComplete`

- Example

<!-- tabs:start -->

#### ** String **
```js
selector: "#autoComplete", // Any valid selector
```

#### ** Function **
```js
selector: () => {
    return "#customID"; // Any valid selector
},
```

<!-- tabs:end -->

#### data (required)

***

> Data Source.

- Type: `Object`
- Methods:
  - src: `Array`|`Function` <small>(required)</small>
  - key: `Array` <small>(required only if `data.src` is `Array` of `Objects`)</small>
  - cache: `Boolean` <small>(optional)</small>
  - results: `Function` <small>(optional)</small>
    - 1 parameter `(list)` returns `Array` of results values

- Defaults:
  - src: `null`
  - key: `null`
  - cache: `false`
  - results: No action
  
- Example:

<!-- tabs:start -->
#### ** Array (Strings) **

```js
data: {
    src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
},
```

#### ** Array (Objects) **

```js
data: {
    src: [
        { "food": "Sauce - Thousand Island" },
        { "food": "Wild Boar - Tenderloin" },
        { "food": "Goat - Whole Cut" }
    ],
    key: ["food"]
},
```

#### ** Function **

```js
data: {
    src: () => { ... },
    key: ["food"]
},
```

#### ** Async **

```js
data: {
    src: async () => {
        // Fetch Data from external Source
        const source = await fetch("https://www.url.com/data.json");
        const data = await source.json();

        // Returns Fetched data
        return data;
    },
    key: ["food"],
    cache: true
},
```
<!-- tabs:end -->

#### trigger (optional)

***

> Engine event & condition trigger.

- Type: `Object`
- Methods:
  - event: `Array` of [events](https://developer.mozilla.org/en-US/docs/Web/Events) <small>(optional)</small>
  - condition: `Function` <small>(optional)</small>
    - 2 parameters `(event, queryValue)` returns `Boolean` 

- Defaults:
  - event: `["input"]`
  - condition: if input field **NOT** empty and greater or equal threshold
  
- Example:

```js
trigger: {
    event: ["input"], // Any valid event type name
    condition: (event, queryValue) => {
        return queryValue.replace(/ /g, "").length; // Returns "Boolean"
    }
},
```

#### query (optional)

***

> Query interceptor.

- Type: `Object`
- Methods:
  - manipulate: `Function` <small>(optional)</small>
    - 1 parameter `(query)` returns `String`

- Defaults:
  - manipulate: Returns raw input value
  
- Example:

```js
query: {
    manipulate: (query) => {
        return query.replace("pizza", "burger");
    }
},
```

#### placeHolder (optional)

***

> Input field place holder text value.

- Type: `String` <small>(optional)</small>

- Defaults: `Blank/Empty`
  
- Example:

```js
placeHolder: "Search...",
```

#### observer (optional)

***

> Input field observer.

- Type: `Boolean` <small>(optional)</small>

- Defaults: `false`
  
- Example:

```js
observer: false,
```

#### threshold (optional)

***

> Minimum characters length before engine starts rendering results.

- Type: `Integer` <small>(optional)</small>

- Defaults: `1`
  
- Example:

```js
threshold: 2,
```

#### debounce (optional)

***

> Minimum duration after typing is in idle state for engine to kick in.

- Type: `Integer` <small>(optional)</small>

- Defaults: `0`
  
- Example:

```js
debounce: 300, // Milliseconds value
```

#### searchEngine (optional)

***

> Search engine Type/Mode.

- Type: `String` | `Function` <small>(optional)</small>
  - `String` lowerCase `"strict"` | `"loose"`
  - `Function` with 2 parameters `(query, record)` returns 1 `String` of each match individually

- Defaults: `"strict"`
  
- Example:

```js
searchEngine: "strict",
```

#### diacritics (optional)

***

> Search engine diacritics handler.

- Type: `Boolean` <small>(optional)</small>

- Defaults: `false`
  
- Example:

```js
diacritics: "strict",
```

#### resultsList (optional)

***

> Rendered results list element.

- Type: `Object` <small>(optional)</small>

- Methods:
  - render: `Boolean` <small>(optional)</small>
  - element: `String` of [element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) <small>(optional)</small>
  - idName: `String` of id value <small>(optional)</small>
  - className: `String` of class value <small>(optional)</small>
  - destination: `String` of [selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) | `Function` <small>(optional)</small>
  - position: `String` of [position](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#parameters) <small>(optional)</small>
  - container: `Function` <small>(optional)</small>
    - 1 parameter (element) with no return
  - maxResults: `Integer` <small>(optional)</small>
  - navigation: `Function` <small>(optional)</small>
    - 1 parameter (event) with no return
  - noResults: `Function` <small>(optional)</small>
    - 2 parameters (list, query) with no return

- Defaults:
  - render: `true`
  - element: `ul`
  - idName: `autoComplete_list`
  - className: `autoComplete_list`
  - destination: `#autoComplete`
  - position: `afterend`
  - container: `Function`
  - maxResults: `5`
  - navigation: `default` navigation behavior
  - noResults: No action
  
- Example:

```js
resultsList: {
    render: true,
    element: "ul",
    idName: "autoComplete_list",
    className: "autoComplete_list",
    destination: "#autoComplete",
    position: "afterend",
    maxResults: 5,
    container: (element) => {
        element.setAttribute("data-parent", "food-list");
    },
    noResults: (list, query) => {
        // Create no results element
        const message = document.createElement("li");
        message.setAttribute("class", "no_result");
        message.setAttribute("tabindex", "1");
        // Add text content
        message.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${query}"</span>`;
        // Append message to results list
        list.appendChild(message);
    },
},
```

#### resultItem (optional)

***

> Rendered result item element.

- Type: `Object` <small>(optional)</small>

- Methods:
  - element: `String` of [element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) <small>(optional)</small>
  - idName: `String` of id value <small>(optional)</small>
  - className: `String` of class value <small>(optional)</small>
  - content: `Function` <small>(optional)</small>
    - 2 parameters (item, element) with no return
  - highlight: `Object` <small>(optional)</small>
    - render: `Boolean` <small>(optional)</small>
    - className: `String` of class value <small>(optional)</small>
  - selected: `Object` <small>(optional></small>
    - className: `String` of class value <small>(optional)</small>

- Defaults:
  - element: `li`
  - idName: `undefined_[index]`
  - className: `autoComplete_result`
  - content: `Function`
  - highlight:
    - render: `false`
    - className: `"autoComplete_highlighted"`
  - selected:
    - className: `"autoComplete_selected"`
  
- Example:

```js
resultItem: {
    element: "li",
    className: "autoComplete_result",
    content: (item, element) => {
        element.setAttribute("data-parent", "food-item");
    },
    highlight: {
        render: true,
        className: "autoComplete_highlighted"
    },
    selected: {
        className: "autoComplete_selected"
    }
},
```

#### feedback (optional)

***

> Action script on dataFeedback event.

- Type: `Function` <small>(optional)</small>
    - 1 parameter (data) with no return

- Defaults: No action
  
- Example:

```js
feedback: (data) => {
    console.log(data);
},
```

#### onSelection (optional)

***

> Action script onSelection event.

- Type: `Function` <small>(optional)</small>
    - 1 parameter (feedback) with no return

- Defaults: No action
  
- Example:

```js
onSelection: (feedback) => {
    console.log(feedback);
},
```

## Events

#### init

***

> Fires after `autoComplete.js` engine is initialized and ready

- Example:

```js
document.querySelector("#autoComplete").addEventListener("init", function (event) {
    console.log(event);
});
```

#### fetch

***

> Fires after fetching data is complete and data is ready

- Example:

```js
document.querySelector("#autoComplete").addEventListener("fetch", function (event) {
    console.log(event.detail);
});
```

#### input

***

> Fires on every user input interaction

- Example:

```js
document.querySelector("#autoComplete").addEventListener("input", function (event) {
    console.log(event);
});
```

#### results

***

> Fires after search operation is done and matching results are ready

- Example:

```js
document.querySelector("#autoComplete").addEventListener("results", function (event) {
    console.log(event.detail);
});
```

#### open

***

> Fires after opening the results list

- Example:

```js
document.querySelector("#autoComplete").addEventListener("open", function (event) {
    console.log(event);
});
```

#### navigate

***

> Fires on every "resultsList" navigation interaction

- Example:

```js
document.querySelector("#autoComplete").addEventListener("navigate", function (event) {
    console.log(event.detail);
});
```

#### close

***

> Fires after "resultsList" is closed

- Example:

```js
document.querySelector("#autoComplete").addEventListener("close", function (event) {
    console.log(event);
});
```

#### unInit

***

> Fires after `autoComplete.js` engine is un-initialized and detached

- Example:

```js
document.querySelector("#autoComplete").addEventListener("unInit", function (event) {
    console.log(event);
});
```
