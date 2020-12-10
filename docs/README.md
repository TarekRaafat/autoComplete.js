# Introduction

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/TarekRaafat/autoComplete.js.svg?branch=master)](https://travis-ci.com/TarekRaafat/autoComplete.js)
[![GitHub version](https://badge.fury.io/gh/tarekraafat%2FautoComplete.js.svg)](https://badge.fury.io/gh/tarekraafat%2FautoComplete.js)
[![npm version](https://badge.fury.io/js/%40tarekraafat%2Fautocomplete.js.svg)](https://badge.fury.io/js/%40tarekraafat%2Fautocomplete.js)
[![](https://data.jsdelivr.com/v1/package/npm/@tarekraafat/autocomplete.js/badge)](https://www.jsdelivr.com/package/npm/@tarekraafat/autocomplete.js)
![\[Zero Dependencies\]()](https://img.shields.io/badge/Dependencies-0-blue.svg)
![\[Size\]()](https://img.shields.io/badge/Size-10%20KB-green.svg)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/TarekRaafat/autoComplete.js)

<br>
<br>

<h1>autoComplete.js</h1>

> Simple autocomplete pure vanilla Javascript library. <a href="https://tarekraafat.github.io/autoComplete.js/demo/" target="\_blank">:rocket: Live Demo</a> **v8.0**

autoComplete.js is a simple pure vanilla Javascript library that's progressively designed for speed, high versatility and seamless integration with a wide range of projects & systems, made for users and developers in mind.

## Features

-   Pure Vanilla Javascript
-   Zero Dependencies
-   Simple & Easy to use
-   Extremely Lightweight
-   Blazing Fast
-   Versatile
-   Hackable & highly customizable

[![autoComplete.js Code Example](./img/autoComplete.init.png "autoComplete.js Code Example")](https://codepen.io/tarekraafat/pen/rQopdW?editors=0010)

## 1. Get Started

### Clone:

-   Clone autoComplete.js to your local machine

```shell
git clone https://github.com/TarekRaafat/autoComplete.js.git
```

### Setup:

1.  Install Dependencies

```shell
npm i
```

2.  For Development

```shell
npm run dev
```

3.  Build Production Package

```shell
npm run build
```

### Installation:

-   <a href="https://www.jsdelivr.com/package/gh/TarekRaafat/autoComplete.js"><img src="./img/logos/jsdeliver_logo.png" alt="jsDelivr Logo" width="100px"></a> CDN

`CSS`

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@8.0.2/dist/css/autoComplete.min.css">
```

`JS`

```html
<script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@8.0.2/dist/js/autoComplete.min.js"></script>
```

-   <img src="./img/logos/html_logo.png" alt="HTML Logo" width="40px"> HTML Local load

```html
<script src="./autoComplete.js"></script>
```

-   <img src="./img/logos/html_logo.png" alt="HTML Logo" width="40px"> HTML Local load - ES6 module `(Use with Import)`

```html
<script src="./index.js" type="module"></script>
```

-   <img src="./img/logos/javascript_logo.png" alt="Javascript Logo" width="40px"> Import module ES6

```js
import autoComplete from "./autoComplete";
```

-   <a href="https://www.npmjs.com/package/@tarekraafat/autocomplete.js"><svg viewBox="0 0 18 7" alt="npm" width="50px"><path fill="#CB3837" d="M0 0v6h5v1h4V6h9V0"></path><path fill="#FFF" d="M1 1v4h2V2h1v3h1V1h1v5h2V2h1v2H8v1h2V1h1v4h2V2h1v3h1V2h1v3h1V1"></path></svg></a> install `(Node Package Manager)`

```shell
npm i @tarekraafat/autocomplete.js
```

-   <a href="https://yarn.pm/@tarekraafat/autocomplete.js"><img src="./img/logos/yarn_logo.png" alt="Yarn Logo" width="80px"></a> install `(Javascript Package Manager)`

```shell
yarn add @tarekraafat/autocomplete.js
```

-   <img src="./img/logos/nodejs_logo.png" alt="Node.js" width="30px"> Node.js

```js
const autoComplete = require("@tarekraafat/autocomplete.js/dist/js/autoComplete");
```

### How to use:

> HTML file

1.  Place the `CSS` stylesheet inside the `HEAD` tag

```html
<link rel="stylesheet" href="./css/autoComplete.css">
OR
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@8.0.2/dist/css/autoComplete.min.css">
```

2.  Assign the default `id` value `"autoComplete"` to the desired input field or use any custom `id/class` and configure the API selector accordingly in `Step 4`

```html
<input id="autoComplete" tabindex="1">	<!-- Default "id" value = "autoComplete"> -->
```

3.  Place autoComplete `JS` file & the custom `JS` file at the bottom `BODY` tag

```html
<script src="./js/autoComplete.min.js"></script>
<script src="./js/index.js"></script>
OR
<script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@8.0.2/dist/js/autoComplete.min.js"></script>
<script src="./js/index.js"></script>
```

> Custom JS file

4.  Create new instance of autoComplete engine and configure it `NOT all API configurations are required`

```js
new autoComplete({
    data: {							  // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        // API key token
        const token = "this_is_the_API_token_number";
        // User search query
        const query = document.querySelector("#autoComplete").value;
        // Fetch External Data Source
        const source = await fetch(`https://www.food2fork.com/api/search?key=${token}&q=${query}`);
        // Format data into JSON
        const data = await source.json();
        // Return Fetched data
        return data.recipes;
      },
      key: ["title"],
      cache: false
    },
    query: {                               // Query Interceptor               | (Optional)
          manipulate: (query) => {
            return query.replace("pizza", "burger");
          }
    },
	sort: (a, b) => {				    // Sort rendered results ascendingly | (Optional)
		if (a.match < b.match) return -1;
	    if (a.match > b.match) return 1;
	    return 0;
    },
	placeHolder: "Food & Drinks...",	 // Place Holder text 				| (Optional)
    selector: "#autoComplete",		   // Input field selector 			 | (Optional)
	threshold: 3,						// Min. Chars length to start Engine | (Optional)
	debounce: 300,					   // Post duration for engine to start | (Optional)
    searchEngine: "strict",			  // Search Engine type/mode 		  | (Optional)
    resultsList: {					   // Rendered results list object 	 | (Optional)
        render: true,
		container: source => {
			source.setAttribute("id", "food_list");
		},
		destination: document.querySelector("#autoComplete"),
		position: "afterend",
		element: "ul"
	},
	maxResults: 5,						 // Max. number of rendered results | (Optional)
	highlight: true,					   // Highlight matching results 	 | (Optional)
	resultItem: {	  					// Rendered result item 		   | (Optional)
		content: (data, source) => {
			source.innerHTML = data.match;
		},
		element: "li"
    },
    noResults: (dataFeedback, generateList) => {
        // Generate autoComplete List
        generateList(autoCompleteJS, dataFeedback, dataFeedback.results);
        // No Results List Item
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${dataFeedback.query}"</span>`;
        document.querySelector(`#${autoCompleteJS.resultsList.idName}`).appendChild(result);
    },
	onSelection: feedback => {			 // Action script onSelection event | (Optional)
		console.log(feedback.selection.value.image_url);
	}
});
```

### API Configuration:

<br>

| Keys           | Description                                                        | Values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default                                                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`         | Data Source, Data Key & Data Caching                               | **1- src**: <br> - `Array` of `Strings` / `Objects`<br>**OR**<br> - `Function` => `Array` of `Strings` / `Objects` <br> **2- key**: <br>- `Array` of `Strings`<br>**Required** if `src` is `Object`, for search to point to desired `keys` <br> **3- Cache**: <br> - `true` for static data `src` <br> - `false` for dynamic data `src` "API" with queries                                                                                                                                                                                                | Data `src`                                                                                                                                                                                                                                                             |
| `trigger`      | Engine event & condition trigger                                   | **1- event**: <br> - `Array` of `Strings` <br> **2- condition**: <br>- `Function` (query) => Condition `String`                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1- event: `["input"]` <br> 2- condition: <br> `(query.length > this.threshold && query !== " ")`                                                                                                                                                                       |
| `query`        | Query Interceptor                                                  | **-** `Object` with 1 method<br> 1- manipulate: `Function` with (query) parameter                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Raw `Input`                                                                                                                                                                                                                                                            |
| `sort`         | Sort rendered results                                              | **-** `Function` with (firstResult, secondResult) parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false` **(Random Results)**                                                                                                                                                                                                                                           |
| `placeHolder`  | Place Holder text                                                  | **-** `String`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blank / Empty                                                                                                                                                                                                                                                          |
| `selector`     | Input field selector                                               | **-** `String` `id`/`class` <br>**OR**<br> **-** `Function` ( ) =>  `document.querySelector("")`                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `"#autoComplete"`                                                                                                                                                                                                                                                      |
| `threshold`    | Minimum characters length before engine starts rendering results   | **-** `Number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `1`                                                                                                                                                                                                                                                                    |
| `debounce`     | Minimum duration after typing idle state for engine to kick in     | **-** `Number` <br> Milliseconds value <br> debounce: `300`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `0`                                                                                                                                                                                                                                                                    |
| `searchEngine` | Search Engine Type/Mode                                            | **-** `"strict"` lowerCase string <br>**OR**<br> **-** `"loose"` lowerCase string <br>**OR**<br> **-** customEngine `Function` with (query, record) parameters, returns each match individually                                                                                                                                                                                                                                                                                                                                                           | `"strict"`                                                                                                                                                                                                                                                             |
| `diacritics`   | Search Engine Diacritics handler                                   | **-** `Boolean"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`                                                                                                                                                                                                                                                                |
| `resultsList`  | Rendered results list destination,  position, element & navigation | **-** `Object` with 8 methods<br> 1- render: `Boolean` <br> 2- container: <br> `Function` with (source) parameter<br> 3- destination: `"#targetID"`<br> 4- position:<br> `"beforebegin"`, `"afterbegin"`, `"beforeend"`, `"afterend"` lowerCase string <br>**OR**<br>**-** `Function` ( ) => `{destination: "...", position: "..."}` <br> 5- element: <br> `"ul", "span", "div" or Custom`  <br> 6- idName: `"id"` <br> 7- className: `"class"` <br> 8- navigation: `Function` with `(event, input, resListElement, onSelection, resListData)` parameters | 1- render: `false` <br> 2- container: `(source) => { ... }` <br> 3- destination: `"#autoComplete"` <br> 4- position: `"afterend"` <br> 5- element: `"ul"` <br> 6- idName: `"autoComplete_list"` <br> 7- className: `"autoComplete_list"` <br> 8- navigation: `default` |
| `resultItem`   | Rendered result Item content & element                             | **-** `Object` with 4 methods<br> 1- content: <br>**-** `Function` with (data, source) parameters <br> **-** `data.match` has to be used for **Highlighted** result <br> 2- element: <br> `"li", "span", "div" or Custom` <br> 3- idName: `"id`  <br> 4- className: `"class`                                                                                                                                                                                                                                                                              | 1- content: `(data, source) => { ... }` <br> 2- element: `"li"` <br> 3- idName: `"autoComplete_result"` <br> 4- className: `"autoComplete_result"`                                                                                                                     |
| `noResults`    | Action script on noResults found                                   | **-** `Function` with (dataFeedback, generateList) parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | No Action                                                                                                                                                                                                                                                              |
| `highlight`    | Highlight matching results                                         | **-** `Boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`                                                                                                                                                                                                                                                                |
| `maxResults`   | Maximum number of displayed results                                | **-** `Number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `5`                                                                                                                                                                                                                                                                    |
| `feedback`     | Action script on dataFeedback event                                | **-** `Function` with (data) parameter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No Action                                                                                                                                                                                                                                                              |
| `onSelection`  | Action script onSelection event                                    | **-** `Function` with (feedback) parameter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No Action                                                                                                                                                                                                                                                              |

1.  That's it, you're ready to go!

* * *

### Life Cycle Events:

1. `init`: Fires after "autoComplete.js" engine is initialized
2. `fetch`: Fires after fetching data is complete
3. `input`: Fires on every user input
4. `results`: Fires after search is done and marching results are ready 
5. `rendered`: Fires after rendering the results list
6. `navigation`: Fires on every "resultsList" navigation interaction
7. `unInit`: Fires after "autoComplete.js" engine is un-initialized

* * *

## 2. Examples

-   Live working [Demo]


-   Try it on [<img src="./img/logos/codepen_logo.png" width="100px" alt="CodePen Logo">](https://codepen.io/tarekraafat/pen/rQopdW?editors=0010)

[demo]: https://tarekraafat.github.io/autoComplete.js/demo/

-   Download [Demo] files locally from <a href="https://github.com/TarekRaafat/autoComplete.js/tree/master/dist" target="_blank">`/dist`</a> folder

* * *

## 3. Support

For general questions about autoComplete.js, tweet at [@TarekRaafat].

For technical questions, you should post a question on [Stack Overflow] and tag
it with [autoComplete.js][so tag].

<!-- section links -->

[stack overflow]: https://stackoverflow.com/

[@tarekraafat]: https://twitter.com/TarekRaafat

[so tag]: https://stackoverflow.com/questions/tagged/autoComplete.js

* * *

## 4. Browsers Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera-mini/opera-mini_48x48.png" alt="Opera Mini" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera Mini | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                            | last version                                                                                                                                                                                                      | last version                                                                                                                                                                                                  | last version                                                                                                                                                                                                  | last version                                                                                                                                                                                                                  | last version                                                                                                                                                                                                                        | last version                                                                                                                                                                                              | last version                                                                                                                                                                                                                  | last version                                                                                                                                                                                                          |

* * *

## 5. What's New in v8.0?

Check out <a href="#/releases?id=versioning">Releases</a> Information :sparkles:

* * *

## 6. Roadmap

### Functionality:

-   [x] Add support for different types of data source
    -   [x] Function
    -   [x] JSON
    -   [x] Array of Object
    -   [x] External data source via Promises & Async/Await function
-   [x] Multi-keyword Search
-   [x] Different types/modes of Search Logic
-   [x] Choose different results render destination & position
-   [x] Sort rendered results
-   [x] Results list Keyboard `ARROW` or `TAB` Navigation
-   [x] Enhance error Handling (Ongoing)
-   [x] Number of matching results
-   [x] Fetching dynamically External API data source
-   [x] Multiple searchable `keys` for data `src`
-   [x] Event emitter on input field events
-   [x] Handling large data sets
-   [x] Event emitter fires on cleared empty input field state
-   [x] `Query` Interception & Manipulation
-   [x] Improve `Promise` usage for external data source handling
-   [x] Add support for `Diacritics`
-   [x] Input field Observer
-   [ ] Automatic deep search over all keys in multiple nested object data source

### Usability:

-   [x] Avail Gzip files options
-   [x] Comprehensive data feedback on user selection
-   [x] Dynamic input field selector
-   [x] Minimum characters length before results start getting rendered for more focused results
-   [x] No matches found response & text
-   [x] API for Rendered result item customization
-   [x] API for Rendered results list customization
-   [x] Capability for multiple instances
-   [x] Render `results` in default case
-   [x] Render `resultsList` & `resultItem` in different/custom elements
-   [x] HTML elements `ContentEditable` Input Support
-   [x] Serve results without rendering list through `resultsList.render` API
-   [x] Custom Search Engine Capability
-   [x] `ShadowDom` Support
-   [x] API support for `customNavigation`
-   [x] API support for `customEventTriggers` & `customTriggerConditions`
-   [x] Better `resultsList` navigation [Without loosing cursor]
-   [x] Add event emitters for navigation
-   [x] Life Cycle Events
-   [ ] Add more use examples & cases of the library to the documentation
-   [ ] Better code compression / optimization for the library to squeeze it back under `[5kb]`

### Plugins:

-   [ ] Recent / Most Searches
-   [ ] Inline Suggestions
-   [ ] Input Tags
-   [ ] Virtual Scrolling
-   [ ] Results List Category Separator
-   [ ] `IndexedDB` for large data sets handling & offline usage
-   [ ] Themes / Styles & Interactions

### Reported Issues:

- [ ] Duplicated results when using multiple data source `keys`

* * *

## 7. Contribution

> Contributions are always more than welcome!

If you have any ideas, just [open an issue](https://github.com/TarekRaafat/autoComplete.js/issues) and tell me what you think.

-   Please fork the repository and make changes as you'd like.
    Pull requests are warmly welcome.

> If you'd like to contribute:

1.  Fork it (<https://github.com/TarekRaafat/autoComplete.js.git>)
2.  Create your feature branch (`git checkout -b feature/fooBar`)
3.  Commit your changes (`git commit -am 'Add some fooBar'`)
4.  Push to the branch (`git push origin feature/fooBar`)
5.  Create a new Pull Request

* * *

## 8. Author

**Tarek Raafat**

-   Email: tarek.m.raafat@gmail.com
-   Website: <http://www.tarekraafat.com/>
-   Github: <https://github.com/TarekRaafat/>

Distributed under the Apache 2.0 license. See `Apache 2.0` for more information.

* * *

## 9. License

Apache 2.0 © [Tarek Raafat](http://www.tarekraafat.com)
