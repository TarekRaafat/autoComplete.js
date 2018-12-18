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
  var createResultsList = function createResultsList(renderResults) {
    var list = document.createElement("ul");
    list.setAttribute("id", "autoComplete_results_list");
    renderResults.destination.insertAdjacentElement(renderResults.position, list);
  };
  var addResultsToList = function addResultsToList(results, cleanResults, dataAttribute) {
    var resultsList = document.querySelector("#autoComplete_results_list");
    results.forEach(function (event, record) {
      var result = document.createElement("li");
      result.setAttribute("data-".concat(dataAttribute.tag), dataAttribute.value || cleanResults[record]);
      result.setAttribute("id", cleanResults[record]);
      result.setAttribute("class", "autoComplete_result");
      result.innerHTML = results[record];
      resultsList.appendChild(result);
    });
  };
  var clearInput = function clearInput() {
    return getSearchInput().value = "";
  };
  var clearResults = function clearResults() {
    var resultsList = document.querySelector("#autoComplete_results_list");
    resultsList.innerHTML = "";
  };
  var getSelection = function getSelection(value) {
    var results = document.querySelectorAll(".autoComplete_result");
    results.forEach(function (selection) {
      selection.addEventListener("click", function (event) {
        value(event.target.closest(".autoComplete_result"));
        clearInput();
        clearResults();
        getSearchInput().setAttribute("placeholder", "".concat(event.target.closest(".autoComplete_result").id));
      });
    });
  };
  var error = function error(_error) {
    document.querySelector("body").innerHTML = "\n\t\t<div class=\"autoComplete_error\">\n\t\t\t<div class=\"autoComplete_message\"><strong>Error</strong>, ".concat(_error, "</div>\n\t\t</div>\n\t");
  };
  var renderResults = {
    getSearchInput: getSearchInput,
    createResultsList: createResultsList,
    addResultsToList: addResultsToList,
    getSelection: getSelection,
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
        }
      };
      this.searchEngine = config.searchEngine === "loose" ? "loose" : "strict";
      this.renderResults = renderResults.createResultsList(config.renderResults ? {
        destination: config.renderResults.destination,
        position: config.renderResults.position
      } : {
        destination: renderResults.getSearchInput(),
        position: "afterend"
      });
      this.placeHolder = String(config.placeHolder) ? config.placeHolder : false;
      this.maxResults = Number(config.maxResults) ? config.maxResults : 10;
      this.highlight = config.highlight === true ? true : false;
      this.dataAttribute = config.dataAttribute === Object ? {
        tag: config.dataAttribute.tag,
        value: config.dataAttribute.value
      } : {
        tag: "autocomplete",
        value: ""
      };
      this.onSelection = config.onSelection;
      this.init();
    }
    _createClass(autoComplete, [{
      key: "search",
      value: function search(query, record) {
        if (this.searchEngine === "loose") {
          query = query.replace(/ /g, "").toLowerCase();
          var match = [];
          var searchPosition = 0;
          for (var number = 0; number < record.length; number++) {
            var recordChar = record[number];
            if (searchPosition < query.length && recordChar.toLowerCase() === query[searchPosition]) {
              if (this.highlight) {
                recordChar = "<span class=\"autoComplete_highlighted_result\">".concat(recordChar, "</span>");
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
        } else {
          if (record.toLowerCase().includes(query.toLowerCase())) {
            if (this.highlight) {
              this.resList.push(record.toLowerCase().replace(renderResults.getSearchInput().value.toLowerCase(), "<span class=\"autoComplete_highlighted_result\">".concat(renderResults.getSearchInput().value.toLowerCase(), "</span>")));
              this.cleanResList.push(record);
            } else {
              this.resList.push(record);
              this.cleanResList.push(record);
            }
          }
        }
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
          renderResults.error("data source is not an Array");
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
            if (_this2.onSelection) {
              renderResults.getSelection(_this2.onSelection);
            }
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
          renderResults.error(error);
        }
      }
    }]);
    return autoComplete;
  }();

  return autoComplete;

})));
