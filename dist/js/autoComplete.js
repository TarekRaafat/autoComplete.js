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

  var resultsList;
  var getInput = function getInput(selector) {
    return typeof selector === "string" ? document.querySelector(selector) : selector();
  };
  var createResultsList = function createResultsList(renderResults) {
    resultsList = document.createElement("ul");
    resultsList.setAttribute("id", "autoComplete_results_list");
    renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
  };
  var highlight = function highlight(value) {
    return "<span class=\"autoComplete_highlighted\">".concat(value, "</span>");
  };
  var addResultsToList = function addResultsToList(dataSrc, dataKey) {
    dataSrc.forEach(function (event, record) {
      var result = document.createElement("li");
      var resultValue = dataSrc[record].source[dataKey] || dataSrc[record].source;
      result.setAttribute("autoComplete-data", resultValue);
      result.setAttribute("class", "autoComplete_result");
      result.innerHTML = dataSrc[record].match || dataSrc[record];
      resultsList.appendChild(result);
    });
  };
  var clearResults = function clearResults() {
    return resultsList.innerHTML = "";
  };
  var getSelection = function getSelection(field, callback, resultsValues, dataKey) {
    var results = resultsList.querySelectorAll(".autoComplete_result");
    results.forEach(function (selection) {
      selection.addEventListener("mousedown", function (event) {
        callback({
          query: getInput(field).value,
          results: resultsValues.map(function (record) {
            return record.source;
          }),
          selection: resultsValues.find(function (value) {
            var resValue = value.source[dataKey] || value.source;
            return resValue === event.target.closest(".autoComplete_result").getAttribute("autoComplete-data");
          }).source
        });
        clearResults();
      });
    });
  };
  var autoCompleteView = {
    getInput: getInput,
    createResultsList: createResultsList,
    highlight: highlight,
    addResultsToList: addResultsToList,
    getSelection: getSelection,
    clearResults: clearResults
  };

  var autoComplete =
  function () {
    function autoComplete(config) {
      _classCallCheck(this, autoComplete);
      this.selector = config.selector || "#autoComplete";
      this.data = {
        src: function src() {
          return typeof config.data.src === "function" ? config.data.src() : config.data.src;
        },
        key: config.data.key
      };
      this.searchEngine = config.searchEngine === "loose" ? "loose" : "strict";
      this.threshold = config.threshold || 0;
      this.renderResults = autoCompleteView.createResultsList({
        destination: config.renderResults ? config.renderResults.destination : autoCompleteView.getInput(this.selector),
        position: config.renderResults ? config.renderResults.position : "afterend"
      });
      this.placeHolder = config.placeHolder || "";
      this.maxResults = config.maxResults || 5;
      this.highlight = config.highlight || false;
      this.onSelection = config.onSelection;
      this.init();
    }
    _createClass(autoComplete, [{
      key: "search",
      value: function search(query, record) {
        var highlight = this.highlight;
        var recordLowerCase = record.toLowerCase();
        if (this.searchEngine === "loose") {
          query = query.replace(/ /g, "");
          var match = [];
          var searchPosition = 0;
          for (var number = 0; number < recordLowerCase.length; number++) {
            var recordChar = recordLowerCase[number];
            if (searchPosition < query.length && recordChar === query[searchPosition]) {
              recordChar = highlight ? autoCompleteView.highlight(recordChar) : recordChar;
              searchPosition++;
            }
            match.push(recordChar);
          }
          if (searchPosition !== query.length) {
            return false;
          }
          return match.join("");
        } else {
          if (recordLowerCase.includes(query)) {
            if (highlight) {
              var inputValue = autoCompleteView.getInput(this.selector).value.toLowerCase();
              return recordLowerCase.replace(inputValue, autoCompleteView.highlight(inputValue));
            }
          }
        }
      }
    }, {
      key: "listMatchedResults",
      value: function listMatchedResults(data) {
        var _this = this;
        var resList = [];
        var inputValue = autoCompleteView.getInput(this.selector).value.toLowerCase();
        data.filter(function (record) {
          var match = _this.search(inputValue, record[_this.data.key] || record);
          if (match) {
            resList.push({
              match: match,
              source: record
            });
          }
        });
        var list = resList.slice(0, this.maxResults);
        autoCompleteView.addResultsToList(list, this.data.key);
        return list;
      }
    }, {
      key: "ignite",
      value: function ignite(data) {
        var _this2 = this;
        var selector = this.selector;
        var onSelection = this.onSelection;
        autoCompleteView.getInput(selector).setAttribute("placeholder", this.placeHolder);
        var input = autoCompleteView.getInput(selector);
        input.addEventListener("keyup", function () {
          var clearResults = autoCompleteView.clearResults();
          if (input.value.length > _this2.threshold && input.value.replace(/ /g, "").length) {
            var list = _this2.listMatchedResults(data);
            if (onSelection) {
              autoCompleteView.getSelection(selector, onSelection, list, _this2.data.key);
            }
          }
        });
      }
    }, {
      key: "init",
      value: function init() {
        var _this3 = this;
        var dataSrc = this.data.src();
        if (dataSrc instanceof Promise) {
          dataSrc.then(function (data) {
            return _this3.ignite(data);
          });
        } else {
          this.ignite(dataSrc);
        }
      }
    }]);
    return autoComplete;
  }();

  return autoComplete;

})));
