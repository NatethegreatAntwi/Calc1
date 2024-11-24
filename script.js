// Select the display element
const display = document.getElementById('display');

// Select the calculator container
const calculator = document.querySelector('.calculator');

// Select all buttons
const buttons = document.querySelectorAll('.btn');

// Variables to store calculator state
let currentInput = '';
let previousInput = '';
let operator = null;
let resultDisplayed = false;

// Add event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // Handle the clear button (C)
    if (value === 'C') {
      resetCalculator();
      return;
    }

    // Handle the equal button (=)
    if (value === '=') {
      if (currentInput && previousInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        displayResult(result);
        checkDisplayOverflow(result); // Check if the result overflows the display
      }
      return;
    }

    // Handle operator buttons (+, -, *, /)
    if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        if (previousInput && operator) {
          previousInput = calculate(previousInput, currentInput, operator);
          display.textContent = previousInput;
        } else {
          previousInput = currentInput;
        }
        operator = value;
        currentInput = '';
      }
      return;
    }

    // Handle numbers and the decimal point
    if (value === '.' && currentInput.includes('.')) {
      return;
    }

    if (resultDisplayed) {
      currentInput = '';
      resultDisplayed = false;
    }

    currentInput += value;
    display.textContent = currentInput || '0';
    checkDisplayOverflow(currentInput); // Check if the current input overflows the display
  });
});

// Function to reset the calculator
function resetCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  resultDisplayed = false;
  display.textContent = '0';
  resetCalculatorSize(); // Reset calculator size when cleared
}

// Function to display the result
function displayResult(result) {
  currentInput = result;
  previousInput = '';
  operator = null;
  display.textContent = result;
  resultDisplayed = true;
}

// Function to perform calculations
function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b !== 0 ? (a / b).toString() : 'Error';
    default:
      return '0';
  }
}

// Function to check if the display content overflows
function checkDisplayOverflow(content) {
  const displayWidth = display.offsetWidth; // Get the current width of the display
  const contentWidth = getTextWidth(content, getComputedStyle(display).font); // Get the width of the content
}
  if (contentWidth > displayWidth) {
    growCalculator(); // Trigger the grow effect
  
  }