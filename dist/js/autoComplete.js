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
    var id = ctx.id,
        name = ctx.name,
        options = ctx.options,
        resultsList = ctx.resultsList,
        resultItem = ctx.resultItem;
    for (var option in options) {
      if (_typeof(options[option]) === "object") {
        if (!ctx[option]) ctx[option] = {};
        for (var subOption in options[option]) {
          ctx[option][subOption] = options[option][subOption];
        }
      } else {
        ctx[option] = options[option];
      }
    }
    ctx.selector = ctx.selector || "#" + name;
    resultsList.destination = resultsList.destination || ctx.selector;
    resultsList.id = resultsList.id || name + "_list_" + id;
    resultItem.id = resultItem.id || name + "_result";
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

  var select$1 = function select(element) {
    return typeof element === "string" ? document.querySelector(element) : element || null;
  };
  var create = function create(tag, options) {
    var el = typeof tag === "string" ? document.createElement(tag) : tag;
    for (var key in options) {
      var val = options[key];
      if (key === "inside") {
        val.append(el);
      } else if (key === "dest") {
        select$1(val[0]).insertAdjacentElement(val[1], el);
      } else if (key === "around") {
        var ref = select$1(val);
        ref.parentNode.insertBefore(el, ref);
        el.append(ref);
        if (ref.getAttribute("autofocus") != null) ref.focus();
      } else if (key in el) {
        el[key] = val;
      } else {
        el.setAttribute(key, val);
      }
    }
    return el;
  };
  var getInput = function getInput(field) {
    return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value : field.innerHTML;
  };
  var format = function format(value, diacritics) {
    value = value.toLowerCase();
    return (diacritics ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : value).toString();
  };
  var getQuery = function getQuery(input, query) {
    return query ? query(input) : input;
  };
  var debounce = function debounce(callback, duration) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        return callback();
      }, duration);
    };
  };
  var checkTrigger = function checkTrigger(query, condition, threshold) {
    query = query.replace(/ /g, "");
    return condition ? condition(query) : query.length >= threshold;
  };
  var mark = function mark(value, classes) {
    return create("mark", _objectSpread2(_objectSpread2({}, typeof classes === "string" && {
      classes: classes
    }), {}, {
      innerHTML: value
    })).outerHTML;
  };

  var eventEmitter = (function (name, ctx) {
    ctx.input.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      detail: ctx.dataFeedback,
      cancelable: true
    }));
  });

  var search = (function (query, record, options) {
    var _ref = options || {},
        mode = _ref.mode,
        diacritics = _ref.diacritics,
        highlight = _ref.highlight;
    var nRecord = format(record, diacritics);
    query = format(query, diacritics);
    if (mode === "loose") {
      query = query.replace(/ /g, "");
      var qLength = query.length;
      var cursor = 0;
      var match = Array.from(record).map(function (character, index) {
        if (cursor < qLength && nRecord[index] === query[cursor]) {
          character = highlight ? mark(character, highlight) : character;
          cursor++;
        }
        return character;
      }).join("");
      if (cursor === qLength) return match;
    } else {
      if (nRecord.includes(query)) {
        var pattern = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
        query = pattern.exec(record);
        var _match = highlight ? record.replace(query, mark(query, highlight)) : record;
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
          eventEmitter("response", {
            input: input,
            dataFeedback: data.store
          });
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
  var findMatches = function findMatches(input, query, ctx) {
    var data = ctx.data,
        searchEngine = ctx.searchEngine,
        diacritics = ctx.diacritics,
        resultsList = ctx.resultsList,
        resultItem = ctx.resultItem;
    var matches = [];
    data.store.forEach(function (record, index) {
      var find = function find(key) {
        var value = key ? record[key] : record;
        var match = typeof searchEngine === "function" ? searchEngine(query, value) : search(query, value, {
          mode: searchEngine,
          diacritics: diacritics,
          highlight: resultItem.highlight
        });
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
    var results = matches.slice(0, resultsList.maxResults);
    ctx.dataFeedback = {
      input: input,
      query: query,
      matches: matches,
      results: results
    };
    eventEmitter("results", ctx);
  };

  var classes;
  var Expand = "aria-expanded";
  var Active = "aria-activedescendant";
  var Selected = "aria-selected";
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
        var element = create(resultItem.tag, _objectSpread2(_objectSpread2({
          id: "".concat(resultItem.id, "_").concat(index)
        }, resultItem["class"] && {
          "class": resultItem["class"]
        }), {}, {
          role: "option",
          innerHTML: result.match,
          inside: fragment
        }));
        if (resultItem.element) resultItem.element(element, result);
      });
      list.append(fragment);
      if (resultsList.element) resultsList.element(list, dataFeedback);
      openList(ctx);
    } else {
      closeList(ctx);
    }
  };
  var openList = function openList(ctx) {
    if (!ctx.isOpened) {
      ctx.wrapper.setAttribute(Expand, true);
      ctx.input.setAttribute(Active, "");
      ctx.list.removeAttribute("hidden");
      ctx.isOpened = true;
      eventEmitter("open", ctx);
    }
  };
  var closeList = function closeList(ctx) {
    if (ctx.isOpened) {
      ctx.wrapper.setAttribute(Expand, false);
      ctx.input.setAttribute(Active, "");
      ctx.list.setAttribute("hidden", "");
      ctx.isOpened = false;
      eventEmitter("close", ctx);
    }
  };
  var goTo = function goTo(index, ctx) {
    var results = ctx.list.getElementsByTagName(ctx.resultItem.tag);
    if (ctx.isOpened && results.length) {
      var _results$index$classL;
      var state = ctx.cursor;
      if (index >= results.length) index = 0;
      if (index < 0) index = results.length - 1;
      ctx.cursor = index;
      if (state > -1) {
        var _results$state$classL;
        results[state].removeAttribute(Selected);
        if (classes) (_results$state$classL = results[state].classList).remove.apply(_results$state$classL, _toConsumableArray(classes));
      }
      results[index].setAttribute(Selected, true);
      if (classes) (_results$index$classL = results[index].classList).add.apply(_results$index$classL, _toConsumableArray(classes));
      ctx.input.setAttribute(Active, results[ctx.cursor].id);
      ctx.dataFeedback.cursor = ctx.cursor;
      results[index].scrollIntoView({
        behavior: ctx.resultsList.scroll || "smooth",
        block: "center"
      });
      eventEmitter("navigate", ctx);
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
    if (index < 0) return;
    var data = ctx.dataFeedback;
    var dataFeedback = _objectSpread2(_objectSpread2({
      event: event
    }, data), {}, {
      selection: _objectSpread2({
        index: index
      }, data.results[index])
    });
    if (ctx.onSelection) ctx.onSelection(dataFeedback);
    closeList(ctx);
  };
  var click = function click(event, ctx) {
    var resultItemElement = ctx.resultItem.tag.toUpperCase();
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
    var selected = ctx.resultItem.selected;
    if (selected) classes = selected.split(" ");
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

  function start (ctx) {
    var _this = this;
    return new Promise(function ($return, $error) {
      var input, query, trigger, threshold, resultsList, inputVal, queryVal, condition;
      input = ctx.input;
      query = ctx.query;
      trigger = ctx.trigger;
      threshold = ctx.threshold;
      resultsList = ctx.resultsList;
      inputVal = getInput(input);
      queryVal = getQuery(inputVal, query);
      condition = checkTrigger(queryVal, trigger, threshold);
      if (condition) {
        return getData(ctx).then(function ($await_2) {
          try {
            findMatches(inputVal, queryVal, ctx);
            if (resultsList.render) renderList(ctx);
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

  var eventsListManager = function eventsListManager(events, callback) {
    for (var element in events) {
      for (var event in events[element]) {
        callback(event, element);
      }
    }
  };
  var addEventListeners = function addEventListeners(ctx) {
    var events = ctx.events;
        ctx.trigger;
        var timer = ctx.debounce,
        resultsList = ctx.resultsList;
    var run = debounce(function () {
      return start(ctx);
    }, timer);
    var publicEvents = ctx.events = _objectSpread2({
      input: _objectSpread2({}, events && events.input)
    }, resultsList.render && {
      list: events ? _objectSpread2({}, events.list) : {}
    });
    var privateEvents = {
      input: {
        input: function input() {
          run();
        },
        keydown: function keydown(event) {
          navigate(event, ctx);
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
    eventsListManager(privateEvents, function (event, element) {
      element = resultsList.render ? element : "input";
      if (publicEvents[element][event]) return;
      publicEvents[element][event] = privateEvents[element][event];
    });
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
      var name, input, placeHolder, resultsList, data;
      name = ctx.name;
      input = ctx.input;
      placeHolder = ctx.placeHolder;
      resultsList = ctx.resultsList;
      data = ctx.data;
      create(input, _objectSpread2(_objectSpread2({}, placeHolder && {
        placeholder: placeHolder
      }), {}, {
        "aria-controls": resultsList.id,
        "aria-autocomplete": "both"
      }));
      ctx.wrapper = create("div", {
        around: input,
        "class": name + "_wrapper",
        role: "combobox",
        "aria-owns": resultsList.id,
        "aria-haspopup": true,
        "aria-expanded": false
      });
      ctx.list = create(resultsList.tag, _objectSpread2(_objectSpread2({
        dest: [typeof resultsList.destination === "string" ? document.querySelector(resultsList.destination) : resultsList.destination(), resultsList.position],
        id: resultsList.id
      }, resultsList["class"] && {
        "class": resultsList["class"]
      }), {}, {
        role: "listbox",
        hidden: "hidden"
      }));
      if (data.cache) {
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
        eventEmitter("init", ctx);
        return $return();
      }
      return $If_1.call(_this);
    });
  }

  function extend (autoComplete) {
    var _this = this;
    var prototype = autoComplete.prototype;
    prototype.preInit = function () {
      return preInit(_this);
    };
    prototype.init = function () {
      return init(_this);
    };
    prototype.start = function () {
      return start(_this);
    };
    prototype.unInit = function () {
      return removeEventListeners(_this);
    };
    prototype.open = function () {
      return openList(_this);
    };
    prototype.close = function () {
      return closeList(_this);
    };
    prototype.goTo = function (index) {
      return goTo(index, _this);
    };
    prototype.next = function () {
      return next(_this);
    };
    prototype.previous = function () {
      return previous(_this);
    };
    prototype.select = function (index) {
      return select(_this, null, index);
    };
    autoComplete.search = prototype.search = function (query, record, options) {
      return search(query, record, options);
    };
  }

  function autoComplete(config) {
    this.options = config;
    this.id = autoComplete.instances = (autoComplete.instances || 0) + 1;
    this.name = "autoComplete";
    this.threshold = 1;
    this.debounce = 0;
    this.resultsList = {
      render: true,
      position: "afterend",
      tag: "ul",
      maxResults: 5
    };
    this.resultItem = {
      tag: "li"
    };
    configure(this);
    extend.call(this, autoComplete);
    var run = this.observe ? preInit : init;
    if (document.readyState !== "loading") {
      run(this);
    } else {
      document.addEventListener("DOMContentLoaded", run(this));
    }
  }

  return autoComplete;

})));
