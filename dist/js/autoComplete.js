(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.autoComplete = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
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
        it = it.call(o);
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

  var configure = (function (ctx) {
    var selector = ctx.selector,
        options = ctx.options;
    ctx.input = typeof selector === "string" ? document.querySelector(selector) : selector();
    var inject = function inject(option) {
      for (var subOption in options[option]) {
        if (_typeof(options[option][subOption]) === "object" && !options[option][subOption].length) {
          for (var subSubOption in options[option][subOption]) {
            ctx[option][subOption][subSubOption] = options[option][subOption][subSubOption];
          }
        } else {
          ctx[option][subOption] = options[option][subOption];
        }
      }
    };
    for (var option in options) {
      if (_typeof(options[option]) === "object") {
        if (ctx[option]) {
          inject(option);
        } else {
          ctx[option] = {};
          inject(option);
        }
      } else {
        ctx[option] = options[option];
      }
    }
  });

  var preInit = (function (ctx) {
    var callback = function callback(mutations, observer) {
      mutations.forEach(function (mutation) {
        if (ctx.input) {
          observer.disconnect();
          ctx.init();
        }
      });
    };
    var observer = new MutationObserver(callback);
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  });

  var selector = (function (element) {
    return typeof element === "string" ? document.querySelector(element) : element || null;
  });

  var create = (function (tag, options) {
    var element = typeof tag === "string" ? document.createElement(tag) : tag;
    for (var key in options) {
      var value = options[key];
      if (key === "dest") {
        selector(value[0]).insertAdjacentElement(value[1], element);
      } else if (key === "around") {
        var reference = selector(value);
        reference.parentNode.insertBefore(element, reference);
        element.appendChild(reference);
        if (reference.getAttribute("autofocus") != null) reference.focus();
      } else if (key in element) {
        element[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    }
    return element;
  });

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

  var eventEmitter = (function (ctx, name) {
    ctx.input.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: ctx.dataFeedback,
      cancelable: true
    }));
  });

  var ariaExpanded = "aria-expanded";
  var ariaActive$1 = "aria-activedescendant";
  var renderList = function renderList(ctx) {
    var resultsList = ctx.resultsList,
        list = ctx.list,
        resultItem = ctx.resultItem,
        dataFeedback = ctx.dataFeedback;
    dataFeedback.query;
        var matches = dataFeedback.matches,
        results = dataFeedback.results;
    list.innerHTML = "";
    ctx.cursor = -1;
    if (matches.length || resultsList.noResults) {
      var fragment = document.createDocumentFragment();
      results.forEach(function (result, index) {
        var element = create(resultItem.element, {
          id: "".concat(resultItem.idName, "_").concat(index),
          "class": resultItem.className,
          role: "option",
          innerHTML: result.match
        });
        if (resultItem.content) resultItem.content(element, result);
        fragment.appendChild(element);
      });
      list.appendChild(fragment);
      if (resultsList.container) resultsList.container(list, dataFeedback);
      openList(ctx);
    } else {
      closeList(ctx);
    }
  };
  var openList = function openList(ctx) {
    if (!ctx.isOpened) {
      ctx.wrapper.setAttribute(ariaExpanded, true);
      ctx.input.setAttribute(ariaActive$1, "");
      ctx.list.removeAttribute("hidden");
      ctx.isOpened = true;
      eventEmitter(ctx, "open");
    }
  };
  var closeList = function closeList(ctx) {
    if (ctx.isOpened) {
      var list = document.getElementById(ctx.resultsList.idName);
      ctx.wrapper.setAttribute(ariaExpanded, false);
      ctx.input.setAttribute(ariaActive$1, "");
      list.setAttribute("hidden", "");
      ctx.isOpened = false;
      eventEmitter(ctx, "close");
    }
  };
  var selectItem = function selectItem(ctx, event, index) {
    index = index > -1 ? index : ctx.cursor;
    var data = ctx.dataFeedback;
    var dataFeedback = _objectSpread2(_objectSpread2({
      event: event
    }, data), {}, {
      selection: _objectSpread2(_objectSpread2({}, data.results[index]), {}, {
        index: index
      })
    });
    if (ctx.onSelection) ctx.onSelection(dataFeedback);
    closeList(ctx);
  };

  var classList;
  var ariaSelected = "aria-selected";
  var ariaActive = "aria-activedescendant";
  var goTo = function goTo(index, ctx) {
    var list = ctx.list,
        state = ctx.state;
    var results = list.getElementsByTagName(ctx.resultItem.element);
    if (results.length) {
      var _results$index$classL;
      state = ctx.cursor;
      if (index >= results.length) index = 0;
      if (index < 0) index = results.length - 1;
      ctx.cursor = index;
      if (state > -1) {
        var _results$state$classL;
        results[state].removeAttribute(ariaSelected);
        if (classList) (_results$state$classL = results[state].classList).remove.apply(_results$state$classL, _toConsumableArray(classList));
      }
      results[index].setAttribute(ariaSelected, true);
      if (classList) (_results$index$classL = results[index].classList).add.apply(_results$index$classL, _toConsumableArray(classList));
      ctx.input.setAttribute(ariaActive, results[ctx.cursor].id);
      ctx.dataFeedback.cursor = ctx.cursor;
      results[index].scrollIntoView({
        behavior: ctx.resultsList.scroll || "smooth",
        block: "center"
      });
      eventEmitter(ctx, "navigate");
    }
  };
  var next = function next(ctx) {
    var index = ctx.cursor + 1;
    ctx.goTo(index, ctx);
  };
  var previous = function previous(ctx) {
    var index = ctx.cursor - 1;
    ctx.goTo(index, ctx);
  };
  var navigate = function navigate(ctx, event) {
    var key = event.keyCode;
    var selectedItem = ctx.resultItem.selected;
    classList = selectedItem ? selectedItem.className.split(" ") : "";
    switch (key) {
      case 40:
      case 38:
        event.preventDefault();
        ctx[key === 40 ? "next" : "previous"](ctx);
        break;
      case 13:
        event.preventDefault();
        if (ctx.cursor >= 0) {
          selectItem(ctx, event);
        }
        break;
      case 9:
        if (ctx.resultsList.tabSelect && ctx.cursor >= 0) {
          event.preventDefault();
          selectItem(ctx, event);
        } else {
          closeList(ctx);
        }
        break;
      case 27:
        event.preventDefault();
        ctx.input.value = "";
        closeList(ctx);
        break;
    }
  };

  var eventsListManager = function eventsListManager(events, callback) {
    for (var element in events) {
      for (var event in events[element]) {
        callback(event, element);
      }
    }
  };
  var addEventListeners = function addEventListeners(ctx) {
    var resultsList = ctx.resultsList;
    var publicEvents = ctx._events = {
      input: {},
      list: {}
    };
    var privateEvents = {
      input: {
        keydown: function keydown(event) {
          resultsList.navigation ? resultsList.navigation(event) : navigate(ctx, event);
        },
        blur: function blur() {
          closeList(ctx);
        }
      },
      list: {
        mousedown: function mousedown(event) {
          event.preventDefault();
        },
        click: function click(event) {
          var resultItemElement = ctx.resultItem.element.toUpperCase();
          var items = Array.from(ctx.list.children);
          var item = event.target.closest(resultItemElement);
          if (item && item.nodeName === resultItemElement) {
            event.preventDefault();
            var index = items.indexOf(item) - 1;
            selectItem(ctx, event, index);
          }
        }
      }
    };
    ctx.trigger.event.forEach(function (eventType) {
      publicEvents.input[eventType] = debouncer(function (event) {
        return ctx.start(ctx, event);
      }, ctx.debounce);
    });
    if (ctx.resultsList.render) {
      eventsListManager(privateEvents, function (event, element) {
        publicEvents[element][event] = privateEvents[element][event];
      });
    }
    eventsListManager(publicEvents, function (event, element) {
      ctx[element].addEventListener(event, publicEvents[element][event]);
    });
  };
  var removeEventListeners = function removeEventListeners(ctx) {
    eventsListManager(ctx._events, function (event, element) {
      ctx[element].removeEventListener(event, ctx._events[element][event]);
    });
  };

  var init = (function (ctx) {
    var placeHolder = ctx.placeHolder,
        resultsList = ctx.resultsList;
    var cmnAttributes = {
      role: "combobox",
      "aria-expanded": false
    };
    var inputAttributes = _objectSpread2({
      "aria-haspopup": true,
      "aria-controls": resultsList.idName,
      "aria-autocomplete": "both"
    }, cmnAttributes);
    if (placeHolder) inputAttributes.placeholder = placeHolder;
    create(ctx.input, inputAttributes);
    ctx.wrapper = create("div", _objectSpread2({
      className: ctx.name + "_wrapper",
      around: ctx.input,
      "aria-owns": resultsList.idName
    }, cmnAttributes));
    ctx.list = create(resultsList.element, {
      hidden: "hidden",
      dest: [typeof resultsList.destination === "string" ? document.querySelector(resultsList.destination) : resultsList.destination(), resultsList.position],
      id: resultsList.idName,
      "class": resultsList.classList,
      role: "listbox"
    });
    addEventListeners(ctx);
    eventEmitter(ctx, "init");
  });

  var formatRawInputValue = function formatRawInputValue(ctx, value) {
    value = value.toLowerCase();
    return (ctx.diacritics ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : value).toString();
  };
  var getInputValue = function getInputValue(inputField) {
    return inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement ? inputField.value : inputField.innerHTML;
  };
  var prepareQuery = function prepareQuery(ctx, input) {
    var query = ctx.query;
    return query && query.manipulate ? query.manipulate(input) : formatRawInputValue(ctx, input);
  };
  var highlightChar = function highlightChar(classList, value) {
    return "<mark class=\"".concat(classList, "\">").concat(value, "</mark>");
  };

  var checkTriggerCondition = (function (ctx, event, query) {
    query = query.replace(/ /g, "");
    var condition = ctx.trigger.condition;
    return condition ? condition(event, query) : query.length >= ctx.threshold;
  });

  var search = (function (ctx, query, record) {
    var formattedRecord = formatRawInputValue(ctx, record);
    var resultItemHighlight = ctx.resultItem.highlight;
    var classList = resultItemHighlight ? resultItemHighlight.className : "";
    var highlight = resultItemHighlight ? resultItemHighlight.render : "";
    if (ctx.searchEngine === "loose") {
      query = query.replace(/ /g, "");
      var queryLength = query.length;
      var cursor = 0;
      var match = Array.from(record).map(function (character, index) {
        if (cursor < queryLength && formattedRecord[index] === query[cursor]) {
          character = highlight ? highlightChar(classList, character) : character;
          cursor++;
        }
        return character;
      }).join("");
      if (cursor === queryLength) return match;
    } else {
      if (formattedRecord.includes(query)) {
        var pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
        query = pattern.exec(record);
        var _match = highlight ? record.replace(query, highlightChar(classList, query)) : record;
        return _match;
      }
    }
  });

  var dataStore = function dataStore(ctx) {
    return new Promise(function ($return, $error) {
      var data;
      data = ctx.data;
      if (data.cache && data.store) return $return(data.store);
      var $Try_1_Catch = function $Try_1_Catch(error) {
        try {
          return $return(error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };
      try {
        return new Promise(function ($return, $error) {
          if (typeof data.src === "function") {
            return data.src().then($return, $error);
          }
          return $return(data.src);
        }).then($return, $Try_1_Catch);
      } catch (error) {
        $Try_1_Catch(error);
      }
    });
  };
  var findMatches = function findMatches(ctx, query) {
    var data = ctx.data,
        customSearch = ctx.searchEngine;
    var results = [];
    data.store.forEach(function (record, index) {
      var find = function find(key) {
        var recordValue = key ? record[key] : record;
        var match = typeof customSearch === "function" ? customSearch(query, recordValue) : search(ctx, query, recordValue);
        if (!match) return;
        var result = {
          index: index,
          match: match,
          value: record
        };
        if (key) result.key = key;
        results.push(result);
      };
      if (data.key) {
        var _iterator = _createForOfIteratorHelper(data.key),
            _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;
            find(key);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        find();
      }
    });
    return results;
  };

  function start (ctx, event) {
    var _this = this;
    return new Promise(function ($return, $error) {
      var input, data, resultsList, inputValue, query, triggerCondition;
      input = ctx.input;
      data = ctx.data;
      resultsList = ctx.resultsList;
      inputValue = getInputValue(input);
      query = prepareQuery(ctx, inputValue);
      triggerCondition = checkTriggerCondition(ctx, event, query);
      if (triggerCondition) {
        var results;
        return dataStore(ctx).then(function ($await_2) {
          try {
            data.store = $await_2;
            eventEmitter({
              input: input,
              dataFeedback: data.store
            }, "response");
            results = data.filter ? data.filter(findMatches(ctx, query)) : findMatches(ctx, query);
            ctx.dataFeedback = {
              input: inputValue,
              query: query,
              matches: results,
              results: results.slice(0, resultsList.maxResults)
            };
            eventEmitter(ctx, "results");
            if (!resultsList.render) return $return();
            renderList(ctx);
            return $If_1.call(_this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      } else {
        closeList(ctx);
        return $If_1.call(_this);
      }
      function $If_1() {
        return $return();
      }
    });
  }

  var stage = (function (ctx, autoComplete) {
    autoComplete.prototype.preInit = function () {
      return preInit(ctx);
    };
    autoComplete.prototype.init = function () {
      return init(ctx);
    };
    autoComplete.prototype.start = function () {
      return start(ctx);
    };
    autoComplete.prototype.unInit = function () {
      return removeEventListeners(ctx);
    };
    autoComplete.prototype.open = function () {
      return openList(ctx);
    };
    autoComplete.prototype.close = function () {
      return closeList(ctx);
    };
    autoComplete.prototype.goTo = function (index) {
      return goTo(index, ctx);
    };
    autoComplete.prototype.next = function () {
      return next(ctx);
    };
    autoComplete.prototype.previous = function () {
      return previous(ctx);
    };
    autoComplete.prototype.select = function (index) {
      return selectItem(ctx, null, index);
    };
  });

  function autoComplete(config) {
    this.options = config;
    this.name = "autoComplete";
    this.selector = "#" + this.name;
    this.trigger = {
      event: ["input"]
    };
    this.threshold = 1;
    this.debounce = 0;
    this.resultsList = {
      render: true,
      destination: this.selector,
      position: "afterend",
      element: "ul",
      idName: this.name + "_list",
      maxResults: 5
    };
    this.resultItem = {
      element: "li",
      className: this.name + "_result",
      highlight: {
        className: this.name + "_highlighted"
      }
    };
    configure(this);
    stage(this, autoComplete);
    this.observer ? this.preInit() : this.init();
  }

  return autoComplete;

})));
