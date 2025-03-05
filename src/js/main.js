window.addEventListener('DOMContentLoaded', () => {
  const operationKeys = document.querySelectorAll('.digit, .operator');
  const resetBtn = document.querySelector('#reset');
  const display = document.querySelector('.current-value');
  const deleteBtn = document.querySelector('#del');
  const equalBtn = document.querySelector('#equal');
  const themeSwitchers = document.querySelectorAll(
    '.theme-slider input[type="radio"]',
  );

  function getLastCharacter() {
    return display.textContent[display.textContent.length - 1];
  }

  function updateDisplay(value, eraseCurentValue = false) {
    const isOperatorTest = /\D$/;
    if (eraseCurentValue) {
      display.textContent = '';
    } else if (
      isOperatorTest.test(getLastCharacter()) &&
      isOperatorTest.test(value) &&
      value !== getLastCharacter()
    ) {
      display.textContent = display.textContent.slice(0, -1);
    }

    display.textContent += value;
  }

  function isTriggeredByOperatorKey(e) {
    return e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/';
  }

  function displayedValueIsZeroOrWhitespace(node) {
    return (
      node.textContent === '0' ||
      node.textContent.trim() === '' ||
      node.innerHTML === '&nbsp;'
    );
  }
  operationKeys.forEach((key) => {
    key.addEventListener('click', () => {
      if (
        key.classList.contains('operator') &&
        (displayedValueIsZeroOrWhitespace(display) ||
          getLastCharacter() === key.textContent)
      )
        return;
      updateDisplay(key.textContent);
    });
  });

  deleteBtn.addEventListener('click', () => {
    if (display.innerHTML === '&nbsp;') return;
    updateDisplay(display.textContent.slice(0, -1), true);
  });

  equalBtn.addEventListener('click', () => {
    if (display.innerHTML === '&nbsp;' || display.textContent.trim() === '')
      return;
    updateDisplay(
      eval(display.textContent.trimStart().replace(/x/g, '*')),
      true,
    );
  });

  resetBtn.addEventListener('click', () => {
    display.innerHTML = '&nbsp;';
  });

  window.addEventListener('keydown', (e) => {
    const isOperatorKey = isTriggeredByOperatorKey(e);
    if (isOperatorKey || (e.key >= 0 && e.key <= 9)) {
      if (
        isOperatorKey &&
        (displayedValueIsZeroOrWhitespace(display) ||
          getLastCharacter() === e.key)
      ) {
        return;
      }
      updateDisplay(e.key);
    } else if (e.key === 'Backspace') {
      updateDisplay(display.textContent.slice(0, -1), true);
    } else if (e.key === 'Enter') {
      if (display.innerHTML === '&nbsp;' || display.textContent.trim() === '')
        return;
      updateDisplay(eval(display.textContent.trimStart()), true);
    }
  });

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.className = 'theme-3';
    document.querySelector('#theme-3').checked = true;
  } else {
    document.documentElement.className = 'theme-1';
    document.querySelector('#theme-1').checked = true;
  }

  themeSwitchers.forEach((themeSwitcher) => {
    themeSwitcher.addEventListener('change', () => {
      document.documentElement.className = themeSwitcher.value;
    });
  });
});
