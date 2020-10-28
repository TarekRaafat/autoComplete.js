
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.autoCompleteJS = factory());
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

  var inputComponent = (function (inputField, config) {
    inputField.setAttribute("dir", "ltr");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("spellcheck", false);
    inputField.setAttribute("autocorrect", "off");
    inputField.setAttribute("autocomplete", "off");
    inputField.setAttribute("autocapitalize", "off");
    inputField.setAttribute("title", config.inputName);
    inputField.setAttribute("role", "combobox");
    inputField.setAttribute("aria-label", config.inputName);
    inputField.setAttribute("aria-owns", config.listId);
    inputField.setAttribute("aria-haspopup", true);
    inputField.setAttribute("aria-autocomplete", "both");
  });

  var createList = (function (to, config) {
    var list = document.createElement("div");
    list.setAttribute("id", config.listId);
    list.setAttribute("aria-expanded", true);
    list.setAttribute("aria-labelledby", config.listId);
    list.setAttribute("class", config.listClass);
    list.setAttribute("role", "listbox");
    list.setAttribute("tabindex", "-1");
    if (config.container) container(list);
    to.parentNode.appendChild(list);
    return list;
  });

  var createItem = (function (itemValue, rawValue, resultIndex, itemClass, content) {
    var result = document.createElement("div");
    result.setAttribute("id", "".concat(itemClass, "_").concat(resultIndex));
    result.setAttribute("aria-selected", "false");
    result.setAttribute("class", itemClass);
    result.setAttribute("role", "option");
    result.innerHTML = itemValue;
    if (content) content(rawValue, result);
    return result;
  });

  var closeAllLists = function closeAllLists(element, inputField) {
    var list = document.getElementsByClassName("autoComplete_list");
    for (var index = 0; index < list.length; index++) {
      if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
    }
  };
  var generateList = function generateList(data, config, feedback) {
    var list = createList(config.inputField, config);
    var _loop = function _loop(index) {
      var result = data[index].match;
      var resultItem = createItem(result, data[index].value, index, config.itemClass, config.itemContent);
      resultItem.addEventListener("click", function () {
        var onSelectionData = {
          input: config.rawInputValue,
          query: config.queryInputValue,
          results: data,
          selection: data[index].value
        };
        feedback(onSelectionData);
      });
      list.appendChild(resultItem);
    };
    for (var index = 0; index < data.length; index++) {
      _loop(index);
    }
    return list;
  };

  var eventEmitter = (function (target, detail, name) {
    target.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: detail,
      cancelable: true
    }));
  });

  var currentFocus;
  var removeActive = function removeActive(list) {
    for (var index = 0; index < list.length; index++) {
      list[index].setAttribute("aria-selected", "false");
      list[index].classList.remove("autoComplete_selected");
    }
  };
  var addActive = function addActive(list) {
    if (!list) return false;
    removeActive(list);
    if (currentFocus >= list.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = list.length - 1;
    list[currentFocus].setAttribute("aria-selected", "true");
    list[currentFocus].classList.add("autoComplete_selected");
  };
  var navigation = function navigation(event) {
    var list = document.getElementById("autoComplete_list");
    if (list) list = list.getElementsByTagName("div");
    if (event.keyCode === 27) {
      closeAllLists(false, event.target);
    } else if (event.keyCode === 40 || event.keyCode === 9) {
      event.preventDefault();
      currentFocus++;
      addActive(list);
    } else if (event.keyCode === 38 || event.keyCode === 9) {
      event.preventDefault();
      currentFocus--;
      addActive(list);
    } else if (event.keyCode === 13) {
      event.preventDefault();
      if (currentFocus > -1) {
        if (list) list[currentFocus].click();
      }
    }
    eventEmitter(event.srcElement, {
      selection: list[currentFocus],
      event: event
    }, "navigation");
  };
  var navigate = function navigate(inputField, list, customNavigator) {
    currentFocus = -1;
    var navigate = customNavigator || navigation;
    inputField.addEventListener("keydown", navigate);
  };

  var searchEngine = (function (query, record, config) {
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
        return match.join("");
      }
    } else {
      if (recordLowerCase.includes(query)) {
        var pattern = new RegExp("".concat(query), "i");
        query = pattern.exec(record);
        var _match = config.highlight ? record.replace(query, "<span class=\"autoComplete_highlighted\">".concat(query, "</span>")) : record;
        return _match;
      }
    }
  });

  var getInputValue = function getInputValue(inputField) {
    return inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement ? inputField.value.toLowerCase() : inputField.innerHTML.toLowerCase();
  };
  var prepareQueryValue = function prepareQueryValue(inputValue, query) {
    return query && query.manipulate ? query.manipulate(inputValue) : inputValue;
  };
  var checkTriggerCondition = function checkTriggerCondition(trigger, queryValue, threshold) {
    return trigger.condition ? trigger.condition(queryValue) : queryValue.length >= threshold && queryValue.replace(/ /g, "").length;
  };
  var listMatchingResults = function listMatchingResults(query, data, config) {
    var resList = [];
    var _loop = function _loop(index) {
      var record = data[index];
      var search = function search(key) {
        var recordValue = key ? record[key] : record;
        if (recordValue) {
          var match = typeof config.searchEngine === "function" ? config.searchEngine(query, recordValue) : searchEngine(query, recordValue, config);
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
        }
      };
      if (config.key) {
        var _iterator = _createForOfIteratorHelper(config.key),
            _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            search(key);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        search();
      }
    };
    for (var index = 0; index < data.length; index++) {
      _loop(index);
    }
    var list = config.sort ? resList.sort(config.sort).slice(0, config.maxResults) : resList.slice(0, config.maxResults);
    return list;
  };

  var debouncer = (function (callback, delay) {
    var inDebounce;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function () {
        return callback.apply(context, args);
      }, delay);
    };
  });

  var autoCompleteJS = function () {
    function autoCompleteJS(config) {
      _classCallCheck(this, autoCompleteJS);
      var _config$name = config.name,
          name = _config$name === void 0 ? "Search" : _config$name,
          _config$selector = config.selector,
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
          _config$resultsList$i = _config$resultsList.idName,
          resultsListId = _config$resultsList$i === void 0 ? "autoComplete_list" : _config$resultsList$i,
          _config$resultsList$c2 = _config$resultsList.className,
          resultsListClass = _config$resultsList$c2 === void 0 ? "autoComplete_list" : _config$resultsList$c2,
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
          _config$resultItem$id = _config$resultItem.idName,
          resultItemId = _config$resultItem$id === void 0 ? "autoComplete_result" : _config$resultItem$id,
          _config$resultItem$cl = _config$resultItem.className,
          resultItemClass = _config$resultItem$cl === void 0 ? "autoComplete_result" : _config$resultItem$cl,
          noResults = config.noResults,
          _config$highlight = config.highlight,
          highlight = _config$highlight === void 0 ? false : _config$highlight,
          feedback = config.feedback,
          onSelection = config.onSelection;
      this.name = name;
      this.selector = selector;
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
        idName: resultsListId,
        className: resultsListClass,
        navigation: navigation
      };
      this.sort = sort;
      this.placeHolder = placeHolder;
      this.maxResults = maxResults;
      this.resultItem = {
        content: content,
        element: resultItemElement,
        idName: resultItemId,
        className: resultItemClass
      };
      this.noResults = noResults;
      this.highlight = highlight;
      this.feedback = feedback;
      this.onSelection = onSelection;
      this.preInit();
      this.inputField;
    }
    _createClass(autoCompleteJS, [{
      key: "run",
      value: function run(event, inputField, data) {
        closeAllLists(false, inputField);
        var rawInputValue = getInputValue(inputField);
        var queryInputValue = prepareQueryValue(rawInputValue, this.query);
        var triggerCondition = checkTriggerCondition(this.trigger, queryInputValue, this.threshold);
        if (triggerCondition) {
          var searchConfig = {
            searchEngine: this.searchEngine,
            highlight: this.highlight,
            key: this.data.key,
            sort: this.sort,
            maxResults: this.maxResults
          };
          var searchResults = listMatchingResults(queryInputValue, data, searchConfig);
          eventEmitter(inputField, {
            input: rawInputValue,
            query: queryInputValue,
            results: searchResults
          }, "response");
          if (!data.length) return this.noResults();
          var dataFeedback = {
            input: rawInputValue,
            query: queryInputValue,
            results: searchResults
          };
          if (!this.resultsList.render) return this.feedback(event, dataFeedback);
          var listConfig = {
            inputField: inputField,
            rawInputValue: rawInputValue,
            queryInputValue: queryInputValue,
            listId: this.resultsList.idName,
            listClass: this.resultsList.className,
            itemId: this.resultItem.idName,
            itemClass: this.resultItem.className,
            listContainer: this.resultsList.container,
            itemContent: this.resultItem.content
          };
          var list = searchResults.length ? generateList(searchResults, listConfig, this.onSelection) : null;
          eventEmitter(inputField, {
            input: rawInputValue,
            query: queryInputValue,
            results: searchResults
          }, "rendered");
          navigate(inputField, list, this.resultsList.navigation);
          document.addEventListener("click", function (event) {
            return closeAllLists(event.target, inputField);
          });
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;
        return new Promise(function ($return, $error) {
          if (_this.data.cache) {
            var data;
            return _this.data.src().then(function ($await_2) {
              try {
                data = $await_2;
                eventEmitter(_this.inputField, data, "request");
                if (_this.placeHolder) _this.inputField.setAttribute("placeholder", _this.placeHolder);
                _this.exec = debouncer(function (event) {
                  _this.run(event, _this.inputField, data);
                }, _this.debounce);
                return $If_1.call(_this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } else {
            if (_this.placeHolder) _this.inputField.setAttribute("placeholder", _this.placeHolder);
            _this.exec = debouncer(function (event) {
              var data;
              return _this.data.src().then(function ($await_3) {
                try {
                  data = $await_3;
                  eventEmitter(_this.inputField, data, "request");
                  _this.run(event, _this.inputField, data);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }, $error);
            }, _this.debounce);
            return $If_1.call(_this);
          }
          function $If_1() {
            this.inputField.addEventListener("input", this.exec);
            eventEmitter(this.inputField, null, "init");
            return $return();
          }
        });
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
              if (targetNode.querySelector(_this2.selector)) {
                observer.disconnect();
                _this2.inputField = targetNode.querySelector(_this2.selector);
                var inputConfig = {
                  inputName: _this2.name,
                  listId: _this2.resultsList.idName,
                  listClass: _this2.resultsList.className,
                  itemId: _this2.resultItem.idName,
                  itemClass: _this2.resultItem.className
                };
                inputComponent(_this2.inputField, inputConfig);
                eventEmitter(_this2.inputField, {
                  mutation: mutation
                }, "connect");
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
    }, {
      key: "attach",
      value: function attach() {
        this.init();
      }
    }, {
      key: "detach",
      value: function detach() {
        this.inputField.removeEventListener("input", this.exec);
        eventEmitter(this.inputField, null, "detached");
      }
    }]);
    return autoCompleteJS;
  }();

  return autoCompleteJS;

})));
