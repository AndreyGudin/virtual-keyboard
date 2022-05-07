const KEYBOARD_EN = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ["'", '"'], 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const KEYBOARD_RU = [
  [['ё', ''], ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', ['х', ''], ['ъ', ''], ['\\', '/'], 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', ['ж', ''], ['э', ''], 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', ['б', ''], ['ю', ''], ['.', ','], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const VIRTUAL_KEYBOARD = document.createElement('div');
const TEXT_AREA = document.createElement('textarea');

class KeyboardButton {
  constructor(key, lang) {
    this.key = key;
    this.lang = lang;
  }

  generate() {
    let template = "";
    const buttonGen = document.createElement("div");
    buttonGen.classList.add("virtual-keyboard__button-wrapper");
    if (Array.isArray(this.key)) {
      if (this.key[0] === "`") {
        template += `<button class="virtual-keyboard__key text-key Backquote"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === "[") {
        template += `<button class="virtual-keyboard__key text-key BracketLeft"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === "]") {
        template += `<button class="virtual-keyboard__key text-key BracketRight"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === ";") {
        template += `<button class="virtual-keyboard__key text-key Semicolon"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === "'") {
        template += `<button class="virtual-keyboard__key text-key Quote"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === "\\") {
        template += `<button class="virtual-keyboard__key text-key Backslash"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === ",") {
        template += `<button class="virtual-keyboard__key text-key Comma"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === ".") {
        template += `<button class="virtual-keyboard__key text-key Period"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === "/") {
        template += `<button class="virtual-keyboard__key text-key Slash"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else {
        if (this.key[0] === "-") {
          template += `<button class="virtual-keyboard__key number-key Minus"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
        } else if (this.key[0] === "=") {
          template += `<button class="virtual-keyboard__key number-key Equal"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
        } else {
          template += `<button class="virtual-keyboard__key number-key Digit${this.key[0]}"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
        }
      }
    } else if (this.key.length > 1) {
      if (
        this.key === "Shift" ||
        this.key === "Ctrl" ||
        this.key === "Alt" ||
        this.key === "Win"
      ) {
        if (
          document.querySelector(
            `.virtual-keyboard__key.control-key.${this.key}Left`
          )
        ) {
          template += `<button class="virtual-keyboard__key control-key ${this.key}Right"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
        } else {
          template += `<button class="virtual-keyboard__key control-key ${this.key}Left"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
        }
      } else {
        template += `<button class="virtual-keyboard__key control-key ${this.key}"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
      }
    } else {
      template += `<button class="virtual-keyboard__key text-key Key${this.key.toUpperCase()}"><span class="virtual-keyboard__text-key">${
        this.key
      }</span></button>`;
    }

    buttonGen.innerHTML = template;
    return buttonGen;
  }
}

function insertAtCursor(text, textarea) {
  const target = textarea;
  const startPos = target.selectionStart;
  const endPos = target.selectionEnd;
  target.focus();
  if ((startPos > 0) && (endPos < target.value.length)) {
    target.value = target.value.substring(0, startPos)
      + text
      + target.value.substring(endPos, target.value.length);
    target.selectionStart = startPos + text.length;
    target.selectionEnd = endPos + text.length;
  } else {
    target.value += text;
  }
}

function highlightButton(key, param = 'highlight') {
  let buttonLighted;
  if ((key === 'ControlLeft')||(key === 'ControlRight')){
    buttonLighted = document.querySelector(`.virtual-keyboard__key.Ctrl${key.substring(7)}`);
    if (!buttonLighted.classList.contains('active')){
      buttonLighted.classList.add('active');
    } else{
      if (param === 'uncheck'){
        buttonLighted.classList.remove('active');
      }
    }
  } else if (key === 'Delete'){
    buttonLighted = document.querySelector(`.virtual-keyboard__key.Del`);
    if (!buttonLighted.classList.contains('active')){
      buttonLighted.classList.add('active');
    }else{
      if (param === 'uncheck'){
        buttonLighted.classList.remove('active');
      }
    }
  } else if ((key === 'MetaLeft')||(key === 'MetaRight')){
    buttonLighted = document.querySelector(`.virtual-keyboard__key.WinLeft`);
    if (!buttonLighted.classList.contains('active')){
      buttonLighted.classList.add('active');
    }else{
      if (param === 'uncheck'){
        buttonLighted.classList.remove('active');
      }
    }
   }
  else{
      if (document.querySelector(`.virtual-keyboard__key.${key}`)){
        buttonLighted = document.querySelector(`.virtual-keyboard__key.${key}`);
        if (!buttonLighted.classList.contains('active')){
          buttonLighted.classList.add('active');
        }else{
          if (param === 'uncheck'){
            buttonLighted.classList.remove('active');
          }
        }
     }
  }
}

VIRTUAL_KEYBOARD.classList.add('virtual-keyboard');
TEXT_AREA.classList.add('virtual-keyboard__text-area');
TEXT_AREA.setAttribute('wrap','hard');
TEXT_AREA.setAttribute('cols','30');
document.body.append(TEXT_AREA);
document.body.append(VIRTUAL_KEYBOARD);

KEYBOARD_EN.forEach((key) => {
  const divForKeyboardLine = document.createElement('div');
  divForKeyboardLine.classList.add('virtual-keyboard__keyboard-line');
  VIRTUAL_KEYBOARD.append(divForKeyboardLine);
  if (Array.isArray(key)) {
    key.forEach((elemInKey) => {
      divForKeyboardLine.append(new KeyboardButton(elemInKey).generate());
    });
  } else {
    divForKeyboardLine.append(new KeyboardButton(key).generate());
  }
});
VIRTUAL_KEYBOARD.addEventListener('click', (event) => {
  const CAPSLOCK = event.target.closest('.control-key.CapsLock');
  const WHITE_SPACE = event.target.closest('.control-key.Space');
  const ENTER = event.target.closest('.control-key.Enter');
  const BACK_SPACE = event.target.closest('.control-key.BACKSPACE');
  const DELETE = event.target.closest('.control-key.Del');
  const ARROW_UP = event.target.closest('.control-key.ArrowUp');
  const ARROW_DOWN = event.target.closest('.control-key.ArrowDown');
  const ARROW_LEFT = event.target.closest('.control-key.ArrowLeft');
  const ARROW_RIGHT = event.target.closest('.control-key.ArrowRight');
  const TAB = event.target.closest('.control-key.Tab');
  const TEXT_KEY = event.target.closest('.text-key');
  const NUMBER_KEY = event.target.closest('.number-key');

  // ввод текста и цифр
  if (TEXT_KEY || NUMBER_KEY) {
    if (TEXT_KEY) insertAtCursor(TEXT_KEY.innerText[0], TEXT_AREA);
    else insertAtCursor(NUMBER_KEY.innerText[0], TEXT_AREA);
  }
  // нажатие кнопки Tab - создает отступ в 8 пробелов
  if (TAB) {
    insertAtCursor('        ', TEXT_AREA);
  }
  // нажатие CapsLock
  if (CAPSLOCK) {
    const lines = document.querySelectorAll('.virtual-keyboard__keyboard-line');
    if (!CAPSLOCK.classList.contains('active')) {
      lines.forEach((eOfLines) => {
        const spans = eOfLines.querySelectorAll('.virtual-keyboard__text-key');
        spans.forEach((eOfSpans) => {
          const span = eOfSpans;
          if (span.innerText.length === 1) {
            span.innerText = span.innerText.toUpperCase();
          }
        });
      });
      CAPSLOCK.classList.toggle('active');
    } else {
      lines.forEach((eOfLines) => {
        const spans = eOfLines.querySelectorAll('.virtual-keyboard__text-key');
        spans.forEach((eOfSpans) => {
          const span = eOfSpans;
          if (span.innerText.length === 1) {
            span.innerText = span.innerText.toLowerCase();
          }
        });
      });
      CAPSLOCK.classList.toggle('active');
    }
  }
  // нажатие пробела
  if (WHITE_SPACE) {
    insertAtCursor(' ', TEXT_AREA);
  }
  // нажатие стрелки Вверх
  if (ARROW_UP) {
    const START = TEXT_AREA.selectionStart;
    const widthRow = TEXT_AREA.cols + 2;
    TEXT_AREA.focus();
    if (START >= widthRow) {                    // проверка, что курсор в конце строки
      if (START === TEXT_AREA.value.length){
        TEXT_AREA.selectionStart -= widthRow + 1;
        TEXT_AREA.selectionEnd -= widthRow + 1;
      }else {
      TEXT_AREA.selectionStart -= widthRow;
      TEXT_AREA.selectionEnd -= widthRow;
      }
    }
  }
  // нажатие стрелки Вниз
  if (ARROW_DOWN) {
    const START = TEXT_AREA.selectionStart;
    const widthRow = TEXT_AREA.cols + 2;
    TEXT_AREA.focus();
    if (START + widthRow) {
      TEXT_AREA.selectionStart += widthRow;
    }
  }

  // нажатие стрелки влево
  if (ARROW_LEFT) {
    if (TEXT_AREA.value.length > 0) {
      TEXT_AREA.focus();
      TEXT_AREA.selectionStart -= 1;
      TEXT_AREA.selectionEnd -= 1;
    }
  }
  // нажатие стрелки вправо
  if (ARROW_RIGHT) {
    TEXT_AREA.focus();
    TEXT_AREA.selectionStart += 1;
  }
  // нажатие Enter
  if (ENTER) {
    insertAtCursor('\n', TEXT_AREA);
  }
  // нажатие BackSpace
  if (BACK_SPACE) {
    const START = TEXT_AREA.selectionStart;
    TEXT_AREA.focus();
    if (START) {
      TEXT_AREA.value = TEXT_AREA.value.substring(0, START - 1)
        + TEXT_AREA.value.substring(START, TEXT_AREA.value.length);
      TEXT_AREA.selectionStart = START - 1;
      TEXT_AREA.selectionEnd = START - 1;
    }
  }
  // нажатие на Del
  if (DELETE) {
    const START = TEXT_AREA.selectionStart;
    TEXT_AREA.focus();
    if (START) {
      TEXT_AREA.value =
        TEXT_AREA.value.substring(0, START) +
        TEXT_AREA.value.substring(START + 1, TEXT_AREA.value.length);
      TEXT_AREA.selectionStart = START;
      TEXT_AREA.selectionEnd = START;
    }
  }
});
VIRTUAL_KEYBOARD.addEventListener("mousedown", (event) => {
  const SHIFT = event.target.closest(".control-key.Shift");
  const CAPSLOCK = document.querySelector(".control-key.CapsLock");
  const Q = document.querySelector(".text-key.KeyQ");
  const isEnglish = Q.innerText.toLowerCase() === "q";
  if (SHIFT) {
    const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
    if (!CAPSLOCK.classList.contains("active")) {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          if (span.innerText.length === 1) {
            span.innerText = span.innerText.toUpperCase();
          }
          if (span.nextSibling) {
            if (isEnglish) {
              if (span.nextSibling.innerText) {
                span.innerText = "";
                span.nextSibling.innerText = KEYBOARD_EN[iOfLines][iOfSpans][1];
              } else {
                span.innerText = span.innerText.toUpperCase();
              }
            } else {
              if (span.nextSibling.innerText) {
                span.innerText = "";
                span.nextSibling.innerText = KEYBOARD_RU[iOfLines][iOfSpans][1];
              } else {
                span.innerText = span.innerText.toUpperCase();
              }
            }
          }
        });
      });
    } else {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          if (span.innerText.length === 1) {
            span.innerText = span.innerText.toLowerCase();
          }
          if (span.nextSibling) {
            if (isEnglish) {
              if (span.nextSibling.innerText) {
                span.innerText = "";
                span.nextSibling.innerText = KEYBOARD_EN[iOfLines][iOfSpans][1];
              } else {
                span.innerText = span.innerText.toLowerCase();
              }
            } else {
              if (span.nextSibling.innerText) {
                span.innerText = "";
                span.nextSibling.innerText = KEYBOARD_RU[iOfLines][iOfSpans][1];
              } else {
                span.innerText = span.innerText.toLowerCase();
              }
            }
          }
        });
      });
    }
  }
});
VIRTUAL_KEYBOARD.addEventListener("mouseup", (event) => {
  const SHIFT = event.target.closest(".control-key.Shift");
  const CAPSLOCK = document.querySelector(".control-key.CapsLock");
  const Q = document.querySelector(".text-key.KeyQ");
  const isEnglish = Q.innerText.toLowerCase() === "q";
  if (SHIFT) {
    const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
    if (!CAPSLOCK.classList.contains("active")) {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          if (span.innerText.length === 1) {
            span.innerText = span.innerText.toLowerCase();
          }
          if (span.nextSibling) {
            if (isEnglish) {
              [span.innerText, span.nextSibling.innerText] =
                KEYBOARD_EN[iOfLines][iOfSpans];
            } else {
              [span.innerText, span.nextSibling.innerText] =
                KEYBOARD_RU[iOfLines][iOfSpans];
            }
          }
        });
      });
    } else {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          if (span.innerText.length === 1) {
            span.innerText = span.innerText.toUpperCase();
          }
          if (span.nextSibling) {
            if (isEnglish) {
              [span.innerText, span.nextSibling.innerText] =
                KEYBOARD_EN[iOfLines][iOfSpans];
            } else {
              [span.innerText, span.nextSibling.innerText] =
                KEYBOARD_RU[iOfLines][iOfSpans];
              span.innerText = span.innerText.toUpperCase();
            }
          }
        });
      });
    }
  }
});

document.addEventListener("keydown", (event) => {
  const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
  const CAPSLOCK = document.querySelector(".control-key.CapsLock");
  const isCapslockActive = CAPSLOCK.classList.contains("active");
  const Q = document.querySelector(".text-key.KeyQ");
  const isEnglish = Q.innerText.toLowerCase() === "q";
  console.log(event.code,event.key);
  // нажатие shift+alt на клавиатуре
  if (event.shiftKey && event.altKey) {
    if (isEnglish) {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          const index = iOfSpans;
          if (Array.isArray(KEYBOARD_RU[iOfLines][index])) {
            [span.innerText, span.nextSibling.innerText] =
              KEYBOARD_RU[iOfLines][index];
            if (span.innerText.length === 1) {
              if (isCapslockActive) {
                span.innerText = span.innerText.toUpperCase();
                span.nextSibling.innerText =
                  span.nextSibling.innerText.toUpperCase();
              } else {
                span.innerText = span.innerText.toLowerCase();
                span.nextSibling.innerText =
                  span.nextSibling.innerText.toLowerCase();
              }
            }
          } else {
            span.innerText = KEYBOARD_RU[iOfLines][index];
            if (span.innerText.length === 1) {
              if (isCapslockActive) {
                span.innerText = span.innerText.toUpperCase();
              } else span.innerText = span.innerText.toLowerCase();
            }
          }
        });
      });
    } else {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          const index = iOfSpans;
          if (Array.isArray(KEYBOARD_EN[iOfLines][index])) {
            [span.innerText, span.nextSibling.innerText] =
              KEYBOARD_EN[iOfLines][index];
            if (span.innerText.length === 1) {
              if (isCapslockActive) {
                span.innerText = span.innerText.toUpperCase();
                span.nextSibling.innerText =
                  span.nextSibling.innerText.toUpperCase();
              } else {
                span.innerText = span.innerText.toLowerCase();
                span.nextSibling.innerText =
                  span.nextSibling.innerText.toLowerCase();
              }
            }
          } else {
            span.innerText = KEYBOARD_EN[iOfLines][index];
            if (span.innerText.length === 1) {
              if (isCapslockActive) {
                span.innerText = span.innerText.toUpperCase();
              } else span.innerText = span.innerText.toLowerCase();
            }
          }
        });
      });
    }
  }

  highlightButton(event.code);

});
document.addEventListener("keyup", (event) => {
  highlightButton(event.code,'uncheck');
})