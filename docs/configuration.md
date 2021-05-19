# Configuration

API configuration options, methods and events

***

## Options

***

### name <sub><sup>(optional)</sup></sub>

> Global instance name where all elements inherit their class names

- Type: `String`
- Default: `autoComplete`

##### Example

```js
name: "autoComplete",
```

***

### selector <sub><sup>(optional)</sup></sub>


> Input field selector

- Type: `String` of [selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) | `Function`
- Default: `#autoComplete`

##### Example

<!-- tabs:start -->

#### ** String **
```js
selector: "#autoComplete", // Any valid selector
```

#### ** Function **
```js
selector: () => {
    return [Element]; // Any valid selector
},
```

<!-- tabs:end -->

***

### data <sub><sup>(required)</sup></sub>

> Data Source

- Type: `Object`

##### Methods:

#### `src` <sub><sup>(required)</sup></sub>
- Type: `Array`|`Function`
- Default: `null`

#### `key` <sub><sup>(required)</sup></sub>
- Type: `Array` <small>(required only if `data.src` is `Array` of `Objects`)</small>
- Default: `null`

#### `cache` <sub><sup>(optional)</sup></sub>
- Type: `Boolean`
- Default: `false`

#### `filter` <sub><sup>(optional)</sup></sub>
- Type: `Function` returns `Array` of results values
  - Parameters: (`list`)
- Default: No action

##### Example:

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

***

### trigger <sub><sup>(optional)</sup></sub>

> Engine event & condition trigger

- Type: `Object`

##### Methods:

#### `event` <sub><sup>(optional)</sup></sub>
- Type: `Array` of [events](https://developer.mozilla.org/en-US/docs/Web/Events)
- Default: [`"input"`]

#### `condition` <sub><sup>(optional)</sup></sub>
- Type: `Function` returns `Boolean`
  - Parameters: (`event`, `queryValue`)
- Default: if input field **NOT** empty **and** greater than or equal threshold

##### Example:

```js
trigger: {
    event: ["input"], // Any valid event type name
    condition: (event, queryValue) => {
        return queryValue.replace(/ /g, "").length; // Returns "Boolean"
    }
},
```

***

### query <sub><sup>(optional)</sup></sub>

> Query interceptor

- Type: `Object`

##### Methods:

#### `manipulate` <sub><sup>(optional)</sup></sub>
  - Type: `Function` returns `String`
    - Parameters: (`query`)
  - Default: Returns raw input value

##### Example:

```js
query: {
    manipulate: (query) => {
        return query.replace("pizza", "burger");
    }
},
```

***

### placeHolder <sub><sup>(optional)</sup></sub>

> Input field place holder text value

- Type: `String`
- Default: `Blank/Empty`

##### Example:

```js
placeHolder: "Search...",
```

***

### observer <sub><sup>(optional)</sup></sub>

> Input field observer

- Type: `Boolean`
- Default: `false`

##### Example:

```js
observer: false,
```

***

### threshold <sub><sup>(optional)</sup></sub>

> Minimum characters length before engine starts rendering results

- Type: `Integer`
- Default: `1`

##### Example:

```js
threshold: 2,
```

***

### debounce <sub><sup>(optional)</sup></sub>

> Minimum duration after typing is in idle state for engine to kick in

- Type: `Integer`
- Default: `0`

##### Example:

```js
debounce: 300, // Milliseconds value
```

***

### searchEngine <sub><sup>(optional)</sup></sub>

> Search engine Type/Mode

- Type: `String` | `Function`
  - `String` lowerCase `"strict"` | `"loose"`
  - `Function` with 2 parameters (`query`, `record`) returns 1 `String` of each match individually
- Default: `"strict"`

##### Example:

```js
searchEngine: "strict",
```

***

### diacritics <sub><sup>(optional)</sup></sub>

> Search engine diacritics handler

- Type: `Boolean`
- Default: `false`

##### Example:

```js
diacritics: "strict",
```

***

### resultsList <sub><sup>(optional)</sup></sub>

> Rendered results list element

- Type: `Object`

##### Methods:

#### `render` <sub><sup>(optional)</sup></sub>
  - Type: `Boolean`
  - Default: `true`

#### `element` <sub><sup>(optional)</sup></sub>
  - Type: `String` of [element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
  - Default: `ul`

#### `idName` <sub><sup>(optional)</sup></sub>
  - Type: `String` of id value
  - Default: `autoComplete_list`

#### `className` <sub><sup>(optional)</sup></sub>
  - Type: `String` of class value
  - Default: No classes

#### `destination` <sub><sup>(optional)</sup></sub>
  - Type: `String` of [selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) | `Function`
  - Default: `#autoComplete`

#### `position` <sub><sup>(optional)</sup></sub>
- Type: `String` of [position](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#parameters)
- Default: `afterend`

#### `container` <sub><sup>(optional)</sup></sub>
- Type: `Function` with no return
- Parameters: (`element`, `data`)
- Default: `Function`

#### `maxResults` <sub><sup>(optional)</sup></sub>
- Type: `Integer`
- Default: `5`

#### `tabSelect` <sub><sup>(optional)</sup></sub>
- Type: `Boolean`
- Default: `false`

#### `scroll` <sub><sup>(optional)</sup></sub>
- Type: `String` of animation [behavior](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#parameters)
- Options: `auto` or `smooth`
- Default: `auto`

#### `navigation` <sub><sup>(optional)</sup></sub>
- Type: `Function` with no return
- Parameters: (`event`)
- Default: `default` navigation behavior

#### `noResults` <sub><sup>(optional)</sup></sub>
- Type: `Function` with no return
- Parameters: (`list`, `query`)
- Default: No action

##### Example:

```js
resultsList: {
    render: true,
    element: "ul",
    idName: "autoComplete_list",
    className: "results_list",
    destination: "#autoComplete",
    position: "afterend",
    maxResults: 5,
    container: (element, data) => {
        element.setAttribute("data-parent", "food-list");
    },
    noResults: (list, query) => {
        // Create "No Results" message element
        const message = document.createElement("div");
        // Add class to the created element
        message.setAttribute("class", "no_result");
        // Add message text content
        message.innerHTML = `<span>Found No Results for "${query}"</span>`;
        // Append message element to the results list
        list.appendChild(message);
    },
},
```

***

### resultItem <sub><sup>(optional)</sup></sub>

> Rendered result item element

- Type: `Object`

##### Methods:

#### `element` <sub><sup>(optional)</sup></sub>
- Type: `String` of [element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- Default: `li`

#### `idName` <sub><sup>(optional)</sup></sub>
- Type: `String` of id value
- Default: `autoComplete_result_[index]`

#### `className` <sub><sup>(optional)</sup></sub>
- Type: `String` of class value
- Default: No classes

#### `content` <sub><sup>(optional)</sup></sub>
- Type: `Function` with no return
- Parameters: (`element`, `data`)
- Default: `Function`

#### `highlight` <sub><sup>(optional)</sup></sub>
- Type: `Object`
  - render: `Boolean`
  - className: `String` of class value
- Defaults: 
  - render: `false`
  - className: `"autoComplete_highlighted"`

#### `selected` <sub><sup>(optional)</sup></sub>
- Type: `Object` <small>(optional></small>
  - className: `String` of class value
- Default: 
  - className: `"autoComplete_selected"`

##### Example:

```js
resultItem: {
    element: "li",
    className: "autoComplete_result",
    content: (element, data) => {
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

***

### events <sub><sup>(optional)</sup></sub>

> Input field & Results list events additions or overriding

- Type: `Object`
  - input: `Object` of functions with the [event](https://developer.mozilla.org/en-US/docs/Web/Events) type name
  - list: `Object` of functions with the [event](https://developer.mozilla.org/en-US/docs/Web/Events) type name
- Default:
  - input: `keydown` and `blur`
  - list: `mousedown` and `click`

##### Example:

```js
events: {
    input: {
      focus: (event) => {
        console.log("Input Field is in focus!");
      }
    },
    list: {
      scroll: (event) => {
        console.log("Results List scrolled!");
      }
    }
},
```

***

### onSelection <sub><sup>(optional)</sup></sub>

> Action script onSelection event

- Type: `Function` with no return
- Parameters: (`dataFeedback`)
- Default: No action

##### Example:

```js
onSelection: (dataFeedback) => {
    console.log(dataFeedback);
},
```

***

## APIs
*All examples assumes that the "autoComplete" new instance is assigned to an "autoCompleteJS" named variable*

***

### preInit()

> Runs `preInit()` core function to start watching the `DOM` until the selected input is ready then runs `init()` automatically

##### Example:

```js
autoCompleteJS.preInit();
```

***

### init()

> Runs `init()` core function which is responsible for the following tasks in order:

1. Applying `placeholder` text if set
2. Setting `input` field attributes
3. Creating `wrapper` element and moving the selected `input` inside it
4. Creating new empty `list`
5. Attaching all event listeners on the `_events` list

##### Example:

```js
autoCompleteJS.init();
```

***

### start()

> Runs `start()` core function which is responsible for the following tasks in order:

1. Getting the `input` query value
2. Manipulating `query` value
3. Checking `trigger` condition validity to proceed
4. Fetching `data` from `src` or `store` if cached
5. Start matching results
6. Rendering `list` if activated

##### Example:

```js
autoCompleteJS.start();
```

***

### open()

> Opens `resultsList` if not empty

##### Example:

```js
autoCompleteJS.open();
```

***

### next()

> Navigates to the next `resultItem` on the list

##### Example:

```js
autoCompleteJS.next();
```

***

### previous()

> Navigates to the previous `resultItem` on the list

##### Example:

```js
autoCompleteJS.previous();
```

***

### gotTo(index)

> Navigates to a specific `resultItem` on the list by its `index` number

##### Example:

```js
autoCompleteJS.gotTo(1);
```

***

### select(index)

> Selects a `resultItem` from the list by its `index` number

##### Example:

```js
autoCompleteJS.select();
```

***

### close()

> Closes the `resultsList` if opened

##### Example:

```js
autoCompleteJS.close();
```

***

### unInit()

> Removes all the event listeners on the `_events` list

##### Example:

```js
autoCompleteJS.unInit();
```

***

## Events

***

### init

> Fires after `autoComplete.js` engine is initialized and ready

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("init", function (event) {
    console.log(event);
});
```

***

### response

> Fires after fetching the `data` is completed and the `data` is ready

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("response", function (event) {
    // "event.detail" carries the returned data values
    console.log(event.detail);
});
```

***

### results

> Fires after the `search` operation is done and matching results are ready

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("results", function (event) {
    // "event.detail" carries the matching results values
    console.log(event.detail);
});
```

***

### open

> Fires after the results list is opened

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("open", function (event) {
    // "event.detail" carries the autoComplete.js "dataFeedback" object
    console.log(event.detail);
});
```

***

### navigate

> Fires on every "resultsList" navigation interaction

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("navigate", function (event) {
    // "event.detail" carries the autoComplete.js "dataFeedback" object
    console.log(event.detail);
});
```

***

### close

> Fires after "resultsList" is closed

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("close", function (event) {
    // "event.detail" carries the autoComplete.js "dataFeedback" object
    console.log(event.detail);
});
```

***

### unInit

> Fires after `autoComplete.js` engine is un-initialized and detached

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("unInit", function (event) {
    console.log(event);
});
```
