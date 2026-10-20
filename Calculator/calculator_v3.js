const calcolaBtn = document.getElementById("calcola")
const n1Elem = document.getElementById("n1")
const n2Elem = document.getElementById("n2")
const opElem = document.getElementById("operazione")
const resElem = document.getElementById("risultato")
const errorElem = document.getElementById("error")

const sumBtn = document.getElementById("sumBtn")
const subBtn = document.getElementById("subBtn")
const multBtn = document.getElementById("multBtn")
const powBtn = document.getElementById("powBtn")

const LIMITE = 1000000;
// Oggetto JS
// funzioni anonime o arrow function (=>)
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) throw new Error("Div by zero")
        return a / b
    },
    '**': (a, b) => Math.pow(a, b),
    'min': (a, b) => a < b ? a : b,
    'max': (...op) => Math.max(...op)
}

function update() {
    executeComputation(n1Elem.value, opElem.value, n2Elem.value)
}

const regole = [
    (t1, t2) => {
        if (t1 === "" || t2 === "") throw new Error("Inserire entrambi i numeri")
    },
    (t1, t2) => {
        const a = Number(t1)
        const b = Number(t2)
        if (a > LIMITE || a < -LIMITE || b > LIMITE || b < -LIMITE) throw new Error("I numeri sono troppo grandi")
    }
]

function calcola(f, a, b) {
    return f(a, b)
}

function chooseOp(sym) {
    const v = operations[sym];
    if (v === undefined) throw new Error("Operazione sconosciuta: " + sym)
    return v
}

function valida(regole, t1, t2) {
    for (const regola of regole) regola(t1, t2)
}

function executeComputation(a, op, b) {
    try {
        valida(regole, a, b)
        const n1 = Number(a)
        const n2 = Number(b)

        const res = calcola(chooseOp(op), n1, n2)
        errorElem.textContent = ""
        resElem.textContent = formatRes(n1, op, n2, res)
    } catch (error) {
        errorElem.textContent = error.message
    }
}

function forOperation(op) {
    return function () {
        executeComputation(n1Elem.value, opElem.value, n2Elem.value)
    }
}

function formatRes(a, symbol, b, res) {
    return a + " " + symbol + " " + b + " = " + res
}

//console.log(calcolaBtn); 
/*
Abbiamo cambiato il modo in cui definiamo e scegliamo cosa fare (le op).
Ma la funzione che esegue il calcolo/op NON è cambiata
*/
//calcolaBtn.addEventListener("click", forOperation(opElem.value))
calcolaBtn.addEventListener("click", update)
/*calcolaBtn.addEventListener("click", function () {
    //se lavoro con input, form, select -> value
    try {
        valida(regole, n1Elem.value, n2Elem.value)
        const a = Number(n1Elem.value)
        const b = Number(n2Elem.value)

        const chosenOp = chooseOp(opElem.value)
        const res = calcola(chosenOp, a, b)
        errorElem.textContent = ""
        resElem.textContent = res
    } catch (error) {
        errorElem.textContent = error.message
    }
})
*/
sumBtn.addEventListener("click", forOperation(sumBtn.textContent))
subBtn.addEventListener("click", forOperation(subBtn.textContent))
multBtn.addEventListener("click", forOperation(multBtn.textContent))
powBtn.addEventListener("click", forOperation(powBtn.textContent))

n1Elem.addEventListener("input", executeComputation)
n2Elem.addEventListener("input", executeComputation)
opElem.addEventListener("change", executeComputation)