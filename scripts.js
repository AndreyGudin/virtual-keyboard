const KEYBOARD_EN = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ['[', '{'], [']', '}'], ['\\', '|'], 'Del'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', [';', ':'], ["'", '"'], 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', [',', '<'], ['.', '>'], ['/', '?'], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const KEYBOARD_RU = [
  [['Ё',''], ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*`'], ['9', '(`'], ['0', ')'], ['-', '_'], ['=', '+'], 'BACKSPACE'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', ['Х',''], ['Ъ',''], ['\\', '/'], 'Del'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', ['Ж',''], ['Э',''], 'Enter'],
  ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', ['Б',''], ['Ю',''], ['.', ','], 'ArrowUp', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'WhiteSpace', 'Alt', 'Ctrl', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];
const DIV_WRAPPER = document.createElement('div');
class KeyboardButton {
  constructor(key, isCapslock, lang) {
    this.key = key;
    this.isCapslock = isCapslock;
    this.lang = lang;
  }

  generate() {
    let template = '';
    const buttonGen = document.createElement('div');
    buttonGen.classList.add('virtual-keyboard__button-wrapper');
    if (Array.isArray(this.key)) {
      template += `<button class="virtual-keyboard__key number-key"><span class="virtual-keyboard__text-key">${this.key[0]}</span><span>${this.key[1]}</span></button>`;
    } else if (this.key.length > 1) {
      template += `<button class="virtual-keyboard__key control-key-${this.key}"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
    } else {
      template += `<button class="virtual-keyboard__key text-key key-${this.key}"><span class="virtual-keyboard__text-key">${this.key}</span></button>`;
    }

    buttonGen.innerHTML = template;
    return buttonGen;
  }
}

DIV_WRAPPER.classList.add("virtual-keyboard");
document.body.append(DIV_WRAPPER);

KEYBOARD_EN.forEach((key) => {
  const divForKeyboardLine = document.createElement('div');
  divForKeyboardLine.classList.add(`virtual-keyboard__keyboard-line`);
  DIV_WRAPPER.append(divForKeyboardLine);
  if (Array.isArray(key)) {
    key.forEach((elemInKey) => {
      divForKeyboardLine.append(new KeyboardButton(elemInKey).generate());
    });
  } else {
    divForKeyboardLine.append(new KeyboardButton(key).generate());
  }
});

let buttonLanguage=document.createElement("button");
buttonLanguage.classList.add("but");
buttonLanguage.innerText = "EN";
document.body.append(buttonLanguage);

document.addEventListener("keydown",(event)=>{
  let lines=document.querySelectorAll(".virtual-keyboard__keyboard-line");
  console.log(event);
  if ((event.shiftKey)&&(event.altKey)){
    if (buttonLanguage.innerText === "EN"){
      lines.forEach((elemOfLines,indexOfLines)=>{
        let spans=elemOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((elemOfSpans,indexOfSpans)=>{
          if (Array.isArray(KEYBOARD_RU[indexOfLines][indexOfSpans])){
            elemOfSpans.innerText = KEYBOARD_RU[indexOfLines][indexOfSpans][0];
            elemOfSpans.nextSibling.innerText = KEYBOARD_RU[indexOfLines][indexOfSpans][1];
          } else{
              elemOfSpans.innerText = KEYBOARD_RU[indexOfLines][indexOfSpans];
          }
        })
      });
      buttonLanguage.innerText = "RU";
  }else if ((buttonLanguage.innerText === "RU")){
      lines.forEach((elemOfLines,indexOfLines)=>{
        let spans=elemOfLines.querySelectorAll(".virtual-keyboard__text-key");
        spans.forEach((elemOfSpans,indexOfSpans)=>{
          if (Array.isArray(KEYBOARD_RU[indexOfLines][indexOfSpans])){
            elemOfSpans.innerText = KEYBOARD_EN[indexOfLines][indexOfSpans][0];
            elemOfSpans.nextSibling.innerText = KEYBOARD_EN[indexOfLines][indexOfSpans][1];
          } else{
          elemOfSpans.innerText = KEYBOARD_EN[indexOfLines][indexOfSpans];
          }
        })
      });
      buttonLanguage.innerText= "EN";
    }
  }
});