(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.autoComplete = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var selectors = {
    input: document.querySelector("#autoComplete")
  };

  var getSearchInput = function getSearchInput() {
    return selectors.input;
  }; // Creats the results list HTML tag


  var createResultsList = function createResultsList(listContainer) {
    var list = document.createElement("ul");
    list.setAttribute("class", "autoComplete_results_list");
    listContainer.appendChild(list);
  }; // Creates results list container


  var createResultsListContainer = function createResultsListContainer() {
    var listContainer = document.createElement("div");
    listContainer.setAttribute("class", "autoComplete_results_list_container");
    selectors.input.insertAdjacentElement("afterend", listContainer);
    createResultsList(listContainer);
  };

  createResultsListContainer(); // Adding matching results to the list

  var addResultsToList = function addResultsToList(results, cleanResults, dataAttribute) {
    var resState;
    var resList = document.querySelector(".autoComplete_results_list");
    results.forEach(function (event, record) {
      var result = document.createElement("li");
      result.setAttribute("data-".concat(dataAttribute.tag), dataAttribute.value || cleanResults[record]);
      result.setAttribute("tabindex", record + 1);

      if (results.length === 1) {
        resState = "autoComplete_result autoComplete_single_result";
      } else {
        resState = "autoComplete_result";
      }

      result.setAttribute("id", cleanResults[record]);
      result.setAttribute("class", resState);
      result.innerHTML = results[record];
      resList.appendChild(result);
    });
  }; // Clears user input


  var clearInput = function clearInput() {
    return selectors.input.value = "";
  }; // Clears the list of results


  var clearResults = function clearResults() {
    var resList = document.querySelector(".autoComplete_results_list");
    resList.innerHTML = "";
  }; // Toggle event for search input
  // showing & hidding results list onfocus / blur


  ["focus", "blur"].forEach(function (eventType) {
    var result = document.querySelector(".autoComplete_results_list");
    selectors.input.addEventListener(eventType, function () {
      if (eventType === "blur") {
        result.style = "opacity: 0; visibility: hidden;";
      } else {
        result.style = "opacity: 1; visibility: visible;";
      }
    });
  }); // Gets user selection

  var getSelection = function getSelection(value) {
    var results = document.querySelectorAll(".autoComplete_result");
    results.forEach(function (selection) {
      selection.addEventListener("click", function (event) {
        // value(event.target.closest(".autoComplete_result"));
        value(event.target.closest(".autoComplete_result")); // Clear Input after selection is made

        clearInput(); //Clear Results after selection is made

        clearResults(); // Set placeholder with the selected value
        // after checking the value length and validate it

        selectors.input.setAttribute("placeholder", "".concat(event.target.closest(".autoComplete_result").id.length > 13 ? event.target.closest(".autoComplete_result").id.slice(0, 13) + "..." : event.target.closest(".autoComplete_result").id));
      });
    });
  }; // Error message render to UI


  var error = function error(_error) {
    document.querySelector("body").innerHTML = "\n\t<div class=\"autoComplete_error\">\n\t\t<div class=\"autoComplete_message\">".concat(_error, "</div>\n\t</div>\n\t");
  };

  var renderResults = {
    getSearchInput: getSearchInput,
    addResultsToList: addResultsToList,
    getSelection: getSelection,
    clearInput: clearInput,
    clearResults: clearResults,
    error: error
  };

  var autoComplete =
  /*#__PURE__*/
  function () {
    function autoComplete(config) {
      _classCallCheck(this, autoComplete);

      // Source of data list
      this.dataSrc = function () {
        if (Array.isArray(config.dataSrc)) {
          return config.dataSrc;
        } else {
          renderResults.error("<strong>Error</strong>, <strong>data source</strong> value is not an <strong>Array</string>.");
        }
      }; // Placeholder text


      this.placeHolder = typeof config.placeHolder === "string" ? config.placeHolder : "Search..."; // Maximum number of results to show

      this.maxNum = typeof config.maxNum === "number" ? config.maxNum : 10; // Highlighting matching results

      this.highlight = typeof config.highlight === "boolean" ? config.highlight : true; // Assign data attribute tag & value if set in object

      this.dataAttribute = _typeof(config.dataAttribute) === "object" && config.dataAttribute.constructor === Object ? {
        tag: config.dataAttribute.tag,
        value: config.dataAttribute.value
      } : {
        tag: "autocomplete",
        value: ""
      }; // Action function on result selection

      this.onSelection = typeof config.onSelection === "function" ? config.onSelection : renderResults.error("<strong>Error</strong>, <strong>onSelection</strong> value is not a <strong>Function</string>."); // Starts the app Enigne

      this.init();
    } // Checks if the data source is valid


    _createClass(autoComplete, [{
      key: "dataSourceValidation",
      value: function dataSourceValidation(value) {
        return Array.isArray(value);
      } // Checks user's input search value validity

    }, {
      key: "searchInputValidation",
      value: function searchInputValidation(selector) {
        var _this = this;

        // Input field handler fires an event onKeyup action
        selector.addEventListener("keyup", function () {
          // event.preventDefault();
          // Check if input is not empty or just have space before triggering the app
          if (selector.value.length > 0 && selector.value !== " ") {
            // clear results list
            renderResults.clearResults(); // List matching results

            _this.listMatchedResults(); // Gets user's selection


            renderResults.getSelection(_this.onSelection);
          } else {
            // clears all results list
            renderResults.clearResults();
          }
        });
      } // Search common characters within record

    }, {
      key: "search",
      value: function search(query, record) {
        // Search query string sanitized & normalized
        query = query.replace(/ /g, "").toLowerCase(); // Array of matching characters

        var match = []; // Query character position based on success

        var searchPosition = 0; // Iterate over record character

        for (var number = 0; number < record.length; number++) {
          // Holds current record character
          var recordChar = record[number]; // Matching case

          if (searchPosition < query.length && recordChar.toLowerCase() === query[searchPosition]) {
            if (this.highlight) {
              // Highlight matching character
              recordChar = "<span class=\"autoComplete_highlighted_result\">" + recordChar + "</span>"; // Increment search position

              searchPosition++;
            } else {

              searchPosition++;
            }
          } // Adds matching character to the matching list


          match.push(recordChar);
        } // Non-Matching case


        if (searchPosition !== query.length) {
          return "";
        } // Return the joined match


        return match.join("");
      } // List all matching results

    }, {
      key: "listMatchedResults",
      value: function listMatchedResults() {
        var _this2 = this;

        // Final highlighted results list of array
        this.resList = []; // Final clean results list of array

        this.cleanResList = []; // Holds the input search value

        var inputValue = renderResults.getSearchInput().value;

        try {
          // Checks input matches in data source
          this.dataSrc().filter(function (record) {
            var match = _this2.search(inputValue, record);

            if (match) {
              _this2.resList.push(match);

              _this2.cleanResList.push(record);
            }
          });
        } catch (error) {
          renderResults.error(error);
        } // Rendering matching results to the UI list


        renderResults.addResultsToList(this.resList.slice(0, this.maxNum), this.cleanResList.slice(0, this.maxNum), this.dataAttribute);
      } // Placeholder setting function

    }, {
      key: "setPlaceHolder",
      value: function setPlaceHolder() {
        selectors.input.setAttribute("placeholder", this.placeHolder);
      } // Starts the app Enigne

    }, {
      key: "init",
      value: function init() {
        try {
          // If the data source is valid run the app else error
          if (this.dataSourceValidation(this.dataSrc())) {
            this.setPlaceHolder();
            this.searchInputValidation(renderResults.getSearchInput());
          }
        } catch (error) {
          renderResults.error("<strong>error</strong>, autoComplete <strong>engine</strong> is not <strong>starting</strong>...");
        }
      }
    }]);

    return autoComplete;
  }();

  return autoComplete;

})));
