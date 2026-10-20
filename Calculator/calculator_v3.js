const calcolaBtn = document.getElementById("calcola")
const n1Elem = document.getElementById("n1")
const n2Elem = document.getElementById("n2")
const opElem = document.getElementById("operazione")
const resElem = document.getElementById("risultato")

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

function calcola(f, a, b) {
    return f(a, b)
}

function chooseOp(sym) {
    const v = operations[sym];
    if (v === undefined) throw new Error("Operazione sconosciuta: " + sym)
    return v
}

//console.log(calcolaBtn); 
/*
Abbiamo cambiato il modo in cui definiamo e scegliamo cosa fare (le op).
Ma la funzione che esegue il calcolo/op NON è cambiata
*/
calcolaBtn.addEventListener("click", function () {
    //se lavoro con input, form, select -> value
    const a = Number(n1Elem.value)
    const b = Number(n2Elem.value)

    const chosenOp = operations[opElem.value]

    try {
        const res = calcola(chosenOp, a, b)
        resElem.textContent = res
    } catch (error) {
        resElem.textContent = error.message
    }
})
