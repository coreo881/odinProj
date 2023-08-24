//null because nothing has been pressed yet
let operator = null;
let firstOperand = 0;
let secondOperand = 0;
let userInputDisplay = "0";
let results = null;
let resultsDisplay = "0";

const buttons = document.querySelectorAll(".buttons button");
const userInput = document.querySelector("#user-input");
const resultsContainer = document.querySelector("#result");

initButtons(buttons);

function initButtons(buttons) {
    buttons.forEach((button) => {
        if (button.classList.contains("operator")) {
            button.addEventListener("click", () => {
                let key = Object.keys(button.dataset);
                let value = Object.values(button.dataset);

                console.log(`key: ${key}, value: ${value}`);

                // FOOTNOTE 3

                // commit to operator variable
                if (operator !== null) {
                    return;
                } else {
                    operator = value;
                }

                // update userinput display variable with operator
                userInputDisplay += ` ${operator} `;

                // update userinput display
                userInput.textContent = userInputDisplay;
            });
        } else if (button.classList.contains("operand")) {
            button.addEventListener("click", () => {
                let key = Object.keys(button.dataset);
                let value = Object.values(button.dataset);

                console.log(`key: ${key}, value: ${value}`);

                if (operator === null) {
                    // commit to operand 1 variable.
                    //FOOTNOTE 1
                    firstOperand = parseInt(firstOperand + "" + value);
                    console.log(`Commiting to firstOperand: ${firstOperand}`);

                    // commit to userinput display variable
                    //FOOTNOTE 2
                    if (userInputDisplay === "0") {
                        if (value > 0) {
                            userInputDisplay = "" + value;
                        } else {
                            return;
                        }
                    } else {
                        userInputDisplay += value;
                    }

                    // update userinput display
                    userInput.textContent = userInputDisplay;
                } else if (operator !== null) {
                    // commit to operand 2 variable.
                    secondOperand = parseInt(secondOperand + "" + value);
                    console.log(
                        `Committing to secondOperand: ${secondOperand}`
                    );

                    // commit to userinput display variable
                    if (userInputDisplay === "0") {
                        if (value > 0) {
                            userInputDisplay = "" + value;
                        } else {
                            return;
                        }
                    } else {
                        userInputDisplay += value;
                    }

                    // update userinput display
                    userInput.textContent = userInputDisplay;
                }
            });
        } else if (button.classList.contains("equalBtn")) {
            button.addEventListener("click", () => {
                console.log(
                    `
                firstOperand: ${firstOperand},
                secondOperand: ${secondOperand}
                operator: ${operator}
                typof ${typeof operator}`
                );

                // equate value
                results = operate(firstOperand, secondOperand, operator);

                // FOOTNOTE 3
                // set first operand to 0
                firstOperand = 0;

                // set second operand to 0
                secondOperand = 0;

                // commit equated value to results display variable
                resultsDisplay = results.toString();

                // set operator variable to null
                operator = null;

                // clear userinput display variable and userinput display
                userInputDisplay = "0";
                userInput.textContent = "";

                // update results display
                resultsContainer.textContent = resultsDisplay;

                console.log(`
                results: ${results},
                resultsDisplay: ${resultsDisplay}`);
            });
        } else if (button.classList.contains("clear")) {
            button.addEventListener("click", () => {
                operator = null;
                firstOperand = 0;
                secondOperand = 0;
                userInputDisplay = "0";
                results = null;
                resultsDisplay = "0";
                userInput.textContent = "";
                resultsContainer.textContent = resultsDisplay;
            });
        }
    });
}

// OPERATIONS
function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}

// OPERATE
function operate(num1, num2, operation) {
    // operation = "" + operation;
    switch (operation.toString()) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "×":
            return multiply(num1, num2);
            break;
        case "÷":
            return divide(num1, num2);
            break;
    }
}

function clearAllData() {
    // do stuff
}
