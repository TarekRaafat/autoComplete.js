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
    var options = ctx.options,
        resultsList = ctx.resultsList,
        resultItem = ctx.resultItem;
    var inject = function inject(option) {
      for (var subOption in options[option]) {
        if (_typeof(options[option][subOption]) === "object") {
          if (!ctx[option][subOption]) {
            ctx[option][subOption] = options[option][subOption];
          }
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
    ctx.selector = ctx.selector || "#" + ctx.name;
    resultsList.destination = resultsList.destination || ctx.selector;
    resultsList.idName = resultsList.idName || ctx.name + "_list_" + ctx.id;
    resultItem.idName = resultItem.idName || ctx.name + "_result";
    ctx.input = typeof ctx.selector === "string" ? document.querySelector(ctx.selector) : ctx.selector();
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

  var eventEmitter = (function (ctx, name) {
    ctx.input.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: ctx.dataFeedback,
      cancelable: true
    }));
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
  var highlightChar = function highlightChar(className, value) {
    return create("mark", _objectSpread2(_objectSpread2({}, className && {
      className: className
    }), {}, {
      innerHTML: value
    })).outerHTML;
  };

  var search = (function (ctx, query, record) {
    var formattedRecord = formatRawInputValue(ctx, record);
    var resultItemHighlight = ctx.resultItem.highlight;
    var className, highlight;
    if (resultItemHighlight) {
      className = resultItemHighlight.className;
      highlight = resultItemHighlight.render;
    }
    if (ctx.searchEngine === "loose") {
      query = query.replace(/ /g, "");
      var queryLength = query.length;
      var cursor = 0;
      var match = Array.from(record).map(function (character, index) {
        if (cursor < queryLength && formattedRecord[index] === query[cursor]) {
          character = highlight ? highlightChar(className, character) : character;
          cursor++;
        }
        return character;
      }).join("");
      if (cursor === queryLength) return match;
    } else {
      if (formattedRecord.includes(query)) {
        var pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
        query = pattern.exec(record);
        var _match = highlight ? record.replace(query, highlightChar(className, query)) : record;
        return _match;
      }
    }
  });

  var getData = function getData(ctx) {
    return new Promise(function ($return, $error) {
      var input, data;
      input = ctx.input;
      data = ctx.data;
      if (data.cache && data.store) return $return();
      var $Try_1_Post = function $Try_1_Post() {
        try {
          eventEmitter({
            input: input,
            dataFeedback: data.store
          }, "response");
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };
      var $Try_1_Catch = function $Try_1_Catch(error) {
        try {
          data.store = error;
          return $Try_1_Post();
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
        }).then(function ($await_5) {
          try {
            data.store = $await_5;
            return $Try_1_Post();
          } catch ($boundEx) {
            return $Try_1_Catch($boundEx);
          }
        }, $Try_1_Catch);
      } catch (error) {
        $Try_1_Catch(error);
      }
    });
  };
  var findMatches = function findMatches(ctx, input, query) {
    var data = ctx.data,
        customSearch = ctx.searchEngine;
    var matches = [];
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
        matches.push(result);
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
    if (data.filter) matches = data.filter(matches);
    ctx.dataFeedback = {
      input: input,
      query: query,
      matches: matches,
      results: matches.slice(0, ctx.resultsList.maxResults)
    };
    eventEmitter(ctx, "results");
  };

  var checkTriggerCondition = (function (ctx, query) {
    query = query.replace(/ /g, "");
    var condition = ctx.trigger.condition;
    return condition ? condition(query) : query.length >= ctx.threshold;
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
    ctx.cursor = -1;
    list.innerHTML = "";
    if (matches.length || resultsList.noResults) {
      var fragment = document.createDocumentFragment();
      results.forEach(function (result, index) {
        var element = create(resultItem.element, _objectSpread2(_objectSpread2({
          id: "".concat(resultItem.idName, "_").concat(index)
        }, resultItem.className && {
          "class": resultItem.className
        }), {}, {
          role: "option",
          innerHTML: result.match
        }));
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

  function start (ctx) {
    var _this = this;
    return new Promise(function ($return, $error) {
      var inputValue, query, triggerCondition;
      inputValue = getInputValue(ctx.input);
      query = prepareQuery(ctx, inputValue);
      triggerCondition = checkTriggerCondition(ctx, query);
      if (triggerCondition) {
        return getData(ctx).then(function ($await_2) {
          try {
            findMatches(ctx, inputValue, query);
            if (ctx.resultsList.render) renderList(ctx);
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

  var debouncer = (function (callback, delay) {
    var inDebounce;
    return function () {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(function () {
        return callback();
      }, delay);
    };
  });

  var classList;
  var ariaSelected = "aria-selected";
  var ariaActive = "aria-activedescendant";
  var goTo = function goTo(index, ctx) {
    var results = ctx.list.getElementsByTagName(ctx.resultItem.element);
    if (ctx.isOpened && results.length) {
      var _results$index$classL;
      var state = ctx.cursor;
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
    goTo(index, ctx);
  };
  var previous = function previous(ctx) {
    var index = ctx.cursor - 1;
    goTo(index, ctx);
  };
  var select = function select(ctx, event, index) {
    index = index || ctx.cursor;
    if (!index || index < 0) return;
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
  var click = function click(event, ctx) {
    var resultItemElement = ctx.resultItem.element.toUpperCase();
    var items = Array.from(ctx.list.children);
    var item = event.target.closest(resultItemElement);
    if (item && item.nodeName === resultItemElement) {
      event.preventDefault();
      var index = items.indexOf(item) - 1;
      select(ctx, event, index);
    }
  };
  var navigate = function navigate(event, ctx) {
    var key = event.keyCode;
    var selectedItem = ctx.resultItem.selected;
    classList = selectedItem ? selectedItem.className.split(" ") : "";
    switch (key) {
      case 40:
      case 38:
        event.preventDefault();
        key === 40 ? next(ctx) : previous(ctx);
        break;
      case 13:
        event.preventDefault();
        if (ctx.cursor >= 0) {
          select(ctx, event);
        }
        break;
      case 9:
        if (ctx.resultsList.tabSelect && ctx.cursor >= 0) {
          event.preventDefault();
          select(ctx, event);
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
    var events = ctx.events,
        resultsList = ctx.resultsList;
    var publicEvents = ctx.events = _objectSpread2({
      input: _objectSpread2({}, events && events.input)
    }, resultsList.render && {
      list: events ? _objectSpread2({}, events.list) : {}
    });
    var privateEvents = {
      input: {
        keydown: function keydown(event) {
          resultsList.navigation ? resultsList.navigation(event) : navigate(event, ctx);
        },
        blur: function blur() {
          closeList(ctx);
        }
      },
      list: {
        mousedown: function mousedown(event) {
          event.preventDefault();
        },
        click: function click$1(event) {
          click(event, ctx);
        }
      }
    };
    ctx.trigger.events.forEach(function (event) {
      if (!publicEvents.input[event]) {
        publicEvents.input[event] = debouncer(function () {
          return start(ctx);
        }, ctx.debounce);
      }
    });
    if (resultsList.render) {
      eventsListManager(privateEvents, function (event, element) {
        if (!publicEvents[element][event]) {
          publicEvents[element][event] = privateEvents[element][event];
        }
      });
    }
    eventsListManager(publicEvents, function (event, element) {
      ctx[element].addEventListener(event, publicEvents[element][event]);
    });
  };
  var removeEventListeners = function removeEventListeners(ctx) {
    eventsListManager(ctx.events, function (event, element) {
      ctx[element].removeEventListener(event, ctx.events[element][event]);
    });
  };

  function init (ctx) {
    var _this = this;
    return new Promise(function ($return, $error) {
      var placeHolder, resultsList, inputAttributes;
      placeHolder = ctx.placeHolder;
      resultsList = ctx.resultsList;
      ctx.wrapper = create("div", {
        "class": ctx.name + "_wrapper",
        around: ctx.input,
        role: "combobox",
        "aria-owns": resultsList.idName,
        "aria-haspopup": true,
        "aria-expanded": false
      });
      inputAttributes = {
        "aria-controls": resultsList.idName,
        "aria-autocomplete": "both"
      };
      if (placeHolder) inputAttributes.placeholder = placeHolder;
      create(ctx.input, inputAttributes);
      ctx.list = create(resultsList.element, _objectSpread2(_objectSpread2({
        hidden: "hidden",
        dest: [typeof resultsList.destination === "string" ? document.querySelector(resultsList.destination) : resultsList.destination(), resultsList.position],
        id: resultsList.idName
      }, resultsList.className && {
        "class": resultsList.className
      }), {}, {
        role: "listbox"
      }));
      if (ctx.data.cache) {
        return getData(ctx).then(function ($await_2) {
          try {
            return $If_1.call(_this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      }
      function $If_1() {
        addEventListeners(ctx);
        eventEmitter(ctx, "init");
        return $return();
      }
      return $If_1.call(_this);
    });
  }

  var stage = (function (ctx, autoComplete) {
    var prototype = autoComplete.prototype;
    prototype.preInit = function () {
      return preInit(ctx);
    };
    prototype.init = function () {
      return init(ctx);
    };
    prototype.start = function () {
      return start(ctx);
    };
    prototype.unInit = function () {
      return removeEventListeners(ctx);
    };
    prototype.open = function () {
      return openList(ctx);
    };
    prototype.close = function () {
      return closeList(ctx);
    };
    prototype.goTo = function (index) {
      return goTo(index, ctx);
    };
    prototype.next = function () {
      return next(ctx);
    };
    prototype.previous = function () {
      return previous(ctx);
    };
    prototype.select = function (index) {
      return select(ctx, null, index);
    };
  });

  function autoComplete(config) {
    this.options = config;
    this.id = autoComplete.instances = (autoComplete.instances || 0) + 1;
    this.name = "autoComplete";
    this.trigger = {
      events: ["input"]
    };
    this.threshold = 1;
    this.debounce = 0;
    this.resultsList = {
      render: true,
      position: "afterend",
      element: "ul",
      maxResults: 5
    };
    this.resultItem = {
      element: "li"
    };
    configure(this);
    stage(this, autoComplete);
    var run = this.observer ? this.preInit : this.init;
    if (document.readyState !== "loading") {
      run();
    } else {
      document.addEventListener("DOMContentLoaded", run);
    }
  }

  return autoComplete;

})));
