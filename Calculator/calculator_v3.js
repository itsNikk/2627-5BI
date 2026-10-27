const calcolaBtn = document.getElementById("calcola")
const subBtn = document.getElementById("subBtn")
const sumBtn = document.getElementById("sumBtn")
const divBtn = document.getElementById("divBtn")
const powBtn = document.getElementById("powBtn")

const n1Elem = document.getElementById("n1")
const n2Elem = document.getElementById("n2")
const opElem = document.getElementById("operazione")
const resElem = document.getElementById("risultato")
const errorElem = document.getElementById("error")

function executeOperation(a, simbolo, b) {
    try {
        valida(regole, a, b)
        const n1 = Number(n1Elem.value)
        const n2 = Number(n2Elem.value)

        const chosenOp = scegliOperazione(simbolo)
        const res = calcola(chosenOp, n1, n2)
        errorElem.textContent = ""
        resElem.textContent = format(n1, simbolo, n2, res)
    } catch (error) {
        errorElem.textContent = error.message
    }
}

function forOperation(sym) {
    //???
    return function () {
        executeOperation(n1Elem.value, sym, n2Elem.value)
    }
}

sumBtn.addEventListener("click", forOperation(sumBtn.textContent))
subBtn.addEventListener("click", forOperation(subBtn.textContent))
divBtn.addEventListener("click", forOperation(divBtn.textContent))
powBtn.addEventListener("click", forOperation(powBtn.textContent))



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
    'min': (a, b) => Math.min(a, b),
    'max': (a, b) => Math.max(a, b)
}

const LIMIT = 1000000
const regole = [
    (a, b) => {
        if (a === "" || b === "") throw new Error("Inserire entrambi i numeri")
    },
    (t1, t2) => {
        if (t1 > LIMIT || t1 < -LIMIT || t2 > LIMIT || t2 < -LIMIT)
            throw new Error("Numeri troppo grandi")
    }
]

function format(a, simbolo, b, res) {
    return a + " " + simbolo + " " + b + " = " + res
}

function valida(regole, t1, t2) {
    for (const regola of regole) regola(t1, t2)
}

function scegliOperazione(sym) {
    const v = operations[sym];
    if (v === undefined) throw new Error("Operazione non supportata: " + sym)
    return v;
}

function calcola(f, a, b) {
    return f(a, b)
}

//console.log(calcolaBtn); 
/*
Abbiamo cambiato il modo in cui definiamo e scegliamo cosa fare (le op).
Ma la funzione che esegue il calcolo/op NON è cambiata
*/
calcolaBtn.addEventListener("click", function () {
    //se lavoro con input, form, select -> value
    //ALT+ARROW: sposta riga
    executeOperation(n1Elem.value, opElem.value, n2Elem.value)
})
