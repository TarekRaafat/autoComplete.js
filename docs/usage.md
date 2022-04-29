# Usage <!-- {docsify-ignore} -->

autoComplete.js usage guide in detailed steps

***

## Steps

***

### 1. HTML


Add an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) or [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) tag to your html page:

<!-- tabs:start -->
#### ** Basic **
```html
<input id="autoComplete">

<!-- OR -->

<textarea id="autoComplete">
```
#### ** Advanced **
```html
<input id="autoComplete" type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" maxlength="2048" tabindex="1">

<!-- OR -->

<textarea id="autoComplete" rows="4" cols="50" maxlength="2048" tabindex="1">
```
<!-- tabs:end -->

***

### 2. Script


1. Import `autoComplete.js` library to your project

<!-- tabs:start -->
#### ** HTML **

```html
<body>
    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/autoComplete.min.js"></script>
</body>
```
#### ** Javascript **

```js
// CommonJS
const autoComplete = require("@tarekraafat/autocomplete.js");

/* OR */

// ES6 modules
import autoComplete from "@tarekraafat/autocomplete.js";
```
<!-- tabs:end -->

2. Create new instance of `autoComplete.js` engine after import and add needed [configuration](/configuration.md)

<!-- tabs:start -->
#### ** HTML **

```html
<body>
    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/autoComplete.min.js"></script>

    <script>
        const autoCompleteJS = new autoComplete({ config });
    </script>
</body>
```
#### ** Javascript **

```js
// CommonJS
const autoComplete = require("@tarekraafat/autocomplete.js");

const autoCompleteJS = new autoComplete({ config });

/* OR */

// ES6 modules
import autoComplete from "@tarekraafat/autocomplete.js";

const autoCompleteJS = new autoComplete({ config });
```
<!-- tabs:end -->

3. Set your `autoComplete.js` instance [configurations](/configuration.md)
> Note: [data.src](/configuration.md?id=data-required) config is **required**

<!-- tabs:start -->
#### ** Basic **

```js
// API Basic Configuration Object
{
    placeHolder: "Search for Food...",
    data: {
        src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
    },
    resultItem: {
        highlight: true,
    }
}
```

#### ** Advanced **

```js
// API Advanced Configuration Object
{
    selector: "#autoComplete",
    placeHolder: "Search for Food...",
    data: {
        src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
        cache: true,
    },
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                // Create "No Results" message element
                const message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                // Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true,
    },
    resultItem: {
        highlight: true,
    }
}
```

<!-- tabs:end -->
> <i class="ps-icon ps-icon-warning"></i> Security Alert:
> 
> `autoComplete.js` does not sanitize/manipulate the user's input data query, mainly for flexibility purposes.
>
> Hence, it is advisable to use any trusted sanitization method/strategy/library with the [`query`](https://tarekraafat.github.io/autoComplete.js/#/configuration?id=query-optional) API method<br>
> to reduce the risk of `Cross-Frame Scripting (XFS)` or `Cross-Site Scripting (XSS)` attacks.
>
>
>
> Recommended sanitization Libraries:<br>
> 1- [DOMPurify](https://github.com/cure53/DOMPurify)<br>
> 2- [js-xss](https://github.com/leizongmin/js-xss)<br>
> 3- [sanitize-html](https://github.com/apostrophecms/sanitize-html)<br>
> 4- [escape-goat](https://github.com/sindresorhus/escape-goat)

***

### 3. Style


Add the `autoComplete.js` stylesheet inside the `HEAD` tag

<!-- tabs:start -->
#### ** CDN **

```html
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/css/autoComplete.min.css">
</head>
```

#### ** Local **

```html
<head>
    <link rel="stylesheet" href="./css/autoComplete.css">
</head>
```
<!-- tabs:end -->

## Demo

<br><br>

<div class="autoComplete_wrapper">
    <input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete">
</div>

<br><br>

<details>
  <summary>Full Demo Code Snippet</summary>

<!-- tabs:start -->

#### ** Basic **

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/css/autoComplete.min.css">
</head>

<body>
    <div class="autoComplete_wrapper">
        <input id="autoComplete" type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/autoComplete.min.js"></script>
    <script>
        const autoCompleteJS = new autoComplete({
            placeHolder: "Search for Food...",
            data: {
                src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
                cache: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                }
            }
        });
    </script>
</body>

</html>
```

#### ** Advanced **

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/css/autoComplete.min.css">
</head>

<body>
    <div class="autoComplete_wrapper">
        <input id="autoComplete" type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@{{version}}/dist/autoComplete.min.js"></script>
    <script>
        const autoCompleteJS = new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Search for Food...",
            data: {
                src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
                cache: true,
            },
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        // Create "No Results" message element
                        const message = document.createElement("div");
                        // Add class to the created element
                        message.setAttribute("class", "no_result");
                        // Add message text content
                        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                        // Append message element to the results list
                        list.prepend(message);
                    }
                },
                noResults: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                }
            }
        });
    </script>
</body>

</html>
```

<!-- tabs:end -->

</details>

<script>
    const autoCompleteJS = new autoComplete({
        placeHolder: "Search for Food...",
        data: {
            src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
            cache: true,
        },
        resultsList: {
            element: (list, data) => {
                if (!data.results.length) {
                    // Create "No Results" message element
                    const message = document.createElement("div");
                    // Add class to the created element
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                    // Append message element to the results list
                    list.prepend(message);
                }
            },
            noResults: true,
        },
        resultItem: {
            highlight: true
        },
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                }
            }
        }
    });
</script>