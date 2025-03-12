// Get DOM elements
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

// Calculator state
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.textContent);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    deleteNumber();
    updateDisplay();
});

// Function to add number to screen
function appendNumber(number) {
    if (currentOperand === '0' || resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    
    // Prevent multiple decimals
    if (number === '.' && currentOperand.includes('.')) return;
    
    currentOperand += number;
}

// Function to handle operator selection
function chooseOperation(op) {
    if (currentOperand === '') return;
    
    if (previousOperand !== '') {
        calculate();
    }
    
    // Map display symbols to calculation symbols
    switch(op) {
        case '÷':
            operation = '/';
            break;
        case '×':
            operation = '*';
            break;
        case '−':
            operation = '-';
            break;
        case '+':
            operation = '+';
            break;
    }
    
    previousOperand = currentOperand;
    resetScreen = true;
}

// Calculate the result
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch(operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                // Division by zero
                computation = 'Error';
            } else {
                computation = prev / current;
            }
            break;
        default:
            return;
    }
    
    // Format result to avoid overly long decimals
    if (computation === 'Error') {
        currentOperand = computation;
    } else {
        currentOperand = String(Math.round(computation * 100000) / 100000);
    }
    
    operation = undefined;
    previousOperand = '';
}

// Clear all values
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

// Delete last digit
function deleteNumber() {
    if (currentOperand === 'Error') {
        currentOperand = '0';
        return;
    }
    
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
}

// Update the display
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    
    if (operation != null) {
        let displayOperator;
        switch(operation) {
            case '/':
                displayOperator = '÷';
                break;
            case '*':
                displayOperator = '×';
                break;
            case '-':
                displayOperator = '−';
                break;
            case '+':
                displayOperator = '+';
                break;
        }
        previousOperandElement.textContent = `${previousOperand} ${displayOperator}`;
    } else {
        previousOperandElement.textContent = previousOperand;
    }
}

// Add keyboard support
document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber(e.key);
    
    if (e.key === '+') chooseOperation('+');
    if (e.key === '-') chooseOperation('−');
    if (e.key === '*') chooseOperation('×');
    if (e.key === '/') chooseOperation('÷');
    
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    
    updateDisplay();
}); 