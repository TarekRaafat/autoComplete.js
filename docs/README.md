# Introduction

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.com/TarekRaafat/autoComplete.js.svg?branch=master)](https://travis-ci.com/TarekRaafat/autoComplete.js)
[![GitHub version](https://badge.fury.io/gh/tarekraafat%2FautoComplete.js.svg)](https://badge.fury.io/gh/tarekraafat%2FautoComplete.js)
[![npm version](https://badge.fury.io/js/%40tarekraafat%2Fautocomplete.js.svg)](https://badge.fury.io/js/%40tarekraafat%2Fautocomplete.js)
[![](https://data.jsdelivr.com/v1/package/gh/TarekRaafat/autoComplete.js/badge)](https://www.jsdelivr.com/package/gh/TarekRaafat/autoComplete.js)
![\[Zero Dependencies\]()](https://img.shields.io/badge/Dependencies-0-blue.svg)
![\[Size\]()](https://img.shields.io/badge/Size-4%20KB-green.svg)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/TarekRaafat/autoComplete.js)

<br>
<br>
<p align="center">
	<a href="http://www.tarekraafat.com/dev/projects/autoComplete/">
  		<img src="https://www.tarekraafat.com/dev/projects/autoComplete/README/img/autoComplete.js.svg" alt= "autoComplete.js Design" width="50%">
	</a>
</p>
<br>
<br>
<br>

## Features

-   [x] Simple & Easy to use
-   [x] Pure Vanilla Javascript
-   [x] Zero Dependencies
-   [x] Lightweight
-   [x] Lightning Fast
-   [x] Versatile
-   [x] Customizable
-   [x] First Class Error Handling & Reporting

## [![autoComplete.js Code Example](https://www.tarekraafat.com/dev/projects/autoComplete/README/img/autoComplete.init.png "autoComplete.js Code Example")](https://codepen.io/tarekraafat/pen/rQopdW)

## 1. Get Started

### Clone:

-   Clone autoComplete.js to your local machine using `https://github.com/TarekRaafat/autoComplete.js.git`

### Setup:

1.  Install Dependencies

```shell
$ npm i
```

2.  For Development

```shell
$ npm run dev
```

3.  Build Production Package

```shell
$ npm run build
```

### Installation:

-   jsDelivr CDN (<a href="https://www.jsdelivr.com/package/gh/TarekRaafat/autoComplete.js?tab=collection">Link</a>)

`CSS`

```html
<head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/TarekRaafat/autoComplete.js@1.5.0/dist/css/autoComplete.min.css"
	/>
</head>
```

`JS`

```html
<body>
	<script src="https://cdn.jsdelivr.net/gh/TarekRaafat/autoComplete.js@1.5.0/dist/js/autoComplete.min.js"></script>
</body>
```

-   HTML Local load

```html
<script src="./autoComplete.js"></script>
```

-   HTML Local load - ES6 module `(Use with Import)`

```html
<script src="./index.js" type="module"></script>
```

-   Import module ES6

```js
import autoComplete from "./autoComplete";
```

-   npm install `(Node Package Manager)`

<https://www.npmjs.com/package/@tarekraafat/autocomplete.js>

```shell
$ npm i @tarekraafat/autocomplete.js
```

-   Node.js

```js
const autoComplete = require("@tarekraafat/autocomplete.js/dist/js/autoComplete");
```

### How to use:

> HTML file
>
> 1.  Assign id="autoComplete" to the input filed

```html
<input id="autoComplete" type="text" />
```

> JS file

2.  Create new instance of autoComplete engine

```js
new autoComplete({
	dataSrc: grocery, // Array data source
	searchEngine: "loose", // Search Engine type
	renderResults: {
		// Render results Destination & position
		destination: document.querySelector("#autoComplete"),
		position: "afterend"
	},
	placeHolder: "Try me...", // Place Holder text
	maxResults: 10, // Max number of results
	highlight: true, // Highlight matching results
	dataAttribute: {
		tag: "set", // Data attribute tag
		value: "value" // Data attribute value
	},
	onSelection: value => {
		// Action script onClick event
		document.querySelector(".selection").innerHTML = value.id;
	}
});
```

| Features        | Description                             | Values                                                                                                                                                          | Default                                                                        |
| --------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `dataSrc`       | Data Source                             | `Array` or <br> `Function` => `Array`                                                                                                                           | **No**                                                                         |
| `searchEngine`  | Search Engine Type/Mode                 | `strict` or `loose` lowerCase string                                                                                                                            | `strict`                                                                       |
| `renderResults` | Rendered results destination & position | Object of two methods:<br> 1- html element selector: `document.querySelector("#div")`<br> 2- position:<br> `beforebegin`, `afterbegin`, `beforeend`, `afterend` | `{destination: document.querySelector("#autoComplete"), position: "afterend"}` |
| `placeHolder`   | Place Holder text                       | `String`                                                                                                                                                        | Blank / Empty                                                                  |
| `maxResults`    | Maximum number of displayed results     | `Number`                                                                                                                                                        | `10`                                                                           |
| `highlight`     | Highlight matching results              | `Boolean`                                                                                                                                                       | `false`                                                                        |
| `dataAttribute` | Data Attribute tag                      | `Object`                                                                                                                                                        | `{tag: "autoComplete", value: ""}`                                             |
| `onSelection`   | Action script onClick event             | `Function`                                                                                                                                                      | No Action                                                                      |

3.  That's it, you're ready to go!

* * *

## 2. Examples

-   Live working [Demo]


-   Try it on [CodePen](https://codepen.io/tarekraafat/pen/rQopdW)

[demo]: http://www.tarekraafat.com/dev/projects/autoComplete/

-   Download [Demo] files locally from <a href="./dist" target="_blank">`/dist`</a> folder

* * *

## 3. Support

For general questions about autoComplete.js, tweet at [@TarekRaafat].

For technical questions, you should post a question on [Stack Overflow] and tag
it with [autoComplete.js][so tag].

<!-- section links -->

[stack overflow]: http://stackoverflow.com/

[@tarekraafat]: https://twitter.com/TarekRaafat

[so tag]: http://stackoverflow.com/questions/tagged/autoComplete.js

* * *

## 4. Browsers Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera-mini/opera-mini_48x48.png" alt="Opera Mini" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera Mini | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                            | last version                                                                                                                                                                                                      | last version                                                                                                                                                                                                  | last version                                                                                                                                                                                                  | last version                                                                                                                                                                                                                  | last version                                                                                                                                                                                                                        | last version                                                                                                                                                                                              | last version                                                                                                                                                                                                                  | last version                                                                                                                                                                                                          |

* * *

## 5. What's New?

<a href="./README/Releases.md">Releases</a> Information

* * *

## 6. Roadmap

### Functionality:

-   [ ] Add support for different types of data source
    -   [x] Function
    -   [ ] External data source `(Plugin)`
-   [x] Multi-keyword Search
-   ~~Placeholder text maximum length option `[experimental]`~~ `[Depricated]`
-   [ ] Navigate results list with keyboard
-   [x] Different types/modes of Search Logic
-   [ ] Autocomplete query with nearest result in placeholder
-   [x] Choose different results render destination & position

### Usability:

-   [ ] New designs for inspiration (Ongoing)
    -   [x] Styles
    -   [x] Interactions
-   [ ] Number of results inside input field (Optional)

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

Tarek Raafat - tarek.m.raafat@gmail.com

Distributed under the Apache 2.0 license. See `Apache 2.0` for more information.

<https://github.com/TarekRaafat/>

* * *

## 9. License

Apache 2.0 © [Tarek Raafat](http://www.tarekraafat.com)
