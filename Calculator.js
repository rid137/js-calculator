class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ""
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+': 
            computation = prev + current
            break;
            case '-': 
            computation = prev - current
            break;
            case '*': 
            computation = prev * current
            break;
            case '÷': 
            computation = prev / current
            break;
            default: return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString()
        let integerNumber = parseFloat(stringNumber.split('.')[0])
        let decimalNumber = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerNumber)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalNumber != null) {
            return `${integerDisplay}.${decimalNumber}`
        }
        else {
            return integerDisplay
        }
        // const floatNumber = parseFloat(number)
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation !== undefined) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}
// const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})