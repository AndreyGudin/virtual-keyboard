const KEYBOARD_EN = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ["'", '"'], 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], '⇧', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⇦', '⇩', '⇨'],
];
const KEYBOARD_RU = [
  [['ё', ''], ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', ['х', ''], ['ъ', ''], ['\\', '/'], 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', ['ж', ''], ['э', ''], 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', ['б', ''], ['ю', ''], ['.', ','], '⇧', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⇦', '⇩', '⇨'],
];
const VIRTUAL_KEYBOARD = document.createElement("div");
const TEXT_AREA = document.createElement("textarea");

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
      } else if (this.key[0] === "-") {
        template += `<button class="virtual-keyboard__key number-key Minus"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else if (this.key[0] === "=") {
        template += `<button class="virtual-keyboard__key number-key Equal"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
      } else {
        template += `<button class="virtual-keyboard__key number-key Digit${this.key[0]}"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
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
      } else if (this.key ==='⇦'){
        template += `<button class="virtual-keyboard__key control-key ArrowLeft"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
      } else if (this.key ==='⇧'){
        template += `<button class="virtual-keyboard__key control-key ArrowUp"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
      } else if (this.key ==='⇨'){
        template += `<button class="virtual-keyboard__key control-key ArrowRight"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
      } else if (this.key ==='⇩'){
        template += `<button class="virtual-keyboard__key control-key ArrowDown"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
      }
      else {
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
  if (startPos > 0 && endPos < target.value.length) {
    target.value =
      target.value.substring(0, startPos) +
      text +
      target.value.substring(endPos, target.value.length);
    target.selectionStart = startPos + text.length;
    target.selectionEnd = endPos + text.length;
  } else {
    target.value += text;
  }
}

function highlightButton(key, param = "highlight") {
  let buttonLighted;
  if (key === "ControlLeft" || key === "ControlRight") {
    buttonLighted = document.querySelector(
      `.virtual-keyboard__key.Ctrl${key.substring(7)}`
    );
    if (!buttonLighted.classList.contains("highlight")) {
      buttonLighted.classList.add("highlight");
    } else if (param === "uncheck") {
      buttonLighted.classList.remove("highlight");
    }
  } else if (key === "Delete") {
    buttonLighted = document.querySelector(".virtual-keyboard__key.Del");
    if (!buttonLighted.classList.contains("highlight")) {
      buttonLighted.classList.add("highlight");
    } else if (param === "uncheck") {
      buttonLighted.classList.remove("highlight");
    }
  } else if (key === "MetaLeft" || key === "MetaRight") {
    buttonLighted = document.querySelector(".virtual-keyboard__key.WinLeft");
    if (!buttonLighted.classList.contains("highlight")) {
      buttonLighted.classList.add("highlight");
    } else if (param === "uncheck") {
      buttonLighted.classList.remove("highlight");
    }
  } else if (document.querySelector(`.virtual-keyboard__key.${key}`)) {
    buttonLighted = document.querySelector(`.virtual-keyboard__key.${key}`);
    if (!buttonLighted.classList.contains("highlight")) {
      buttonLighted.classList.add("highlight");
    } else if (param === "uncheck") {
      buttonLighted.classList.remove("highlight");
    }
  }
}

function pressCapsLock(button) {
  const SHIFT_LEFT = document.querySelector(".control-key.ShiftLeft");
  const SHIFT_RIGHT = document.querySelector(".control-key.ShiftRight");
  const PressedShift = (SHIFT_LEFT.classList.contains('active'))||(SHIFT_RIGHT.classList.contains('active'));
  const changeToUpperCase = () =>{
    const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
    lines.forEach((eOfLines) => {
      const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
      spans.forEach((eOfSpans) => {
        const span = eOfSpans;
        if (span.innerText.length === 1) {
          span.innerText = span.innerText.toUpperCase();
        }
      });
    });
  }
  const changeToLowerCase = () =>{
    const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
    lines.forEach((eOfLines) => {
      const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
      spans.forEach((eOfSpans) => {
        const span = eOfSpans;
        if (span.innerText.length === 1) {
          span.innerText = span.innerText.toLowerCase();
        }
      });
    });
  }
  if (!button.classList.contains("active")) {
    if (PressedShift){
      changeToLowerCase()
      button.classList.add("active");
      button.classList.add("highlight");
    } else {
      changeToUpperCase();
      button.classList.add("active");
      button.classList.add("highlight");
    }
  } else {
    if (PressedShift){
      changeToUpperCase();
      button.classList.remove("active");
      button.classList.remove("highlight");
    }else{
      changeToLowerCase()
      button.classList.remove("active");
      button.classList.remove("highlight");
  }
  }
}

function pressShift(button) {
  const CAPSLOCK = document.querySelector(".control-key.CapsLock");
  const Q = document.querySelector(".text-key.KeyQ");
  const isEnglish = Q.innerText.toLowerCase() === "q";
  const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
  const SHIFT_LEFT = document.querySelector(".control-key.ShiftLeft");
  const SHIFT_RIGHT = document.querySelector(".control-key.ShiftRight");
  if ((!button.classList.contains("active"))&&(!SHIFT_LEFT.classList.contains("active"))&&(!SHIFT_RIGHT.classList.contains("active"))) {
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
                [, span.nextSibling.innerText] =
                  KEYBOARD_EN[iOfLines][iOfSpans];
              } else {
                span.innerText = span.innerText.toUpperCase();
              }
            } else if (span.nextSibling.innerText) {
              span.innerText = "";
              [, span.nextSibling.innerText] = KEYBOARD_RU[iOfLines][iOfSpans];
            } else {
              span.innerText = span.innerText.toUpperCase();
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
                [, span.nextSibling.innerText] =
                  KEYBOARD_EN[iOfLines][iOfSpans];
              } else {
                span.innerText = span.innerText.toLowerCase();
              }
            } else if (span.nextSibling.innerText) {
              span.innerText = "";
              [, span.nextSibling.innerText] = KEYBOARD_RU[iOfLines][iOfSpans];
            } else {
              span.innerText = span.innerText.toLowerCase();
            }
          }
        });
      });
    }
    button.classList.add("active");
    button.classList.add("highlight");
  } else {
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
    button.classList.remove("active");
    if (SHIFT_LEFT.classList.contains("active")){
      SHIFT_LEFT.classList.remove("active");
    }
    if (SHIFT_LEFT.classList.contains("active")){
      SHIFT_LEFT.classList.remove("active");
    }
    if (SHIFT_LEFT.classList.contains("highlight")){
      SHIFT_LEFT.classList.remove("highlight");
    }
    if (SHIFT_RIGHT.classList.contains("highlight")){
      console.log('right');
      SHIFT_RIGHT.classList.remove("highlight");
    }
  }
}

VIRTUAL_KEYBOARD.classList.add("virtual-keyboard");
TEXT_AREA.classList.add("virtual-keyboard__text-area");
document.body.append(TEXT_AREA);
document.body.append(VIRTUAL_KEYBOARD);

KEYBOARD_EN.forEach((key) => {
  const divForKeyboardLine = document.createElement("div");
  divForKeyboardLine.classList.add("virtual-keyboard__keyboard-line");
  VIRTUAL_KEYBOARD.append(divForKeyboardLine);
  if (Array.isArray(key)) {
    key.forEach((elemInKey) => {
      divForKeyboardLine.append(new KeyboardButton(elemInKey).generate());
    });
  } else {
    divForKeyboardLine.append(new KeyboardButton(key).generate());
  }
});
TEXT_AREA.focus();

VIRTUAL_KEYBOARD.addEventListener("click", (event) => {
  const CAPSLOCK = event.target.closest(".control-key.CapsLock");
  const WHITE_SPACE = event.target.closest(".control-key.Space");
  const ENTER = event.target.closest(".control-key.Enter");
  const BACK_SPACE = event.target.closest(".control-key.BACKSPACE");
  const DELETE = event.target.closest(".control-key.Del");
  const ARROW_UP = event.target.closest(".control-key.ArrowUp");
  const ARROW_DOWN = event.target.closest(".control-key.ArrowDown");
  const ARROW_LEFT = event.target.closest(".control-key.ArrowLeft");
  const ARROW_RIGHT = event.target.closest(".control-key.ArrowRight");
  const TAB = event.target.closest(".control-key.Tab");
  const SHIFT_LEFT = event.target.closest(".control-key.ShiftLeft");
  const SHIFT_RIGHT = event.target.closest(".control-key.ShiftRight");
  let SHIFT;
  const TEXT_KEY = event.target.closest(".text-key");
  const NUMBER_KEY = event.target.closest(".number-key");

  // ввод текста и цифр
  if (TEXT_KEY || NUMBER_KEY) {
    if (TEXT_KEY) insertAtCursor(TEXT_KEY.innerText[0], TEXT_AREA);
    else insertAtCursor(NUMBER_KEY.innerText[0], TEXT_AREA);
  }
  // нажатие кнопки Tab - создает отступ в 8 пробелов
  if (TAB) {
    insertAtCursor("        ", TEXT_AREA);
  }
  // нажатие CapsLock
  if (CAPSLOCK) {
    pressCapsLock(CAPSLOCK);
  }
  // нажатие пробела
  if (WHITE_SPACE) {
    insertAtCursor(" ", TEXT_AREA);
  }
  // нажатие стрелки Вверх
  if (ARROW_UP) {
    const START = TEXT_AREA.selectionStart;
    const widthRow = TEXT_AREA.cols + 2;
    TEXT_AREA.focus();
    if (START >= widthRow) {
      // проверка, что курсор в конце строки
      if (START === TEXT_AREA.value.length) {
        TEXT_AREA.selectionStart -= widthRow + 1;
        TEXT_AREA.selectionEnd -= widthRow + 1;
      } else {
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
    insertAtCursor("\n", TEXT_AREA);
  }
  // нажатие BackSpace
  if (BACK_SPACE) {
    console.log(TEXT_AREA.selectionStart,TEXT_AREA.selectionEnd);
    const START = TEXT_AREA.selectionStart;
    const END = TEXT_AREA.selectionEnd;
    TEXT_AREA.focus();
    if ((START)&&(START === END)) {
      TEXT_AREA.value =
        TEXT_AREA.value.substring(0, START - 1) +
        TEXT_AREA.value.substring(START, TEXT_AREA.value.length);
      TEXT_AREA.selectionStart = START - 1;
      TEXT_AREA.selectionEnd = START - 1;
    }else if (END > START){
      TEXT_AREA.value = TEXT_AREA.value.substring(0, START - 1) + 
      TEXT_AREA.value.substring(END, TEXT_AREA.value.length);
    }
  }
  // нажатие на Del
  if (DELETE) {
    const START = TEXT_AREA.selectionStart;
    const END = TEXT_AREA.selectionEnd;
    TEXT_AREA.focus();
    if ((START)&&(START === END)) {
      TEXT_AREA.value =
        TEXT_AREA.value.substring(0, START) +
        TEXT_AREA.value.substring(START + 1, TEXT_AREA.value.length);
      TEXT_AREA.selectionStart = START;
      TEXT_AREA.selectionEnd = START;
    }else if (END > START){
      TEXT_AREA.value = TEXT_AREA.value.substring(0, START - 1) + 
      TEXT_AREA.value.substring(END, TEXT_AREA.value.length);
    }
  }
  if (SHIFT_LEFT) SHIFT = SHIFT_LEFT;
  else SHIFT = SHIFT_RIGHT;
  if (SHIFT) {
    pressShift(SHIFT);
  }
});

VIRTUAL_KEYBOARD.addEventListener("mousedown", (event) => {
  let BUTTON;
  if (event.target.closest(".virtual-keyboard__key")) {
    BUTTON = event.target.closest(".virtual-keyboard__key");
    if (
      !(BUTTON.classList[2] === "ShiftLeft") &&
      !(BUTTON.classList[2] === "ShiftRight") &&
      !(BUTTON.classList[2] === "CapsLock")
    ) {
      highlightButton(BUTTON.classList[2]);
    }
  }
});

VIRTUAL_KEYBOARD.addEventListener("mouseup", (event) => {
  let BUTTON;
  if (event.target.closest(".virtual-keyboard__key")) {
    BUTTON = event.target.closest(".virtual-keyboard__key");
    if (
      !(BUTTON.classList[2] === "ShiftLeft") &&
      !(BUTTON.classList[2] === "ShiftRight") &&
      !(BUTTON.classList[2] === "CapsLock")
    ) {
      highlightButton(BUTTON.classList[2], "uncheck");
    }
  }
});

let isShiftPressed = true;

document.addEventListener("keydown", (event) => {
  const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
  const CAPSLOCK = document.querySelector(".control-key.CapsLock");
  const isCapslockActive = CAPSLOCK.classList.contains("active");
  const Q = document.querySelector(".text-key.KeyQ");
  const isEnglish = Q.innerText.toLowerCase() === "q";
  TEXT_AREA.focus();
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
  if (event.shiftKey) {
    if (isShiftPressed) {
      isShiftPressed = false;
      pressShift(document.querySelector(`.control-key.${event.code}`));
    }
  }
  if (event.code === "CapsLock") {
    pressCapsLock(document.querySelector(`.control-key.${event.code}`));
  }
  if (event.code === "Tab") {
    event.preventDefault();
    insertAtCursor("        ", TEXT_AREA);
  }
  if (!(event.code === "CapsLock")) {
    highlightButton(event.code);
  }
});

document.addEventListener("keyup", (event) => {
  isShiftPressed = true;
  
  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    pressShift(document.querySelector(`.control-key.${event.code}`));
  }
  if (!(event.code === "CapsLock")&&!(event.code === "ShiftLeft")&&!(event.code === "ShiftRight")) {
    highlightButton(event.code, "uncheck");
  }
});

