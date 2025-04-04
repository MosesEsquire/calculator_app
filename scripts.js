class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.history = document.querySelector('.history');
        this.buttons = document.querySelectorAll('.buttons button');
        this.currentInput = '';
        this.firstOperand = null;
        this.operation = null;

        this.initEventListeners();
    }

    initEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButton(button.dataset.value));
        });

        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleButton(value) {
        if (/\d/.test(value)) this.handleNumber(value);
        else if (value === '.') this.handleDecimal();
        else if (['+', '-', '*', '/'].includes(value)) this.handleOperation(value);
        else if (value === '=') this.handleEquals();
        else if (value === 'C') this.handleClear();
        this.updateDisplay();
    }

    handleKeyPress(e) {
        const keyMap = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
            'Enter': '=', 'Escape': 'C'
        };
        if (keyMap[e.key]) {
            e.preventDefault();
            this.handleButton(keyMap[e.key]);
        }
    }

    handleNumber(value) {
        this.currentInput = this.currentInput === '0' ? value : this.currentInput + value;
    }

    handleDecimal() {
        if (!this.currentInput.includes('.')) {
            this.currentInput = this.currentInput || '0';
            this.currentInput += '.';
        }
    }

    handleOperation(op) {
        if (this.currentInput === '') return;
        if (this.firstOperand !== null && this.operation) {
            this.calculate();
        } else {
            this.firstOperand = parseFloat(this.currentInput);
        }
        this.operation = op;
        this.currentInput = '';
        this.updateHistory();
    }

    handleEquals() {
        if (this.firstOperand === null || !this.operation || this.currentInput === '') return;
        this.calculate();
        this.operation = null;
    }

    handleClear() {
        this.currentInput = '';
        this.firstOperand = null;
        this.operation = null;
        this.history.textContent = '';
    }

    calculate() {
        const secondOperand = parseFloat(this.currentInput);
        let result;
        switch (this.operation) {
            case '+': result = this.firstOperand + secondOperand; break;
            case '-': result = this.firstOperand - secondOperand; break;
            case '*': result = this.firstOperand * secondOperand; break;
            case '/': result = secondOperand === 0 ? 'Error' : this.firstOperand / secondOperand; break;
            default: result = 0;
        }
        this.currentInput = result.toString();
        this.firstOperand = result === 'Error' ? null : result;
        this.updateHistory();
    }

    updateDisplay() {
        this.display.textContent = this.currentInput || (this.firstOperand !== null ? this.firstOperand : '0');
    }

    updateHistory() {
        if (this.firstOperand !== null && this.operation) {
            this.history.textContent = `${this.firstOperand} ${this.operation}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new Calculator());