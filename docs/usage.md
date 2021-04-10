# Usage

autoComplete.js usage guide in detailed steps

## Steps

### 1. HTML

***

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
> <div class="ps-icon ps-icon-bubble"></div><strong>Tip:</strong> wrap < input > or < textarea > inside < div class="autoComplete_wrapper" > to make sure results list always attached and aligned.

### 2. Script

****

1. Import `autoComplete.js` library to your project

<!-- tabs:start -->
#### ** HTML **

```html
<body>
    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@9.0.0/dist/js/autoComplete.min.js"></script>
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
    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@9.0.0/dist/js/autoComplete.min.js"></script>

    <script>
        const autoCompleteJS = new autoComplete({ config });
    </script>
</body>
```
#### ** Javascript **

```js
// CommonJS
const autoComplete = require("@tarekraafat/autocomplete.js");

/* OR */

// ES6 modules
import autoComplete from "@tarekraafat/autocomplete.js";

const autoCompleteJS = new autoComplete({ config });
```
<!-- tabs:end -->

3. Set your `autoComplete.js` instance [configurations](/configuration.md)

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
        highlight: {
            render: true
        }
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
        src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
    },
    resultsList: {
        noResults: (list, query) => {
            // Create "No Results" message list element
            const message = document.createElement("li");
            message.setAttribute("class", "no_result");
            // Add message text content
            message.innerHTML = `<span>Found No Results for "${query}"</span>`;
            // Add message list element to the list
            list.appendChild(message);
        },
    },
    resultItem: {
        highlight: {
            render: true
        }
    }
}
```

<!-- tabs:end -->
> Note: [data.src](/configuration.md?id=data-required) config is **required**


### 3. Style

***

Add the `autoComplete.js` stylesheet inside the `HEAD` tag

<!-- tabs:start -->
#### ** CDN **

```html
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@9.0.0/dist/css/autoComplete.min.css">
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

***

<div class="autoComplete_wrapper">
    <input type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete">
</div>

<br><br>

<details>
  <summary>Full Demo Code Snippet</summary>

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@9.0.0/dist/css/autoComplete.min.css">
</head>

<body>
    <div class="autoComplete_wrapper">
        <input type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@9.0.0/dist/js/autoComplete.min.js"></script>
    <script>
        new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Search for Food...",
            data: {
                src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
            },
            resultsList: {
                noResults: (list, query) => {
                    // Create "No Results" message list element
                    const message = document.createElement("li");
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    message.innerHTML = `<span>Found No Results for "${query}"</span>`;
                    // Add message list element to the list
                    list.appendChild(message);
                },
            },
            resultItem: {
                highlight: {
                    render: true
                }
            }
        });
    </script>
</body>

</html>
```

</details>

<script>
    new autoComplete({
        selector: "#autoComplete",
        placeHolder: "Search for Food...",
        data: {
            src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
        },
        resultsList: {
            noResults: (list, query) => {
                // Create "No Results" message list element
                const message = document.createElement("li");
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${query}"</span>`;
                // Add message list element to the list
                list.appendChild(message);
            },
        },
        resultItem: {
            highlight: {
                render: true
            }
        }
    });
</script>