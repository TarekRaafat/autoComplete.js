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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var search = (function (query, data, config) {
    var searchResults = {
      render: [],
      raw: []
    };
    for (var index = 0; index < data.length; index++) {
      var record = data[index];
      var recordLowerCase = record.toLowerCase();
      if (config.searchEngine === "loose") {
        query = query.replace(/ /g, "");
        var match = [];
        var searchPosition = 0;
        for (var number = 0; number < recordLowerCase.length; number++) {
          var recordChar = record[number];
          if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
            recordChar = config.highlight ? "<span class=\"autoComplete_highlighted\">".concat(recordChar, "</span>") : recordChar;
            searchPosition++;
          }
          match.push(recordChar);
        }
        if (searchPosition === query.length) {
          searchResults.render.push(match.join(""));
          searchResults.raw.push(record);
        }
      } else {
        if (recordLowerCase.includes(query)) {
          var pattern = new RegExp("".concat(query), "i");
          query = pattern.exec(record);
          var _match = config.highlight ? record.replace(query, "<span class=\"autoComplete_highlighted\">".concat(query, "</span>")) : record;
          searchResults.render.push(_match);
          searchResults.raw.push(record);
        }
      }
    }
    return searchResults;
  });

  var createList = (function (to) {
    var list = document.createElement("div");
    list.setAttribute("id", "autoComplete_list");
    list.setAttribute("class", "autoComplete_list");
    to.parentNode.appendChild(list);
    return list;
  });

  var createItem = (function (itemValue) {
    var result = document.createElement("div");
    result.setAttribute("class", "autoComplete_result");
    result.innerHTML = itemValue;
    return result;
  });

  var onSelection = (function (event, query, results, feedback) {
    feedback({
      event: event,
      query: query,
      results: results
    });
  });

  var closeAllLists = function closeAllLists(element, inputField) {
    var list = document.getElementsByClassName("autoComplete_list");
    for (var index = 0; index < list.length; index++) {
      if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
    }
  };
  var generateList = function generateList(data, event, feedback) {
    var inputValue = event.target.value;
    var list = createList(event.target);
    for (var index = 0; index < data.render.length; index++) {
      var result = data.render[index];
      var resultItem = createItem(result);
      resultItem.addEventListener("click", function (event) {
        onSelection(event, inputValue, data.raw, feedback);
      });
      list.appendChild(resultItem);
    }
  };

  var currentFocus;
  var removeActive = function removeActive(list) {
    for (var index = 0; index < list.length; index++) {
      list[index].classList.remove("autoComplete_selected");
    }
  };
  var addActive = function addActive(list) {
    if (!list) return false;
    removeActive(list);
    if (currentFocus >= list.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = list.length - 1;
    list[currentFocus].classList.add("autoComplete_selected");
  };
  var navigation = function navigation(event) {
    var list = document.getElementById("autoComplete_list");
    if (list) list = list.getElementsByTagName("div");
    if (event.keyCode === 40) {
      currentFocus++;
      addActive(list);
    } else if (event.keyCode === 38) {
      event.preventDefault();
      currentFocus--;
      addActive(list);
    } else if (event.keyCode === 13) {
      event.preventDefault();
      if (currentFocus > -1) {
        if (list) list[currentFocus].click();
      }
    }
  };
  var navigate = function navigate(inputField) {
    currentFocus = -1;
    inputField.addEventListener("keydown", navigation);
  };

  var prepareData = function prepareData(request, callback) {
    Promise.resolve(request).then(function (data) {
      callback(data);
    });
  };
  var getInputValue = function getInputValue(inputField) {
    return inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement ? inputField.value.toLowerCase() : inputField.innerHTML.toLowerCase();
  };
  var prepareQueryValue = function prepareQueryValue(query, inputValue) {
    return query && query.manipulate ? query.manipulate(inputValue) : inputValue;
  };
  var checkTriggerCondition = function checkTriggerCondition(trigger, queryValue, threshold) {
    return trigger.condition ? trigger.condition(queryValue) : queryValue.length >= threshold && queryValue.replace(/ /g, "").length;
  };

  var debouncer = (function (func, delay) {
    var inDebounce;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function () {
        return func.apply(context, args);
      }, delay);
    };
  });

  var eventEmitter = (function (target, detail, name) {
    target.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: detail,
      cancelable: true
    }));
  });

  var autoComplete = function () {
    function autoComplete(config) {
      _classCallCheck(this, autoComplete);
      var _config$selector = config.selector,
          selector = _config$selector === void 0 ? "#autoComplete" : _config$selector,
          _config$data = config.data,
          _src = _config$data.src,
          key = _config$data.key,
          _config$data$cache = _config$data.cache,
          cache = _config$data$cache === void 0 ? true : _config$data$cache,
          query = config.query,
          _config$trigger = config.trigger;
      _config$trigger = _config$trigger === void 0 ? {} : _config$trigger;
      var _config$trigger$event = _config$trigger.event,
          event = _config$trigger$event === void 0 ? ["input"] : _config$trigger$event,
          _config$trigger$condi = _config$trigger.condition,
          condition = _config$trigger$condi === void 0 ? false : _config$trigger$condi,
          _config$searchEngine = config.searchEngine,
          searchEngine = _config$searchEngine === void 0 ? "strict" : _config$searchEngine,
          _config$threshold = config.threshold,
          threshold = _config$threshold === void 0 ? 0 : _config$threshold,
          _config$debounce = config.debounce,
          debounce = _config$debounce === void 0 ? 0 : _config$debounce,
          _config$resultsList = config.resultsList;
      _config$resultsList = _config$resultsList === void 0 ? {} : _config$resultsList;
      var _config$resultsList$r = _config$resultsList.render,
          render = _config$resultsList$r === void 0 ? true : _config$resultsList$r,
          _config$resultsList$c = _config$resultsList.container,
          container = _config$resultsList$c === void 0 ? false : _config$resultsList$c,
          destination = _config$resultsList.destination,
          _config$resultsList$p = _config$resultsList.position,
          position = _config$resultsList$p === void 0 ? "afterend" : _config$resultsList$p,
          _config$resultsList$e = _config$resultsList.element,
          resultsListElement = _config$resultsList$e === void 0 ? "ul" : _config$resultsList$e,
          _config$resultsList$n = _config$resultsList.navigation,
          navigation = _config$resultsList$n === void 0 ? false : _config$resultsList$n,
          _config$sort = config.sort,
          sort = _config$sort === void 0 ? false : _config$sort,
          placeHolder = config.placeHolder,
          _config$maxResults = config.maxResults,
          maxResults = _config$maxResults === void 0 ? 5 : _config$maxResults,
          _config$resultItem = config.resultItem;
      _config$resultItem = _config$resultItem === void 0 ? {} : _config$resultItem;
      var _config$resultItem$co = _config$resultItem.content,
          content = _config$resultItem$co === void 0 ? false : _config$resultItem$co,
          _config$resultItem$el = _config$resultItem.element,
          resultItemElement = _config$resultItem$el === void 0 ? "li" : _config$resultItem$el,
          noResults = config.noResults,
          _config$highlight = config.highlight,
          highlight = _config$highlight === void 0 ? false : _config$highlight,
          onSelection = config.onSelection;
      this.inputField = selector;
      this.data = {
        src: function src() {
          return typeof _src === "function" ? _src() : _src;
        },
        key: key,
        cache: cache
      };
      this.query = query;
      this.trigger = {
        event: event,
        condition: condition
      };
      this.searchEngine = searchEngine;
      this.threshold = threshold;
      this.debounce = debounce;
      this.resultsList = {
        render: render,
        container: container,
        destination: destination || this.inputField,
        position: position,
        element: resultsListElement,
        navigation: navigation
      };
      this.sort = sort;
      this.placeHolder = placeHolder;
      this.maxResults = maxResults;
      this.resultItem = {
        content: content,
        element: resultItemElement
      };
      this.noResults = noResults;
      this.highlight = highlight;
      this.onSelection = onSelection;
      this.preInit();
    }
    _createClass(autoComplete, [{
      key: "run",
      value: function run(event, inputField, data) {
        closeAllLists(false, inputField);
        var inputValue = getInputValue(inputField);
        var queryValue = prepareQueryValue(this.query, inputValue);
        var triggerCondition = checkTriggerCondition(this.trigger, queryValue, this.threshold);
        if (triggerCondition) {
          var searchResults = search(inputValue, data, {
            searchEngine: this.searchEngine,
            highlight: this.highlight
          });
          eventEmitter(this.inputField, {
            inputValue: inputValue,
            queryValue: queryValue,
            searchResults: searchResults.raw
          }, "autoCompleteJS_input");
          if (this.resultsList.render) {
            if (!data.length) return this.noResults();
            generateList(searchResults, event, this.onSelection);
            navigate(inputField);
            document.addEventListener("click", function (event) {
              closeAllLists(event.target, inputField);
            });
          }
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;
        if (this.data.cache) {
          debouncer(prepareData(this.data.src(), function (data) {
            if (_this.placeHolder) _this.inputField.setAttribute("placeholder", _this.placeHolder);
            _this.inputField.addEventListener("input", function (event) {
              _this.run(event, _this.inputField, data);
            });
          }), this.debounce);
        } else {
          if (this.placeHolder) this.inputField.setAttribute("placeholder", this.placeHolder);
          this.inputField.addEventListener("input", debouncer(function (event) {
            prepareData(_this.data.src(), function (data) {
              _this.run(event, _this.inputField, data);
            });
          }, this.debounce));
        }
      }
    }, {
      key: "preInit",
      value: function preInit() {
        var _this2 = this;
        var targetNode = document;
        var config = {
          childList: true,
          subtree: true
        };
        var callback = function callback(mutationsList, observer) {
          var _iterator = _createForOfIteratorHelper(mutationsList),
              _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var mutation = _step.value;
              if (document.querySelector(_this2.inputField)) {
                observer.disconnect();
                _this2.inputField = document.querySelector(_this2.inputField);
                eventEmitter(_this2.inputField, {
                  mutation: mutation
                }, "autoCompleteJS_connect");
                _this2.init();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        };
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
      }
    }]);
    return autoComplete;
  }();

  return autoComplete;

})));
