let display = document.getElementById('display');
let history = document.getElementById('history');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;
let isScientificMode = false;

// Mode toggle
document.getElementById('basicMode').addEventListener('click', () => {
    isScientificMode = false;
    document.getElementById('basicMode').classList.add('active');
    document.getElementById('scientificMode').classList.remove('active');
    document.getElementById('scientificButtons').style.display = 'none';
});

document.getElementById('scientificMode').addEventListener('click', () => {
    isScientificMode = true;
    document.getElementById('scientificMode').classList.add('active');
    document.getElementById('basicMode').classList.remove('active');
    document.getElementById('scientificButtons').style.display = 'grid';
});

function updateDisplay() {
    display.textContent = currentInput;
    display.classList.add('animate');
    setTimeout(() => display.classList.remove('animate'), 300);
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (previousInput && !shouldResetDisplay) {
        calculate();
    }
    
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    history.textContent = `${previousInput} ${getOperatorSymbol(op)}`;
}

function getOperatorSymbol(op) {
    const symbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷',
        '^': '^',
        '%': '%'
    };
    return symbols[op] || op;
}

function calculate() {
    if (!previousInput || !operator) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                display.textContent = 'Error';
                reset();
                return;
            }
            result = prev / curr;
            break;
        case '^':
            result = Math.pow(prev, curr);
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }
    
    history.textContent = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput} =`;
    currentInput = formatResult(result);
    previousInput = '';
    operator = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function formatResult(num) {
    if (isNaN(num) || !isFinite(num)) {
        return 'Error';
    }
    
    // Format to avoid floating point errors
    const rounded = Math.round(num * 100000000) / 100000000;
    
    // If it's a whole number, don't show decimals
    if (rounded % 1 === 0) {
        return rounded.toString();
    }
    
    // Limit decimal places
    return rounded.toFixed(8).replace(/\.?0+$/, '');
}

function scientificFunction(func) {
    const value = parseFloat(currentInput);
    let result;
    
    switch (func) {
        case 'sin':
            result = Math.sin(value * Math.PI / 180); // Convert to radians
            break;
        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(value * Math.PI / 180);
            break;
        case 'asin':
            result = Math.asin(value) * 180 / Math.PI; // Convert to degrees
            break;
        case 'acos':
            result = Math.acos(value) * 180 / Math.PI;
            break;
        case 'atan':
            result = Math.atan(value) * 180 / Math.PI;
            break;
        case 'log':
            if (value <= 0) {
                display.textContent = 'Error';
                reset();
                return;
            }
            result = Math.log10(value);
            break;
        case 'ln':
            if (value <= 0) {
                display.textContent = 'Error';
                reset();
                return;
            }
            result = Math.log(value);
            break;
        case 'sqrt':
            if (value < 0) {
                display.textContent = 'Error';
                reset();
                return;
            }
            result = Math.sqrt(value);
            break;
        case 'exp':
            result = Math.exp(value);
            break;
        case 'pow10':
            result = Math.pow(10, value);
            break;
        case 'factorial':
            if (value < 0 || value % 1 !== 0) {
                display.textContent = 'Error';
                reset();
                return;
            }
            result = factorial(value);
            break;
        case 'pi':
            result = Math.PI;
            break;
        case 'e':
            result = Math.E;
            break;
        case 'abs':
            result = Math.abs(value);
            break;
        case '1/x':
            if (value === 0) {
                display.textContent = 'Error';
                reset();
                return;
            }
            result = 1 / value;
            break;
        default:
            return;
    }
    
    history.textContent = `${func}(${currentInput}) =`;
    currentInput = formatResult(result);
    shouldResetDisplay = true;
    updateDisplay();
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    history.textContent = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function reset() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    setTimeout(() => {
        history.textContent = '';
    }, 2000);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-') {
        appendOperator(key);
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        e.preventDefault();
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === '%') {
        appendOperator('%');
    }
});

// Initialize display
updateDisplay();

