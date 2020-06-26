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

  var search = (function (query, record, options) {
    var recordLowerCase = record.toLowerCase();
    if (options.searchEngine === "loose") {
      query = query.replace(/ /g, "");
      var match = [];
      var searchPosition = 0;
      for (var number = 0; number < recordLowerCase.length; number++) {
        var recordChar = record[number];
        if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
          recordChar = options.highlight ? "<span class=".concat(options.highlight, ">").concat(recordChar, "</span>") : recordChar;
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
        return options.highlight ? record.replace(query, "<span class=".concat(options.highlight, ">").concat(query, "</span>")) : record;
      }
    }
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

  var closeAllLists = function closeAllLists(element, inputField) {
    var list = document.getElementsByClassName("autoComplete_list");
    for (var index = 0; index < list.length; index++) {
      if (element !== list[index] && element !== inputField) list[index].parentNode.removeChild(list[index]);
    }
  };
  var generateList = function generateList(data, event, inputField) {
    var inputValue = inputField.value;
    var list = createList(event.target);
    data.forEach(function (value) {
      var result = search(inputValue, value, {
        searchEngine: "strict",
        highlight: {
          "class": "highlighted"
        }
      });
      if (result) {
        var resultItem = createItem(result, inputValue);
        resultItem.addEventListener("click", function (event) {
          console.log(event.target.innerText);
        });
        list.appendChild(resultItem);
      }
    });
  };

  var currentFocus;
  var focusState = function focusState(state) {
    currentFocus = state;
  };
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
    inputField.addEventListener("keydown", navigation);
  };

  var prepareData = function prepareData(request, callback) {
    Promise.resolve(request()).then(function (data) {
      callback(data);
    });
  };

  var autoComplete = function () {
    function autoComplete(config) {
      _classCallCheck(this, autoComplete);
      var _config$selector = config.selector,
          selector = _config$selector === void 0 ? inputField : _config$selector,
          _config$data = config.data,
          src = _config$data.src,
          cached = _config$data.cached;
      this.inputField = selector;
      this.data = {
        src: src,
        cached: cached
      };
      this.preInit();
    }
    _createClass(autoComplete, [{
      key: "init",
      value: function init(event, inputField, data) {
        closeAllLists(false, inputField);
        if (!event.target.value) return false;
        focusState(-1);
        generateList(data, event, inputField);
        navigate(inputField);
        document.addEventListener("click", function (event) {
          closeAllLists(event.target, inputField);
        });
      }
    }, {
      key: "preInit",
      value: function preInit() {
        var _this = this;
        if (this.data.cached) {
          prepareData(this.data.src, function (data) {
            _this.inputField.addEventListener("input", function (event) {
              var inputField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.inputField;
              _this.init(event, inputField, data);
            });
          });
        } else {
          this.inputField.addEventListener("input", function (event) {
            var inputField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.inputField;
            prepareData(_this.data.src, function (data) {
              _this.init(event, inputField, data);
            });
          });
        }
      }
    }]);
    return autoComplete;
  }();

  return autoComplete;

})));
