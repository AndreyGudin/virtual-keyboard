const KEYBOARD_EN = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [';', ':'], ["'", '"'], 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', [',', '<'], ['.', '>'], ['/', '?'], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const KEYBOARD_RU = [
  [['Ё', ''], ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', ['х', ''], ['ъ', ''], ['\\', '/'], 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', ['ж', ''], ['э', ''], 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', ['б', ''], ['ю', ''], ['.', ','], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const VIRTUAL_KEYBOARD = document.createElement('div');
const TEXT_AREA = document.createElement('textarea');

class KeyboardButton {
  constructor(key, isCapslock, lang) {
    this.key = key;
    this.lang = lang;
  }

  generate() {
    let template = '';
    const buttonGen = document.createElement('div');
    buttonGen.classList.add('virtual-keyboard__button-wrapper');
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

VIRTUAL_KEYBOARD.classList.add('virtual-keyboard');
TEXT_AREA.classList.add('virtual-keyboard__text-area');

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
  const CAPSLOCK = event.target.closest('.control-key.key-CapsLock');
  const TAB = event.target.closest('.control-key.key-Tab');
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
});
const buttonLanguage = document.createElement('button');
buttonLanguage.classList.add('but');
buttonLanguage.innerText = 'EN';
document.body.append(buttonLanguage);

document.addEventListener('keydown', (event) => {
  const lines = document.querySelectorAll('.virtual-keyboard__keyboard-line');
  const CAPSLOCK = document.querySelector('.control-key.key-CapsLock');
  const isCapslockActive = CAPSLOCK.classList.contains('active');
  // нажатие shift+alt на клавиатуре
  if (event.shiftKey && event.altKey) {
    if (buttonLanguage.innerText === 'EN') {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll('.virtual-keyboard__text-key');
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          const index = iOfSpans;
          if (Array.isArray(KEYBOARD_RU[iOfLines][index])) {
            [span.innerText, span.nextSibling.innerText] = KEYBOARD_RU[iOfLines][index];
            if (span.innerText.length === 1) {
              if (isCapslockActive) {
                span.innerText = span.innerText.toUpperCase();
                span.nextSibling.innerText = span.nextSibling.innerText.toUpperCase();
              } else {
                span.innerText = span.innerText.toLowerCase();
                span.nextSibling.innerText = span.nextSibling.innerText.toLowerCase();
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
      buttonLanguage.innerText = 'RU';
    } else if (buttonLanguage.innerText === 'RU') {
      lines.forEach((eOfLines, iOfLines) => {
        const spans = eOfLines.querySelectorAll('.virtual-keyboard__text-key');
        spans.forEach((eOfSpans, iOfSpans) => {
          const span = eOfSpans;
          const index = iOfSpans;
          if (Array.isArray(KEYBOARD_EN[iOfLines][index])) {
            [span.innerText, span.nextSibling.innerText] = KEYBOARD_EN[iOfLines][index];
            if (span.innerText.length === 1) {
              if (isCapslockActive) {
                span.innerText = span.innerText.toUpperCase();
                span.nextSibling.innerText = span.nextSibling.innerText.toUpperCase();
              } else {
                span.innerText = span.innerText.toLowerCase();
                span.nextSibling.innerText = span.nextSibling.innerText.toLowerCase();
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
      buttonLanguage.innerText = 'EN';
    }
  }
});
