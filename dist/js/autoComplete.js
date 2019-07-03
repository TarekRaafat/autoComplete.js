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

  var dataAttribute = "data-result";
  var select = {
    resultsList: "autoComplete_results_list",
    result: "autoComplete_result",
    highlight: "autoComplete_highlighted"
  };
  var getInput = function getInput(selector) {
    return typeof selector === "string" ? document.querySelector(selector) : selector();
  };
  var createResultsList = function createResultsList(renderResults) {
    var resultsList = document.createElement(renderResults.element);
    resultsList.setAttribute("id", select.resultsList);
    if (renderResults.container) {
      renderResults.container(resultsList);
    }
    renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
    return resultsList;
  };
  var highlight = function highlight(value) {
    return "<span class=".concat(select.highlight, ">").concat(value, "</span>");
  };
  var addResultsToList = function addResultsToList(resultsList, dataSrc, resultItem) {
    dataSrc.forEach(function (event, record) {
      var result = document.createElement(resultItem.element);
      var resultValue = dataSrc[record].value[event.key] || dataSrc[record].value;
      result.setAttribute(dataAttribute, resultValue);
      result.setAttribute("class", select.result);
      result.setAttribute("tabindex", "1");
      resultItem.content ? resultItem.content(event, result) : result.innerHTML = event.match || event;
      resultsList.appendChild(result);
    });
  };
  var navigation = function navigation(selector, resultsList) {
    var input = getInput(selector);
    var first = resultsList.firstChild;
    document.onkeydown = function (event) {
      var active = document.activeElement;
      switch (event.keyCode) {
        case 38:
          if (active !== first && active !== input) {
            active.previousSibling.focus();
          } else if (active === first) {
            input.focus();
          }
          break;
        case 40:
          if (active === input && resultsList.childNodes.length > 0) {
            first.focus();
          } else if (active !== resultsList.lastChild) {
            active.nextSibling.focus();
          }
          break;
      }
    };
  };
  var clearResults = function clearResults(resultsList) {
    return resultsList.innerHTML = "";
  };
  var getSelection = function getSelection(field, resultsList, callback, resultsValues) {
    var results = resultsList.querySelectorAll(".".concat(select.result));
    Object.keys(results).forEach(function (selection) {
      ["mousedown", "keydown"].forEach(function (eventType) {
        results[selection].addEventListener(eventType, function (event) {
          if (eventType === "mousedown" || event.keyCode === 13 || event.keyCode === 39) {
            callback({
              event: event,
              query: getInput(field) instanceof HTMLInputElement ? getInput(field).value : getInput(field).innerHTML,
              matches: resultsValues.matches,
              results: resultsValues.list.map(function (record) {
                return record.value;
              }),
              selection: resultsValues.list.find(function (value) {
                var resValue = value.value[value.key] || value.value;
                return resValue === event.target.closest(".".concat(select.result)).getAttribute(dataAttribute);
              })
            });
            clearResults(resultsList);
          }
        });
      });
    });
  };
  var autoCompleteView = {
    getInput: getInput,
    createResultsList: createResultsList,
    highlight: highlight,
    addResultsToList: addResultsToList,
    navigation: navigation,
    clearResults: clearResults,
    getSelection: getSelection
  };

  var CustomEventPolyfill = function CustomEventPolyfill(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };
  CustomEventPolyfill.prototype = window.Event.prototype;
  var CustomEventWrapper = typeof window.CustomEvent === "function" && window.CustomEvent || CustomEventPolyfill;
  var initElementClosestPolyfill = function initElementClosestPolyfill() {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (s) {
        var el = this;
        do {
          if (el.matches(s)) {
            return el;
          }
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
      };
    }
  };
  var Polyfill = {
    CustomEventWrapper: CustomEventWrapper,
    initElementClosestPolyfill: initElementClosestPolyfill
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
        key: config.data.key,
        cache: typeof config.data.cache === "undefined" ? true : config.data.cache
      };
      this.query = config.query;
      this.searchEngine = config.searchEngine === "loose" ? "loose" : "strict";
      this.customEngine = config.customEngine ? config.customEngine : false;
      this.threshold = config.threshold || 0;
      this.debounce = config.debounce || 0;
      this.resultsList = {
        render: config.resultsList && config.resultsList.render ? config.resultsList.render : false,
        view: config.resultsList && config.resultsList.render ? autoCompleteView.createResultsList({
          container:
          config.resultsList && config.resultsList.container ?
          config.resultsList.container :
          false,
          destination:
          config.resultsList && config.resultsList.destination ?
          config.resultsList.destination :
          autoCompleteView.getInput(this.selector),
          position:
          config.resultsList && config.resultsList.position ?
          config.resultsList.position :
          "afterend",
          element: config.resultsList && config.resultsList.element ? config.resultsList.element : "ul"
        }) : null
      };
      this.sort = config.sort || false;
      this.placeHolder = config.placeHolder;
      this.maxResults = config.maxResults || 5;
      this.resultItem = {
        content: config.resultItem && config.resultItem.content ? config.resultItem.content : false,
        element: config.resultItem && config.resultItem.element ? config.resultItem.element : "li"
      };
      this.noResults = config.noResults;
      this.highlight = config.highlight || false;
      this.onSelection = config.onSelection;
      this.dataSrc;
      this.init();
    }
    _createClass(autoComplete, [{
      key: "search",
      value: function search(query, record) {
        var recordLowerCase = record.toLowerCase();
        if (this.searchEngine === "loose") {
          query = query.replace(/ /g, "");
          var match = [];
          var searchPosition = 0;
          for (var number = 0; number < recordLowerCase.length; number++) {
            var recordChar = record[number];
            if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
              recordChar = this.highlight ? autoCompleteView.highlight(recordChar) : recordChar;
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
            var pattern = new RegExp("".concat(query), "i");
            query = pattern.exec(record);
            return this.highlight ? record.replace(query, autoCompleteView.highlight(query)) : record;
          }
        }
      }
    }, {
      key: "listMatchedResults",
      value: function listMatchedResults(data) {
        var _this = this;
        return new Promise(function (resolve) {
          var resList = [];
          data.filter(function (record, index) {
            var search = function search(key) {
              var match = _this.customEngine ? _this.customEngine(_this.queryValue, record[key] || record) : _this.search(_this.queryValue, record[key] || record);
              if (match && key) {
                resList.push({
                  key: key,
                  index: index,
                  match: match,
                  value: record
                });
              } else if (match && !key) {
                resList.push({
                  index: index,
                  match: match,
                  value: record
                });
              }
            };
            if (_this.data.key) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;
              try {
                for (var _iterator = _this.data.key[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var key = _step.value;
                  search(key);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            } else {
              search();
            }
          });
          var list = _this.sort ? resList.sort(_this.sort).slice(0, _this.maxResults) : resList.slice(0, _this.maxResults);
          if (_this.resultsList.render) {
            autoCompleteView.addResultsToList(_this.resultsList.view, list, _this.resultItem);
            autoCompleteView.navigation(_this.selector, _this.resultsList.view);
          }
          return resolve({
            matches: resList.length,
            list: list
          });
        });
      }
    }, {
      key: "ignite",
      value: function ignite() {
        var _this2 = this;
        var input = autoCompleteView.getInput(this.selector);
        if (this.placeHolder) {
          input.setAttribute("placeholder", this.placeHolder);
        }
        var debounce = function debounce(func, delay) {
          var inDebounce;
          return function () {
            var context = this;
            var args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(function () {
              return func.apply(context, args);
            }, delay);
          };
        };
        var exec = function exec(event) {
          var inputValue = input instanceof HTMLInputElement ? input.value.toLowerCase() : input.innerHTML.toLowerCase();
          var queryValue = _this2.queryValue = _this2.query && _this2.query.manipulate ? _this2.query.manipulate(inputValue) : inputValue;
          var renderResultsList = _this2.resultsList.render;
          var triggerCondition = queryValue.length > _this2.threshold && queryValue.replace(/ /g, "").length;
          var eventEmitter = function eventEmitter(event, results) {
            input.dispatchEvent(new Polyfill.CustomEventWrapper("autoComplete", {
              bubbles: true,
              detail: {
                event: event,
                input: inputValue,
                query: queryValue,
                matches: results ? results.matches : null,
                results: results ? results.list : null
              },
              cancelable: true
            }));
          };
          if (renderResultsList) {
            var onSelection = _this2.onSelection;
            var resultsList = _this2.resultsList.view;
            var clearResults = autoCompleteView.clearResults(resultsList);
            if (triggerCondition) {
              _this2.listMatchedResults(_this2.dataSrc).then(function (list) {
                eventEmitter(event, list);
                if (list.list.length === 0 && _this2.noResults && _this2.resultsList.render) {
                  _this2.noResults();
                } else {
                  if (onSelection) {
                    autoCompleteView.getSelection(_this2.selector, resultsList, onSelection, list);
                  }
                }
              });
            } else {
              eventEmitter(event);
            }
          } else if (!renderResultsList && triggerCondition) {
            _this2.listMatchedResults(_this2.dataSrc).then(function (list) {
              eventEmitter(event, list);
            });
          } else {
            eventEmitter(event);
          }
        };
        input.addEventListener("keyup", debounce(function (event) {
          if (!_this2.data.cache) {
            var data = _this2.data.src();
            if (data instanceof Promise) {
              data.then(function (response) {
                _this2.dataSrc = response;
                exec(event);
              });
            } else {
              _this2.dataSrc = data;
              exec(event);
            }
          } else {
            exec(event);
          }
        }, this.debounce));
      }
    }, {
      key: "init",
      value: function init() {
        var _this3 = this;
        var dataSrc = this.data.src();
        if (dataSrc instanceof Promise) {
          dataSrc.then(function (response) {
            _this3.dataSrc = response;
            _this3.ignite();
          });
        } else {
          this.dataSrc = dataSrc;
          this.ignite();
        }
        Polyfill.initElementClosestPolyfill();
      }
    }]);
    return autoComplete;
  }();

  return autoComplete;

})));
