# How-to Guide
Guided examples on how-to use autoComplete.js in different use-cases

***

## `Open list on focus`

<!-- panels:start -->
<!-- div:left-panel -->

##### Code:

```js
trigger: {
    event: ["input", "focus"],
    condition: () => true
}
```

<!-- div:right-panel -->

##### Example

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_01">

<!-- panels:end -->

***

## `No Results Found`

<!-- panels:start -->
<!-- div:left-panel -->

##### Code:

```js
resultsList: {
    noResults: (list, query) => {
        // Create "No Results" message list element
        const message = document.createElement("div");
        message.setAttribute("class", "no_result");
        // Add message text content
        message.innerHTML = `<span>Found No Results for "${query}"</span>`;
        // Add message list element to the list
        list.appendChild(message);
    },
}
```

##### Code:


<!-- div:right-panel -->

##### Example

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_02">

<!-- panels:end -->

***

## `Multiple Choices`

<!-- panels:start -->
<!-- div:left-panel -->
##### Code:

```js
query: {
    manipulate: (query) => {
        // Split query into array
        const querySplit = query.split(",");
        // Get last query value index
        const lastQuery = querySplit.length - 1;
        // Trim new query
        const newQuery = querySplit[lastQuery].trim();

        return newQuery;
    }
},
onSelection: (dataFeedback) => {
    const input = document.querySelector("#autoComplete");
    // Trim selected Value
    const selection = dataFeedback.selection.value.trim();
    // Split query into array and trim each value
    const query = input.value.split(",").map(item => item.trim());
    // Remove last query
    query.pop();
    // Add selected value
    query.push(selection);
    // Replace Input value with the new query
    input.value = query.join(", ");
}
```

<!-- div:right-panel -->

##### Example:

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_03">

<!-- panels:end -->

<script>
    const autoCompleteJS_01 = new autoComplete({
        selector: "#autoComplete_01",
        placeHolder: "Pizza, Burger, Sushi",
        data: {
            src: ["Pizza", "Burgers", "Sushi", "Coffee", "Soda", "Fresh Juice"]
        },
        trigger: {
            event: ["input", "focus"],
            condition: () => true
        },
        resultsList: {
            noResults: (list, query) => {
                // Create "No Results" message list element
                const message = document.createElement("div");
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

    const autoCompleteJS_02 = new autoComplete({
        selector: "#autoComplete_02",
        placeHolder: "Pizza, Burger, Sushi",
        data: {
            src: ["Pizza", "Burgers", "Sushi", "Coffee", "Soda", "Fresh Juice"]
        },
        resultsList: {
            noResults: (list, query) => {
                // Create "No Results" message list element
                const message = document.createElement("div");
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

    const autoCompleteJS_03 = new autoComplete({
        selector: "#autoComplete_03",
        placeHolder: "Pizza, Burger, Sushi",
        data: {
            src: ["Pizza", "Burgers", "Sushi", "Coffee", "Soda", "Fresh Juice"]
        },
        query: {
		    manipulate: (query) => {
                // Split query into array
                const querySplit = query.split(",");
                // Get last query value index
                const lastQuery = querySplit.length - 1;
                // Trim new query
                const newQuery = querySplit[lastQuery].trim();

                return newQuery;
            }
	    },
        resultsList: {
            noResults: (list, query) => {
                // Create "No Results" message list element
                const message = document.createElement("div");
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
        },
        onSelection: (dataFeedback) => {
            const input = document.querySelector("#autoComplete_03");
            // Trim selected Value
            const selection = dataFeedback.selection.value.trim();
            // Split query into array and trim each value
            const query = input.value.split(",").map(item => item.trim());
            // Remove last query
            query.pop();
            // Add selected value
            query.push(selection);
            // Replace Input value with the new query
            input.value = query.join(", ");
	    }
    });
</script>