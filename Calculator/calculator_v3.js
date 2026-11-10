// Calculator v3: soluzione fino all'esercizio 7
const calcolaBtn = document.getElementById("calcola")
const n1Elem = document.getElementById("n1")
const n2Elem = document.getElementById("n2")
const opElem = document.getElementById("operazione")
const resElem = document.getElementById("risultato")
const msgElem = document.getElementById("messaggio")
const aiutoElem = document.getElementById("aiuto")

// Esercizio 5
const sumBtn = document.getElementById("sumBtn")
const subBtn = document.getElementById("subBtn")
const mulBtn = document.getElementById("mulBtn")
const divBtn = document.getElementById("divBtn")
const powBtn = document.getElementById("powBtn")
const modBtn = document.getElementById("modBtn")
const minBtn = document.getElementById("minBtn")
const maxBtn = document.getElementById("maxBtn")
const mediaBtn = document.getElementById("mediaBtn")

// Esercizio 1
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) throw new Error("Div by zero")
        return a / b
    },
    '**': (a, b) => Math.pow(a, b),
    // Esercizio 2: nuove operazioni.
    '%': (a, b) => {
        if (b === 0) throw new Error("Div by zero")
        return a % b
    },
    'min': (a, b) => Math.min(a, b),
    'max': (a, b) => Math.max(a, b),
    'media': (a, b) => (a + b) / 2,
}

const keyMap = {
    Enter: update,
    Escape: () => {
        n1Elem.value = ""
        n2Elem.value = ""
    }
}

function keyManager() {
    return (e) => {
        const userAction = keyMap[e.key]
        if (userAction !== undefined) userAction()
    }
}

const testiAiuto = {
    n1: "Inserisci primo numero",
    n2: "Inserisci secondo numero"
}

function gestoreTesto(mappa, chiaveDi, mostra) {
    return (e) => {
        mostra(testiAiuto[chiaveDi(e)])
    }
}

const v = gestoreTesto(testiAiuto,
    (e) => e.target.id, (txt) => aiutoElem.textContent = txt)
n1Elem.addEventListener("focus", v)
n2Elem.addEventListener("focus", v)
n1Elem.addEventListener("blur", () => aiutoElem.textContent = "")

// Esercizio 4
const LIMIT = 1000000
const regole = [
    (t1, t2) => {
        if (t1 === "" || t2 === "") throw new Error("Inserire entrambi i numeri")
    },
    (t1, t2) => {
        if (t1 > LIMIT || t1 < -LIMIT || t2 > LIMIT || t2 < -LIMIT) throw new Error("Numeri troppo grandi")
    },
    (t1, t2) => {
        if (t1 % 1 !== 0 || t2 % 1 !== 0) throw new Error("Usare solo numeri interi")
    }
]

// Invariato dalla v2
function calcola(f, a, b) {
    return f(a, b)
}

// Esercizio 3
function scegliOperazione(simbolo) {
    const f = operations[simbolo]
    if (f === undefined) throw new Error("Operazione non supportata: " + simbolo)
    return f
}

// Esercizio 4
function valida(regole, t1, t2) {
    for (const regola of regole) {
        regola(t1, t2)
    }
}

// Esercizio 5
function forOperation(simbolo) {
    return function () {
        executeOperation(n1Elem.value, simbolo, n2Elem.value)
    }
}

// Esercizio 6
function format(a, simbolo, b, res) {
    return a + " " + simbolo + " " + b + " = " + res
}
// Esercizio 5: il corpo del listener diventa una funzione che riceve il simbolo,
function executeOperation(a, simbolo, b) {
    try {
        valida(regole, a, b)
        const n1 = Number(n1Elem.value)
        const n2 = Number(n2Elem.value)
        const res = calcola(scegliOperazione(simbolo), n1, n2)
        msgElem.textContent = ""
        resElem.textContent = format(n1, simbolo, n2, res)
    } catch (error) {
        resElem.textContent = ""
        msgElem.textContent = error.message
    }
}

// Esercizio 7
function update() {
    return executeOperation(n1Elem.value, opElem.value, n2Elem.value)
}

calcolaBtn.addEventListener("click", update)

sumBtn.addEventListener("click", forOperation(sumBtn.textContent))
subBtn.addEventListener("click", forOperation(subBtn.textContent))
mulBtn.addEventListener("click", forOperation(mulBtn.textContent))
divBtn.addEventListener("click", forOperation(divBtn.textContent))
powBtn.addEventListener("click", forOperation(powBtn.textContent))
modBtn.addEventListener("click", forOperation(modBtn.textContent))
minBtn.addEventListener("click", forOperation(minBtn.textContent))
maxBtn.addEventListener("click", forOperation(maxBtn.textContent))
mediaBtn.addEventListener("click", forOperation(mediaBtn.textContent))

// Esercizio 7: la stessa funzione collegata a più eventi
n1Elem.addEventListener("input", update)
n2Elem.addEventListener("input", update)
opElem.addEventListener("change", update)

document.addEventListener("keydown", keyManager())