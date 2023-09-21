// OPERATIONS
const ADD = (num1, num2) => num1 + num2;
const SUBTRACT = (num1, num2) => num1 - num2;
const MULTIPLY = (num1, num2) => num1 * num2;
const DIVIDE = (num1, num2) => num1 / num2;

//null because nothing has been pressed yet
let operator = null;
let firstOperand = 0;
let secondOperand = 0;
let userInputDisplay = "0";
let results = null;
let resultsDisplay = "0";
let doesDecimalExist = false;

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

                doesDecimalExist = false;

                console.log(`key: ${key}, value: ${value}`);

                // FOOTNOTE 3

                // FOOTNOTE 4

                // check to see if operator was pressed
                if (operator !== null) {
                    // YES

                    // commit equated value to results variable
                    results = operate(firstOperand, secondOperand, operator);

                    // set operand 1 to results value
                    firstOperand = results;

                    // set operand 2 to zero
                    secondOperand = 0;

                    // set operator to new operator
                    operator = value;

                    // update userinput display variable
                    userInputDisplay = `${firstOperand} `;

                    // update results display variable
                    resultsDisplay = results.toString();

                    // update userinput display
                    userInput.textContent = userInputDisplay;

                    // update results display
                    resultsContainer.textContent = resultsDisplay;
                } else if (firstOperand === 0 && results !== null) {
                    // set operand 1 to results value
                    firstOperand = results;

                    // set operator to new operator
                    operator = value;

                    // update userinput display variable
                    userInputDisplay = `${firstOperand} `;

                    // update userinput display
                    userInput.textContent = userInputDisplay;
                } else {
                    // NO
                    // commit to operator variable
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

                    //FOOTNOTE 4
                    if (!doesDecimalExist) {
                        firstOperand = parseInt(firstOperand + "" + value);
                    } else {
                        console.log(firstOperand + "." + value);

                        if (Number.isInteger(firstOperand)) {
                            firstOperand = parseFloat(
                                firstOperand + "." + value
                            );
                        } else {
                            firstOperand = parseFloat(
                                firstOperand + "" + value
                            );
                        }

                        console.log(Number.isInteger(firstOperand));
                    }
                    console.log(`Commiting to firstOperand: ${firstOperand}`);

                    // commit to userinput display variable
                    //FOOTNOTE 2
                    if (userInputDisplay.toString() === "0") {
                        if (value > 0) {
                            userInputDisplay = value.toString();
                        } else {
                            return;
                        }
                    } else {
                        userInputDisplay += value.toString();
                        console.log(userInputDisplay);
                    }

                    // update userinput display
                    userInput.textContent = userInputDisplay;
                } else if (operator !== null) {
                    // commit to operand 2 variable.

                    if (!doesDecimalExist) {
                        secondOperand = parseInt(secondOperand + "" + value);
                    } else {
                        console.log(secondOperand + "." + value);

                        if (Number.isInteger(secondOperand)) {
                            secondOperand = parseFloat(
                                secondOperand + "." + value
                            );
                        } else {
                            secondOperand = parseFloat(
                                secondOperand + "" + value
                            );
                        }

                        console.log(Number.isInteger(secondOperand));
                    }
                    console.log(
                        `Committing to secondOperand: ${secondOperand}`
                    );

                    // commit to userinput display variable
                    userInputDisplay = `${firstOperand} ${operator} ${secondOperand}`;

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

                let decimalPlaces = 0;

                if (
                    firstOperand.toString().length >
                        secondOperand.toString().length ||
                    firstOperand.toString().length ==
                        secondOperand.toString().length
                ) {
                    console.log(
                        firstOperand.toString().length,
                        secondOperand.toString().length
                    );
                    decimalPlaces = countDecimals(firstOperand);
                } else if (
                    secondOperand.toString().length >
                    firstOperand.toString().length
                ) {
                    console.log(
                        secondOperand.toString().length,
                        firstOperand.toString().length
                    );
                    decimalPlaces = countDecimals(secondOperand);
                }

                console.log(decimalPlaces);

                // equate value
                results = operate(
                    firstOperand,
                    secondOperand,
                    operator
                ).toFixed(decimalPlaces);

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
        } else if (button.classList.contains("invert")) {
            button.addEventListener("click", () => {
                invert();
            });
        } else if (button.classList.contains("decimal")) {
            button.addEventListener("click", () => {
                decimal();
            });
        } else if (button.classList.contains("percent")) {
            button.addEventListener("click", () => {
                percentage();
            });
        } else if (button.classList.contains("clear")) {
            button.addEventListener("click", () => {
                clearAllData();
            });
        } else if (button.classList.contains("backSpace")) {
            button.addEventListener("click", () => {
                backSpace();
            });
        }
    });
}

// OPERATE
function operate(num1, num2, operation) {
    // operation = "" + operation;
    switch (operation.toString()) {
        case "+":
            return ADD(num1, num2);
            break;
        case "-":
            return SUBTRACT(num1, num2);
            break;
        case "×":
            return MULTIPLY(num1, num2);
            break;
        case "÷":
            if (num2 === 0) {
                alert("Welp! You broke the internet! Don't do it again!");
                clearAllData();
                return 0;
            } else {
                return DIVIDE(num1, num2);
            }
            break;
    }
}

function clearAllData() {
    operator = null;
    firstOperand = 0;
    secondOperand = 0;
    userInputDisplay = "0";
    results = null;
    resultsDisplay = "0";
    doesDecimalExist = false;
    userInput.textContent = resultsDisplay;
    resultsContainer.textContent = resultsDisplay;

    console.log(`data cleared:
operator: ${operator}
firstOperand: ${firstOperand}
secondOperand: ${secondOperand}
userInputDisplay: ${userInputDisplay}
results: ${results}
resultsDisplay: ${resultsDisplay}
    
    `);
}

function backSpace() {
    if (operator === null) {
        // set the firstOperand variable to its negative
        let tempOperand = firstOperand.toString();
        console.log("Before: " + tempOperand, tempOperand.length);

        if (
            tempOperand.length === 1 ||
            (tempOperand.length === 2 && tempOperand < 0)
        ) {
            tempOperand = 0;
            doesDecimalExist = false;
            console.log("After: " + tempOperand, tempOperand.length);
        } else {
            // there isn't a decimal
            if (!doesDecimalExist) {
                tempOperand = parseInt(
                    tempOperand.slice(0, tempOperand.length - 1)
                );
                console.log(
                    "Int Parse - After: " + tempOperand,
                    tempOperand.toString(),
                    tempOperand.toString().length
                );
                // there's a decimal
            } else {
                tempOperand = parseFloat(
                    tempOperand.slice(0, tempOperand.length - 1)
                );
                if (!tempOperand.toString().includes(".")) {
                    doesDecimalExist = false;
                    console.log("is no longer floating");
                }
                console.log(
                    "Float Parse - After: " + tempOperand,
                    tempOperand.toString(),
                    tempOperand.toString().length
                );
            }
        }

        firstOperand = tempOperand;

        // update userInput Display variable
        if (firstOperand === 0) {
            userInputDisplay = "0";
        } else {
            userInputDisplay = `${firstOperand}`;
        }

        // update userInput Display
        userInput.textContent = userInputDisplay;
    } else if (operator !== null) {
        // set the firstOperand variable to its negative
        let tempOperand = secondOperand.toString();

        if (
            tempOperand.length === 1 ||
            (tempOperand.length === 2 && tempOperand < 0)
        ) {
            tempOperand = 0;
            doesDecimalExist = false;
        } else {
            // there isn't a decimal
            if (!doesDecimalExist) {
                tempOperand = parseInt(
                    tempOperand.slice(0, tempOperand.length - 1)
                );
                console.log(
                    "Int Parse - After: " + tempOperand,
                    tempOperand.toString(),
                    tempOperand.toString().length
                );
                // there's a decimal
            } else {
                tempOperand = parseFloat(
                    tempOperand.slice(0, tempOperand.length - 1)
                );
                if (!tempOperand.toString().includes(".")) {
                    doesDecimalExist = false;
                    console.log("is no longer floating");
                }
                console.log(
                    "Float Parse - After: " + tempOperand,
                    tempOperand.toString(),
                    tempOperand.toString().length
                );
            }
        }

        secondOperand = tempOperand;

        userInputDisplay = `${firstOperand} ${operator} ${secondOperand}`;

        // update userInput Display
        userInput.textContent = userInputDisplay;
    }
}

function invert() {
    if (operator === null) {
        // set the firstOperand variable to its negative
        firstOperand = firstOperand * -1;

        // update userInput Display variable
        if (firstOperand === 0) {
            return;
        } else {
            userInputDisplay = `${firstOperand}`;
        }

        // update userInput Display
        userInput.textContent = userInputDisplay;
    } else if (operator !== null) {
        // set the secondOperand variable to its negative
        secondOperand = secondOperand * -1;

        // update userInput Display variable
        if (secondOperand === 0) {
            return;
        } else {
            userInputDisplay = `${firstOperand} ${operator} ${secondOperand}`;
        }

        // update userInput Display
        userInput.textContent = userInputDisplay;
    }
}

function percentage() {
    if (operator === null) {
        firstOperand = firstOperand / 100;
        userInputDisplay = firstOperand;
        userInput.textContent = userInputDisplay;
    } else if (operator !== null) {
        secondOperand = firstOperand * (secondOperand / 100);
        userInputDisplay = `${firstOperand} ${operator} ${secondOperand}`;
        userInput.textContent = userInputDisplay;
    }
}

function decimal() {
    if (operator === null) {
        if (!doesDecimalExist) {
            userInputDisplay += ".";
            userInput.textContent = userInputDisplay;
            doesDecimalExist = true;
        }
    } else if (operator !== null) {
        if (!doesDecimalExist) {
            userInputDisplay += ".";
            // userInputDisplay = `${firstOperand} ${operator} ${secondOperand}`;
            doesDecimalExist = true;
        }
    }
}

let countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;

    var str = value.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
};
