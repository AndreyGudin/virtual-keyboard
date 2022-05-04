"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyboardButton =
/*#__PURE__*/
function () {
  function KeyboardButton(key, isCapslock, lang) {
    _classCallCheck(this, KeyboardButton);

    this.key = key;
    this.isCapslock = isCapslock;
    this.lang = lang;
  }

  _createClass(KeyboardButton, [{
    key: "generate",
    value: function generate() {
      var template = '';
      var buttonGen = document.createElement("div").classList.add("virtual-keyboard__button-wrapper");

      if (Array.isArray(this.key)) {
        template += "<button class=\"virtual-keyboard__key key-".concat(this.key[0], "-").concat(this.key[1], "\"><span>").concat(this.key[0], "</span><span>").concat(this.key[1], "</span></button>");
      } else if (this.key.length > 1) {
        template += "<button class=\"virtual-keyboard__key control-key-".concat(this.key, "\"><span>").concat(this.key, "</span></button>");
      } else {
        template += "<button class=\"virtual-keyboard__key key-".concat(this.key, "\"><span>").concat(this.key, "</span></button>");
      }

      buttonGen.innerHTML = template;
      return buttonGen;
    }
  }]);

  return KeyboardButton;
}();

var KEYBOARD_EN = [[['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'][('5', '%')], ['6', '^'], ['7', '&'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'], ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', [';', ':'], ["'", '"'], 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', [',', '<'], ['.', '>'], ['/', '?'], 'ArrowUp', 'Shift'], ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight']];
var KEYBOARD_RU = [['Ё', ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'][('5', '%')], ['6', ':'], ['7', '?'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', ['\\', '/'], 'Del'], ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', "Э", 'Enter'], ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ['.', ','], 'ArrowUp', 'Shift'], ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight']];