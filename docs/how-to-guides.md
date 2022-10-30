# How-to Guides
Guided examples on how-to use autoComplete.js in different use-cases

***

## `Open list on focus`

<!-- panels:start -->
<!-- div:left-panel -->

##### Code:

```js
// autoComplete.js Config Options
events: {
    input: {
        focus() {
            const inputValue = autoCompleteJS.input.value;

            if (inputValue.length) autoCompleteJS.start();
        },
    },
},
```

<!-- div:right-panel -->

##### Example

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_01">

<!-- panels:end -->

***

## `Dynamic list position`

<!-- panels:start -->
<!-- div:left-panel -->

##### Code:

```js
// autoComplete.js Config Options
events: {
    input: {
        open() {
            const position =
                autoCompleteJS.input.getBoundingClientRect().bottom + autoCompleteJS.list.getBoundingClientRect().height >
                (window.innerHeight || document.documentElement.clientHeight);

            if (position) {
                autoCompleteJS.list.style.bottom = autoCompleteJS.input.offsetHeight + 8 + "px";
            } else {
                autoCompleteJS.list.style.bottom = -autoCompleteJS.list.offsetHeight - 8 + "px";
            }
        },
    },
},
```

<!-- div:right-panel -->

##### Example

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_02">

<!-- panels:end -->

***

## `No Results Found`

<!-- panels:start -->
<!-- div:left-panel -->

##### Code:

```js
// autoComplete.js Config Options
resultsList: {
    element: (list, data) => {
        if (!data.results.length) {
            // Create "No Results" message list element
            const message = document.createElement("div");
            message.setAttribute("class", "no_result");
            // Add message text content
            message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
            // Add message list element to the list
            list.appendChild(message);
        }
    },
    noResults: true,
}
```

<!-- div:right-panel -->

##### Example

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_03">

<!-- panels:end -->

***

## `Multiple Choices`

<!-- panels:start -->
<!-- div:left-panel -->
##### Code:

```js
// autoComplete.js Config Options
query: (query) => {
    // Split query into array
    const querySplit = query.split(",");
    // Get last query value index
    const lastQuery = querySplit.length - 1;
    // Trim new query
    const newQuery = querySplit[lastQuery].trim();

    return newQuery;
},
events: {
    input: {
        selection(event) {
            const feedback = event.detail;
            const input = autoCompleteJS.input;
            // Trim selected Value
            const selection = feedback.selection.value.trim();
            // Split query into array and trim each value
            const query = input.value.split(",").map(item => item.trim());
            // Remove last query
            query.pop();
            // Add selected value
            query.push(selection);
            // Replace Input value with the new query
            input.value = query.join(", ") + ", ";
        }
    }
},
```

<!-- div:right-panel -->

##### Example:

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_04">

<!-- panels:end -->

***

## `Recent Searches`

<!-- panels:start -->
<!-- div:left-panel -->
##### Code:
```js
// External empty array to save search results
const history = [];
```

```js
// autoComplete.js Config Options
resultsList: {
    element: (list) => {
        const recentSearch = history.reverse();
        const historyLength = recentSearch.length;

        // Check if there are recent searches
        if(historyLength) {
            const historyBlock = document.createElement("div");
            historyBlock.setAttribute("style", "display: flex; flex-direction: column; margin: .3rem; padding: .3rem .5rem;");
            historyBlock.innerHTML = "Recent Searches";
            // Limit displayed searched to only last "2"
            recentSearch.slice(0, 2).forEach((item) => {
                const recentItem = document.createElement("span");
                recentItem.setAttribute("style", "display: flex; margin: .2rem; color: rgba(0, 0, 0, .2);");
                recentItem.innerHTML = item;
                historyBlock.append(recentItem);
            });

            const separator = document.createElement("hr");
            separator.setAttribute("style", "margin: 5px 0 0 0;");
            historyBlock.append(separator);

            list.prepend(historyBlock);
        }
    }
},
events: {
    input: {
        selection(event) {
            const feedback = event.detail;
            const input = autoCompleteJS.input;
            // Get selected Value
            const selection = feedback.selection.value.trim();
            // Add selected value to "history" array
            history.push(selection);
        }
    }
},
```

<!-- div:right-panel -->

##### Example:

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_05">

<!-- panels:end -->

***

## `Results Start With`

<!-- panels:start -->
<!-- div:left-panel -->
##### Code:

```js
// autoComplete.js Config Options
filter: (list) => {
    const results = list.filter((item) => {
        const inputValue = autoCompleteJS.input.value.toLowerCase();
        const itemValue = item.value.toLowerCase();

        if (itemValue.startsWith(inputValue)) {
            return item.value;
        }
    });

    return results;
},
```

<!-- div:right-panel -->

##### Example:

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_06">

<!-- panels:end -->

## `Show all items on click`

<!-- panels:start -->
<!-- div:left-panel -->

##### Code:

```js
// autoComplete.js Config Options
threshold: 0,
resultsList: {
    maxResults: undefined
},
```

<!-- div:right-panel -->

##### Example

<input type="text" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete_07">

<!-- panels:end -->

***

<script>
    const data = {
        src: ["Pizza", "Burgers", "Sushi", "Coffee", "Soda", "Fresh Juice"]
    };
    const placeHolder = "Pizza, Burger, Sushi";
    const resultsList= {
        element(list, data) {
            if (!data.results.length) {
                // Create "No Results" message list element
                const message = document.createElement("div");
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                // Add message list element to the list
                list.prepend(message);
            }
        },
        noResults: true,
    };
    const resultItem = {
        highlight: true
    };

    const autoCompleteJS_01 = new autoComplete({
        selector: "#autoComplete_01",
        placeHolder,
        data,
        resultsList,
        resultItem,
        events: {
            input: {
                focus() {
                    if (autoCompleteJS_01.input.value.length) autoCompleteJS_01.start();
                },
                selection(event) {
                    const selection = event.detail.selection.value;
                    autoCompleteJS_01.input.value = selection;
                }
            },
        },
    });

    const autoCompleteJS_02 = new autoComplete({
        selector: "#autoComplete_02",
        placeHolder,
        data,
        resultsList,
        resultItem,
        events: {
            input: {
                open() {
                    const position =
                        autoCompleteJS_02.input.getBoundingClientRect().bottom + autoCompleteJS_02.list.getBoundingClientRect().height >
                        (window.innerHeight || document.documentElement.clientHeight);

                    if (position) {
                        autoCompleteJS_02.list.style.bottom = autoCompleteJS_02.input.offsetHeight + 8 + "px";
                    } else {
                        autoCompleteJS_02.list.style.bottom = -autoCompleteJS_02.list.offsetHeight - 8 + "px";
                    }
                },
                selection(event) {
                    const selection = event.detail.selection.value;
                    autoCompleteJS_02.input.value = selection;
                }
            },
        },
    });

    const autoCompleteJS_03 = new autoComplete({
        selector: "#autoComplete_03",
        placeHolder,
        data,
        resultsList,
        resultItem,
        events: {
            input: {
                selection(event) {
                    const selection = event.detail.selection.value;
                    autoCompleteJS_03.input.value = selection;
                }
            }
        }
    });

    const autoCompleteJS_04 = new autoComplete({
        selector: "#autoComplete_04",
        placeHolder,
        data,
        query(query) {
            // Split query into array
            const querySplit = query.split(",");
            // Get last query value index
            const lastQuery = querySplit.length - 1;
            // Trim new query
            const newQuery = querySplit[lastQuery].trim();

            return newQuery;
	    },
        resultsList,
        resultItem,
        events: {
            input: {
                selection(event) {
                    const feedback = event.detail;
                    const input = autoCompleteJS_04.input;
                    // Trim selected Value
                    const selection = feedback.selection.value.trim();
                    // Split query into array and trim each value
                    const query = input.value.split(",").map(item => item.trim());
                    // Remove last query
                    query.pop();
                    // Add selected value
                    query.push(selection);
                    // Replace Input value with the new query
                    input.value = query.join(", ") + ", ";
                }
            }
        }
    });
    
    let history = [];
    
    const autoCompleteJS_05 = new autoComplete({
        selector: "#autoComplete_05",
        placeHolder,
        data,
        resultsList: {
            element(list) {
                const recentSearch = history.reverse();
                const historyLength = recentSearch.length;

                if(historyLength) {
                    const historyBlock = document.createElement("div");
                    historyBlock.setAttribute("style", "display: flex; flex-direction: column; margin: .3rem; padding: .3rem .5rem;");
                    historyBlock.innerHTML = "Recent Searches";

                    recentSearch.slice(0, 2).forEach((item) => {
                        const recentItem = document.createElement("span");
                        recentItem.setAttribute("style", "display: flex; margin: .2rem; color: rgba(0, 0, 0, .2);");
                        recentItem.innerHTML = item;
                        historyBlock.append(recentItem);
                    });

                    const separator = document.createElement("hr");
                    separator.setAttribute("style", "margin: 5px 0 0 0;");
                    historyBlock.append(separator);

                    list.prepend(historyBlock);
                }
            },
        },
        resultItem,
        events: {
            input: {
                selection(event) {
                    const feedback = event.detail;
                    const input = autoCompleteJS_05.input;
                    // Get selected Value
                    const selection = feedback.selection.value;
                    // Add selected value to "history" array
                    history.push(selection);
                    
                    autoCompleteJS_05.input.value = selection;
                }
            }
        }
    });

    const autoCompleteJS_06 = new autoComplete({
        selector: "#autoComplete_06",
        placeHolder,
        data: {
            ...data,
            filter(list) {
                const results = list.filter((item) => {
                    const inputValue = document.querySelector("#autoComplete_06").value.toLowerCase();
                    const itemValue = item.value.toLowerCase();

                    if (itemValue.startsWith(inputValue)) {
                        return item.value;
                    }
                });

                return results;
            }
        },
        resultsList,
        resultItem,
        events: {
            input: {
                selection(event) {
                    const selection = event.detail.selection.value;
                    autoCompleteJS_06.input.value = selection;
                }
            }
        }
    });

    const autoCompleteJS_07 = new autoComplete({
        selector: "#autoComplete_07",
        placeHolder,
        data,
        threshold: 0,
        resultsList: {
            maxResults: undefined
        },
        resultItem,
        events: {
            input: {
                focus (event) {
                    autoCompleteJS_07.start();
                },
                selection (event) {
                    const selection = event.detail.selection.value;
                    autoCompleteJS_07.input.value = selection;
                }
            },
        },
    });
</script>
