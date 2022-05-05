const KEYBOARD_EN = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', [';', ':'], ["'", '"'], 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', [',', '<'], ['.', '>'], ['/', '?'], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const KEYBOARD_RU = [
  [['Ё', ''], ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', ['Х', ''], ['Ъ', ''], ['\\', '/'], 'Del'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', ['Ж', ''], ['Э', ''], 'Enter'],
  ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', ['Б', ''], ['Ю', ''], ['.', ','], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const VIRTUAL_KEYBOARD = document.createElement('div');
const TEXT_AREA = document.createElement('textarea');

class KeyboardButton {
  constructor(key, isCapslock, lang) {
    this.key = key;
    this.isCapslock = isCapslock;
    this.lang = lang;
  }

  generate() {
    let template = "";
    const buttonGen = document.createElement("div");
    buttonGen.classList.add("virtual-keyboard__button-wrapper");
    if (Array.isArray(this.key)) {
      template += `<button class="virtual-keyboard__key number-key"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
    } else if (this.key.length > 1) {
      template += `<button class="virtual-keyboard__key control-key key-${this.key}"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
    } else {
      template += `<button class="virtual-keyboard__key text-key key-${this.key}"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
    }

    buttonGen.innerHTML = template;
    return buttonGen;
  }
}

function insertAtCursor(text,target){
  let startPos = target.selectionStart;
  let endPos = target.selectionEnd;
  let result = "";
  target.focus();
  if ((startPos > 0)&&(endPos<target.value.length)) {
    target.value =
      target.value.substring(0, startPos) +
      text +
      target.value.substring(endPos, target.value.length);
      target.selectionStart =startPos+text.length;
      target.selectionEnd=endPos+text.length;
  } else {
    target.value += text;
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
VIRTUAL_KEYBOARD.addEventListener("click", (event) => {
  if (
    event.target.closest(".text-key") ||
    event.target.closest(".number-key")
  ) {
    event.target.closest(".text-key")
      ? (insertAtCursor(event.target.closest(".text-key").innerText[0],TEXT_AREA))
      : (insertAtCursor(event.target.closest(".number-key").innerText[0],TEXT_AREA));
  }
  if (event.target.closest(".control-key.key-Tab")){
    insertAtCursor('        ',TEXT_AREA);
  }
});
const buttonLanguage = document.createElement("button");
buttonLanguage.classList.add("but");
buttonLanguage.innerText = "EN";
document.body.append(buttonLanguage);

document.addEventListener("keydown", (event) => {
  const lines = document.querySelectorAll(".virtual-keyboard__keyboard-line");
  if (event.shiftKey && event.altKey) {
    if (buttonLanguage.innerText === "EN") {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          const index = iOfSpans;
          if (Array.isArray(KEYBOARD_RU[iOfLines][index])) {
            [span.innerText, span.nextSibling.innerText] =
              KEYBOARD_RU[iOfLines][index];
          } else {
            span.innerText = KEYBOARD_RU[iOfLines][index];
          }
        });
      });
      buttonLanguage.innerText = "RU";
    } else if (buttonLanguage.innerText === "RU") {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          const index = iOfSpans;
          if (Array.isArray(KEYBOARD_RU[iOfLines][index])) {
            [span.innerText, span.nextSibling.innerText] =
              KEYBOARD_EN[iOfLines][index];
          } else {
            span.innerText = KEYBOARD_EN[iOfLines][index];
          }
        });
      });
      buttonLanguage.innerText = "EN";
    }
  }
});
