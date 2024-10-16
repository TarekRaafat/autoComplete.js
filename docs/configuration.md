# Configuration <!-- {docsify-ignore} -->

API configuration options, methods and events

***

## Options

***

### name <sub><sup>(optional)</sup></sub>

> Responsible for the global instance naming where all elements inherit their class & id names

- Type: `String`
- Default: `autoComplete`

##### Example

```js
name: "autoComplete",
```

***

### selector <sub><sup>(optional)</sup></sub>


> Responsible for the input, textarea, or contentEditable element selection

- Type: `String` of [selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) | `Function` returns `Element`
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

### wrapper <sub><sup>(optional)</sup></sub>


> Responsible for rendering the `div` that wraps the `input` and the `list` element

- Type: `Boolean`
- Default: `true`

##### Example

```js
wrapper: false,
```

***

### data <sub><sup>(required)</sup></sub>

> Responsible for the data source selection

- Type: `Object`

##### Methods:

#### `src` <sub><sup>(required)</sup></sub>
- Type: `Array`|`Function` returns `Array` of results values
  - Parameters: (`query`) <small>(Only works if `data.cache` is `false`)</small>
- Default: `null`

#### `keys` <sub><sup>(required)</sup></sub>
- Type: `Array` <small>(Only required if `data.src` is `Array` of `Objects`)</small>
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
    // Data source 'Object' key to be searched
    keys: ["food"]
},
```

#### ** Function **

```js
data: {
    src: (query) => { ... },
    // Data source 'Object' key to be searched
    keys: ["food"],
    cache: true
},
```

#### ** Async **

```js
data: {
    src: async (query) => {
      try {
        // Fetch Data from external Source
        const source = await fetch(`https://www.api.com/${query}`);
        // Data should be an array of `Objects` or `Strings`
        const data = await source.json();

        return data;
      } catch (error) {
        return error;
      }
    },
    // Data source 'Object' key to be searched
    keys: ["food"]
},
```
<!-- tabs:end -->

***

### trigger <sub><sup>(optional)</sup></sub>

> Responsible for Event & Condition rules that trigger autoComplete.js engine to start

- Type: `Function` returns `Boolean`
  - Parameters: (`query`)
- Default: if input field **NOT** empty **and** greater than or equal threshold

##### Example:

```js
trigger: (query) => {
    return query.replace(/ /g, "").length; // Returns "Boolean"
},
```

***

### query <sub><sup>(optional)</sup></sub>

> Responsible for Query interception & manipulation

- Type: `Function` returns `String`
  - Parameters: (`input`)
- Default: Returns raw input value

##### Example:

```js
query: (input) => {
    return input.replace("pizza", "burger");
},
```

***

### placeHolder <sub><sup>(optional)</sup></sub>

> Responsible for the input field placeholder value setting

- Type: `String`
- Default: `Blank/Empty`

##### Example:

```js
placeHolder: "Search...",
```

***

### threshold <sub><sup>(optional)</sup></sub>

> Responsible for setting threshold value of the minimum characters length where autoComplete.js engine starts

- Type: `Integer`
- Default: `1`

##### Example:

```js
threshold: 2,
```

***

### debounce <sub><sup>(optional)</sup></sub>

> Responsible for setting delay time duration that counts after typing is done for autoComplete.js engine to start

- Type: `Integer`
- Default: `0`

##### Example:

```js
debounce: 300, // Milliseconds value
```

***

### searchEngine <sub><sup>(optional)</sup></sub>

> Responsible for setting the Search engine Type/Mode or custom engine

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

> Responsible for turning on/off language diacritics supported search

- Type: `Boolean`
- Default: `false`

##### Example:

```js
diacritics: true,
```

***

### resultsList <sub><sup>(optional)</sup></sub>

> Responsible for the results list element rendering, interception, and customizing

- Type: `Object` | `Boolean` for disabling list rendering

##### Methods:

#### `tag` <sub><sup>(optional)</sup></sub>
  - Type: `String` of html [tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
  - Default: `ul`

#### `id` <sub><sup>(optional)</sup></sub>
  - Type: `String` of id value
  - Default: `autoComplete_list_[id]`

#### `class` <sub><sup>(optional)</sup></sub>
  - Type: `String` of class values
  - Default: No classes

#### `destination` <sub><sup>(optional)</sup></sub>
  - Type: `String` of [selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) | `Function` destination
  - Default: `#autoComplete`

#### `position` <sub><sup>(optional)</sup></sub>
- Type: `String` of [position](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#parameters)
- Default: `afterend`

#### `element` <sub><sup>(optional)</sup></sub>
- Type: `Function` with no return
- Parameters: (`list`, `data`)
- Default: `Function`

#### `maxResults` <sub><sup>(optional)</sup></sub>
- Type: `Integer`
- Default: `5`

#### `tabSelect` <sub><sup>(optional)</sup></sub>
- Type: `Boolean` to enable/disable tab selection
- Default: `false`

#### `noResults` <sub><sup>(optional)</sup></sub>
- Type: `Boolean` to enable/disable list resistance in case of no results
- Default: `false`

##### Example:

```js
resultsList: {
    tag: "ul",
    id: "autoComplete_list",
    class: "results_list",
    destination: "#autoComplete",
    position: "afterend",
    maxResults: 5,
    noResults: true,
    element: (list, data) => {
        list.setAttribute("data-parent", "food-list");
    },
},
```

***

### resultItem <sub><sup>(optional)</sup></sub>

> Responsible for the result item element rendering, interception, and customizing

- Type: `Object`

##### Methods:

#### `tag` <sub><sup>(optional)</sup></sub>
- Type: `String` of html [tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- Default: `li`

#### `id` <sub><sup>(optional)</sup></sub>
- Type: `String` of id value
- Default: `autoComplete_result_[index]`

#### `class` <sub><sup>(optional)</sup></sub>
- Type: `String` of class values
- Default: No classes

#### `element` <sub><sup>(optional)</sup></sub>
- Type: `Function` with no return
- Parameters: (`item`, `data`)
- Default: `Function`

#### `highlight` <sub><sup>(optional)</sup></sub>
- Type: `Boolean` | `String` of class values
- Defaults: `false`

#### `selected` <sub><sup>(optional)</sup></sub>
- Type: `String` of class values
- Default: No classes

##### Example:

```js
resultItem: {
    tag: "li",
    class: "autoComplete_result",
    element: (item, data) => {
        item.setAttribute("data-parent", "food-item");
    },
    highlight: "autoComplete_highlight",
    selected: "autoComplete_selected"
},
```

***

### submit <sub><sup>(optional)</sup></sub>

> Responsible for the `Enter` button default behavior

- Type: `Boolean`
- Default: `false`

##### Example:

```js
submit: true,
```

***

### events <sub><sup>(optional)</sup></sub>

> Responsible for the input field and results list events additions or overriding

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
        console.log("Input Field in focus!");
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

## APIs
*All examples assume that the "autoComplete" new instance is assigned to an "autoCompleteJS" named variable*

***

### init()

> Runs `init()` core function which is responsible for the following tasks in order:

1. Setting `input` field attributes & `placeholder` text (if set)
2. Creating `wrapper` element and moving the selected `input` inside it
3. Creating new empty hidden `list`
4. Getting `data` if set to `cache`
5. Attaching all event listeners on the `events` list
6. Emitting `init` event 

##### Example:

```js
autoCompleteJS.init();
```

***

### start(query)

> Runs `start(query)` core function which is responsible for the following tasks in order:

1. Getting the `input` query value if NOT passed as an argument
2. Manipulating `query` value
3. Checking `trigger` condition validity to proceed
4. Fetching `data` from `src` or `store` if cached
5. Start matching results
6. Rendering `list` if enabled

Arguments:
- query: `String` <sub><sup>(optional)</sup></sub>

Defaults:
- query: `input` query value

##### Example:

```js
autoCompleteJS.start("tea");
```

***

### search(query, record, options)

> autoComplete.js powerful search engine

Arguments:
- query: `String`
- record: `String`
- options: `Object` <sub><sup>(optional)</sup></sub>
  - mode: `String`
    - `"strict"` search mode
    - `"loose"` search mode
  - diacritics: `Boolean`
  - highlight: `Boolean` | `String` of class values

Defaults:
- options: `Object`
  - mode: `"strict"`
  - diacritics: `false`
  - highlight: `false`

##### Example:

```js
autoCompleteJS.search(query, record, options);

// Or

autoComplete.search(query, record, options)
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

### goTo(index)

> Navigates to a specific `resultItem` on the list by its `index` number

Arguments:
- index: `Number`

Defaults:
- index: No default value

##### Example:

```js
autoCompleteJS.goTo(1);
```


***

### select(index)

> Selects a `resultItem` from the list by its `index` number

Arguments:
- index: `Number` <sub><sup>(optional)</sup></sub>

Defaults:
- index: current cursor position

##### Example:

```js
autoCompleteJS.select(1);
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

> Removes all the event listeners on the `events` list

##### Example:

```js
autoCompleteJS.unInit();
```

***

## Events

### init

***

> Fires after `autoComplete.js` engine is initialized and ready

- Example:

```js
document.querySelector("#autoComplete").addEventListener("init", function (event) {
    // "event.detail" carries the returned data values
    console.log(event);
});
```

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
    // "event.detail" carries the autoComplete.js "feedback" object
    console.log(event.detail);
});
```

***

### navigate

> Fires on every "resultsList" navigation interaction

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("navigate", function (event) {
    // "event.detail" carries the autoComplete.js "feedback" object
    console.log(event.detail);
});
```

***

### selection

> Fires on result item selection

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("selection", function (event) {
    // "event.detail" carries the autoComplete.js "feedback" object
    console.log(event.detail);
});
```

***

### close

> Fires after "resultsList" is closed

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("close", function (event) {
    // "event.detail" carries the autoComplete.js "feedback" object
    console.log(event.detail);
});
```

***

### clear

> Fires after "resultsList" is cleared

##### Example:

```js
document.querySelector("#autoComplete").addEventListener("clear", function (event) {
    // "event.detail" carries the autoComplete.js "feedback" object
    console.log(event.detail);
});
```
