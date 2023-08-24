const toggler = document.querySelectorAll(".toggle-switch");
const userInput = document.querySelector("#user-input");
const result = document.querySelector("#result");
const numberBtns = document.querySelectorAll("button[data-num]");
const operationBtns = document.querySelectorAll("button[data-op]");
const equalBtn = document.querySelector(".equalBtn");
const allClearBtn = document.querySelector(".allClearBtn");

let displayString = "";
let dataStorage = {
    firstNum: 0,
    secondNum: 0,
    currOp: "",
};
let isOpSelected = false; //set to false on the equal button

toggler[0].onclick = function () {
    toggler[0].classList.toggle("active");
};
toggler[1].onclick = function () {
    toggler[1].classList.toggle("active");
};

// NUMBER BUTTONS
numberBtns.forEach((element) => {
    element.addEventListener("click", () => {
        displayData(element);
    });
});

// OPERATION BUTTONS
operationBtns.forEach((element) => {
    element.addEventListener("click", () => {
        if (!isOpSelected) {
            storeData(element);
            displayData(element);
        } else {
            let secondNumber = userInput.textContent.split(" ");
            storeData(secondNumber[2]);
            let result = operate(
                dataStorage.firstNum,
                dataStorage.secondNum,
                dataStorage.currOp
            );
            console.log(result);
            displayResult(result);
        }
    });
});

// EQUAL BUTTON
equalBtn.addEventListener("click", () => {
    if (!userInput.textContent) {
        return;
    }

    let secondNumber = userInput.textContent.split(" ");
    storeData(secondNumber[2]);
    let result = operate(
        dataStorage.firstNum,
        dataStorage.secondNum,
        dataStorage.currOp
    );
    displayResult(result);
    clearTopText();
});

// ALL CLEAR BUTTON
allClearBtn.addEventListener("click", () => {
    clearAllData();
});

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
    switch (operation) {
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

// Assist functions
function storeData(element) {
    if (!userInput.textContent) {
        return;
    } else if (dataStorage.firstNum == 0) {
        dataStorage.firstNum = parseInt(userInput.textContent);
        dataStorage.currOp = element.textContent;
    } else {
        let secondNumber = userInput.textContent.split(" ");
        dataStorage.secondNum = parseInt(secondNumber[2]);
    }

    console.log(dataStorage);
}

function displayData(element) {
    let key = Object.keys(element.dataset);
    let value = Object.values(element.dataset);

    // console.log(key);
    // console.log(value);

    // Did you click zero and nothing was there? Show nothing then.
    if (key[0] == "num") {
        if (value[0] == 0 && userInput.textContent == "") {
            userInput.textContent = "";
            console.log(displayString);
        } else {
            displayString += value[0];
            userInput.textContent = displayString;
            console.log(displayString);
        }
    }
    // check to see if the user clicked and operation
    else if (key[0] == "op") {
        // do nothing if an operation was selected without there being any numbers input
        if (!isOpSelected) {
            if (userInput.textContent == 0 || userInput.textContent == null) {
                userInput.textContent = "";
            } else {
                displayString += ` ${value[0]} `;
                isOpSelected = true;
                console.log(displayString);
                userInput.textContent = displayString;
            }
        } else {
            displayString += ` ${value[0]} `;
            userInput.textContent = displayString;
            console.log(displayString);
        }
    }
}

function displayResult(num) {
    result.textContent = num;
}

function clearAllData() {
    dataStorage.firstNum = 0;
    dataStorage.secondNum = 0;
    dataStorage.currOp = "";
    userInput.textContent = dataStorage.currOp;
    result.textContent = dataStorage.firstNum;
    isOpSelected = false;
    displayString = "";
    console.log(dataStorage);
}

// This can be folded into the above function with like...a bool switch.
function clearTopText() {
    dataStorage.firstNum = 0;
    dataStorage.secondNum = 0;
    dataStorage.currOp = "";
    userInput.textContent = dataStorage.currOp;
    isOpSelected = false;
    displayString = "";
    console.log(dataStorage);
}

function backSpace() {}
