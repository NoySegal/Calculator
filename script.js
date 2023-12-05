const calcInput = document.querySelector(".screen");
const allButtons = document.querySelectorAll(".button");
const operators = ["+", "-", "x", "/"];
calcInput.innerText = "0";
let a = 0;
let currentVariable = "a";
let operator = "";
let previousOperator = "";
let lastButtonClicked;
let b = 0;
let currentNumber = 0;
let res = 0;

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.dataset.value;

    // handle clear
    if (value == "clear") {
      clear();
      return;
    }

    // handle decimal entry
    if (value == "." && !calcInput.innerText.includes(".")) {
      calcInput.innerText += value;
    }

    // handle last operator click background color
    if (isLastButtonOperator()) {
      lastButtonClicked.style.background = "black";
    }

    // handle numeric entry
    if (isNumeric(value)) {
      if (isLastButtonOperator()) {
        calcInput.innerText = "";
      }
      if (value != "0" || calcInput.innerText != "0") {
        if (calcInput.innerText === "0") {
          calcInput.innerText = "";
        }
        calcInput.innerText += value;
        currentNumber = parseFloat(calcInput.innerText);
      }
    }

    // handle operator
    if (isOperation(value)) {
      button.style.background = "darkgray";
      operator = value;
      updateVariables();
      console.log(operator);

      // do calculation on the numbers with the previous operator
      if (previousOperator != "") {
        console.log(a, previousOperator, b);
        res = operate(previousOperator, a, b);
        calcInput.innerText = res;
        a = res;
        currentNumber = res;
        currentVariable = "b";
        b = 0;
      }
      previousOperator = operator;
    }

    // handle equals button
    if (value === "=") {
      if (operator === "") {
        return;
      }
      updateVariables();
      console.log(a, operator, b);
      res = operate(operator, a, b);
      res = parseFloat(res.toFixed(2));
      calcInput.innerText = res;
      a = res;
      currentNumber = res;
      b = 0;
      operator = "";
      previousOperator = "";
    }

    lastButtonClicked = button;
  });
});

function isLastButtonOperator() {
  return lastButtonClicked && isOperation(lastButtonClicked.innerText);
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function isOperation(str) {
  return operators.includes(str);
}

function clear() {
  if (lastButtonClicked) {
    lastButtonClicked.style.background = "black";
  }
  currentVariable = "a";
  a = 0;
  b = 0;
  currentNumber = 0;
  res = 0;
  calcInput.innerText = "0";
  operator = "";
  firstNumberWasSet = false;
}

function updateVariables() {
  console.log(currentVariable, currentNumber);
  if (currentVariable === "a") {
    currentVariable = "b";
    a = currentNumber;
    currentNumber = 0;
  } else {
    currentVariable = "a";
    b = currentNumber;
    currentNumber = 0;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "x":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    default:
      break;
  }
};
