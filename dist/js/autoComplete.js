(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.autoComplete = factory());
}(this, (function () { 'use strict';

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

  var getSearchInput = function getSearchInput() {
    return document.querySelector("#autoComplete");
  };
  var createResultsList = function createResultsList(listContainer) {
    var list = document.createElement("ul");
    list.setAttribute("class", "autoComplete_results_list");
    listContainer.appendChild(list);
  };
  var createResultsListContainer = function createResultsListContainer() {
    var listContainer = document.createElement("div");
    listContainer.setAttribute("class", "autoComplete_results_list_container");
    getSearchInput().insertAdjacentElement("afterend", listContainer);
    createResultsList(listContainer);
  };
  createResultsListContainer();
  var addResultsToList = function addResultsToList(results, cleanResults, dataAttribute) {
    var resultState;
    var resultsList = document.querySelector(".autoComplete_results_list");
    results.forEach(function (event, record) {
      var result = document.createElement("li");
      result.setAttribute("data-".concat(dataAttribute.tag), dataAttribute.value || cleanResults[record]);
      resultState = results.length === 1 ? "autoComplete_result autoComplete_single_result" : "autoComplete_result";
      result.setAttribute("id", cleanResults[record]);
      result.setAttribute("class", resultState);
      result.innerHTML = results[record];
      resultsList.appendChild(result);
    });
  };
  ["focus", "blur"].forEach(function (eventType) {
    var result = document.querySelector(".autoComplete_results_list");
    getSearchInput().addEventListener(eventType, function () {
      if (eventType === "blur") {
        result.style = "opacity: 0; visibility: hidden;";
      } else {
        result.style = "opacity: 1; visibility: visible;";
      }
    });
  });
  var clearInput = function clearInput() {
    return getSearchInput().value = "";
  };
  var clearResults = function clearResults() {
    var resultsList = document.querySelector(".autoComplete_results_list");
    resultsList.innerHTML = "";
  };
  var getSelection = function getSelection(value, maxLength) {
    var results = document.querySelectorAll(".autoComplete_result");
    results.forEach(function (selection) {
      selection.addEventListener("click", function (event) {
        value(event.target.closest(".autoComplete_result"));
        clearInput();
        clearResults();
        getSearchInput().setAttribute("placeholder", "".concat(event.target.closest(".autoComplete_result").id.length > maxLength ? event.target.closest(".autoComplete_result").id.slice(0, maxLength) + "..." : event.target.closest(".autoComplete_result").id));
      });
    });
  };
  var error = function error(_error) {
    document.querySelector("body").innerHTML = "\n\t\t<div class=\"autoComplete_error\">\n\t\t\t<div class=\"autoComplete_message\">".concat(_error, "</div>\n\t\t</div>\n\t");
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
  function () {
    function autoComplete(config) {
      _classCallCheck(this, autoComplete);
      this.dataSrc = function () {
        if (Array.isArray(config.dataSrc)) {
          return config.dataSrc;
        } else if (Array.isArray(config.dataSrc())) {
          return config.dataSrc();
        } else {
          renderResults.error("<strong>Error</strong>, <strong>data source</strong> value is not an <strong>Array</string>.");
        }
      };
      this.placeHolder = String(config.placeHolder) ? config.placeHolder : false;
      this.placeHolderLength = Number(config.placeHolderLength) ? config.placeHolderLength : Infinity;
      this.maxResults = Number(config.maxResults) ? config.maxResults : 10;
      this.highlight = typeof config.highlight === "boolean" ? config.highlight : true;
      this.dataAttribute = config.dataAttribute === Object ? {
        tag: config.dataAttribute.tag,
        value: config.dataAttribute.value
      } : {
        tag: "autocomplete",
        value: ""
      };
      this.onSelection = typeof config.onSelection === "function" ? config.onSelection : renderResults.error("<strong>Error</strong>, <strong>onSelection</strong> value is not a <strong>Function</string>.");
      this.init();
    }
    _createClass(autoComplete, [{
      key: "search",
      value: function search(query, record) {
        query = query.replace(/ /g, "").toLowerCase();
        var match = [];
        var searchPosition = 0;
        for (var number = 0; number < record.length; number++) {
          var recordChar = record[number];
          if (searchPosition < query.length && recordChar.toLowerCase() === query[searchPosition]) {
            if (this.highlight) {
              recordChar = "<span class=\"autoComplete_highlighted_result\">" + recordChar + "</span>";
              searchPosition++;
            } else {
              searchPosition++;
            }
          }
          match.push(recordChar);
        }
        if (searchPosition !== query.length) {
          return "";
        }
        return match.join("");
      }
    }, {
      key: "listMatchedResults",
      value: function listMatchedResults() {
        var _this = this;
        this.resList = [];
        this.cleanResList = [];
        var inputValue = renderResults.getSearchInput().value;
        try {
          this.dataSrc().filter(function (record) {
            var match = _this.search(inputValue, record);
            if (match) {
              _this.resList.push(match);
              _this.cleanResList.push(record);
            }
          });
        } catch (error) {
          renderResults.error(error);
        }
        renderResults.addResultsToList(this.resList.slice(0, this.maxResults), this.cleanResList.slice(0, this.maxResults), this.dataAttribute);
      }
    }, {
      key: "searchInputValidation",
      value: function searchInputValidation(selector) {
        var _this2 = this;
        selector.addEventListener("keyup", function () {
          if (selector.value.length > 0 && selector.value !== " ") {
            renderResults.clearResults();
            _this2.listMatchedResults();
            renderResults.getSelection(_this2.onSelection, _this2.placeHolderLength);
          } else {
            renderResults.clearResults();
          }
        });
      }
    }, {
      key: "setPlaceHolder",
      value: function setPlaceHolder() {
        if (this.placeHolder) {
          renderResults.getSearchInput().setAttribute("placeholder", this.placeHolder);
        }
      }
    }, {
      key: "init",
      value: function init() {
        try {
          if (this.dataSrc()) {
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
