// operand : 0-9 | operator : + - * /
const calculatorDisplay = document.querySelector("h1")
const inputBtn = document.querySelectorAll("button") // array
const clearBtn = document.getElementById("clear-btn")
// console.log(inputBtn)

const calculate = {
    "/" : (firstNumber, secondNumber) => secondNumber > 0 ? firstNumber / secondNumber : "error",
    "*" : (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+" : (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-" : (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=" : (firstNumber, secondNumber) => secondNumber
}

// operand operator operand => 2 + 2
let firstValue = 0 // first number
let operatorValue = '' // keep operator
let waitForNext = false // keep status of number and operator

function setNumberValue(number) {
    // console.log(number)
    // when pressing the button number affects this function
    // const displayValue = calculatorDisplay.textContent
    // console.log(displayValue) //0
    // calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number
    // 0 -> 7 = 7 | 7 -> 5 = 75
    if(waitForNext) {
        calculatorDisplay.textContent = number;
        waitForNext = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number
    }
}

function callOperator(operator) {
    // console.log(operator)
    // check operator
    const currentValue = Number(calculatorDisplay.textContent)
    if(operatorValue && waitForNext) {
        operatorValue = operator;
        return
    }
    if(!firstValue) {
        firstValue = currentValue; // default value
    }else {
        const result = calculate[operatorValue](firstValue,currentValue); //curr = second
        calculatorDisplay.textContent = result;
        firstValue = result;
        if(firstValue === "error") {
            resetAll();
        }
    }
    operatorValue = operator;
    waitForNext = true;
}
    

function addDecimal() {
    // console.log("decimal")
    // filter decimal : There can only be one point.
    if(waitForNext) return;
    if(!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// filter btn : operand or operator
inputBtn.forEach((input) => {
    // console.log(input.classList.length)
    // button number 0-9
    if(input.classList.length === 0) {
        input.addEventListener("click", () => setNumberValue(input.value))
    }else if(input.classList.contains("operator")) {
        input.addEventListener("click", () => callOperator(input.value))
    }else if(input.classList.contains("decimal")) {
        input.addEventListener("click", () => addDecimal())
    }
})

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    waitForNext = false;
    calculatorDisplay.textContent = "0"
}

clearBtn.addEventListener("click", () => resetAll())