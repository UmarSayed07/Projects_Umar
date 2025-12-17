let runningTotal = 0;
let buffer = "0"; // The value currently on the screen
let previousOperator = null;
const screen = document.querySelector('.screen');

// Function to handle the logic when a symbol/operator is pressed
function handleSymbol(value) {
    switch (value) {
        case 'clear':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case 'backspace':
            if (buffer === "Error") {
                buffer = "0";
            } else if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            // Check for potential error state before calculation
            if (buffer === "Error") return;

            flushOperation(parseFloat(buffer));
            previousOperator = null;
            
            // Format the result: toFixed(8) for precision, then remove trailing zeros/decimal
            buffer = runningTotal.toFixed(8).replace(/\.?0+$/, "");
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(value);
            break;
    }
}

// Function to handle the logic when a number or decimal is pressed
function handleNumber(value) {
    if (buffer === "Error") {
        buffer = "0"; // Reset if trying to input after an error
    }

    if (value === '.') {
        // Prevent adding a decimal point if one already exists in the buffer
        if (buffer.includes('.')) {
            return;
        }
    }
    
    if (buffer === "0" && value !== '.') {
        buffer = value;
    } else {
        buffer += value;
    }
}

// Function to perform the actual math calculation
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '*') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '/') {
        if (intBuffer !== 0) {
            runningTotal /= intBuffer;
        } else {
            buffer = "Error"; // Display error for division by zero
            runningTotal = 0;
            previousOperator = null;
            return;
        }
    }
}

// Function to store the running total and current operator
function handleMath(symbol) {
    if (buffer === "Error") return;

    // Treat the current buffer as a number
    const intBuffer = parseFloat(buffer); 

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = "0"; // Reset buffer to start fresh input for the next number
}

// Function to update the calculator screen
function rerender() {
    screen.innerText = buffer;
}

// Main function to listen for button clicks
function init() {
    document.querySelector('.calcs-buttons').addEventListener('click', function(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const value = event.target.getAttribute('data-value');

        // Check if the value is an operator/command
        if (value === 'clear' || value === 'backspace' || value === '=' || ['+', '-', '*', '/'].includes(value)) {
            handleSymbol(value);
        } else {
            // Handles digits (0-9) and the decimal point (.)
            handleNumber(value);
        }
        rerender();
    });
}

init();
