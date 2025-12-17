let runningTotal = 0;
let buffer = "0"; // The value currently on the screen
let previousOperator = null;
const screen = document.querySelector('.screen');

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
            if (buffer === "Error") return;

            flushOperation(parseFloat(buffer));
            previousOperator = null;

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

function handleNumber(value) {
    if (buffer === "Error") {
        buffer = "0"; 
    }

    if (value === '.') {
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
            buffer = "Error"; 
            runningTotal = 0;
            previousOperator = null;
            return;
        }
    }
}
function handleMath(symbol) {
    if (buffer === "Error") return;

    const intBuffer = parseFloat(buffer); 

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = "0"; 
}
function rerender() {
    screen.innerText = buffer;
}

function init() {
    document.querySelector('.calcs-buttons').addEventListener('click', function(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const value = event.target.getAttribute('data-value');

        if (value === 'clear' || value === 'backspace' || value === '=' || ['+', '-', '*', '/'].includes(value)) {
            handleSymbol(value);
        } else {
            handleNumber(value);
        }
        rerender();
    });
}
init();
