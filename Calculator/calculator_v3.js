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
const aiutoElem = document.getElementById("aiuto")


const opDescriptions = {
    '+': "Somma: primo numero + secondo numero",
    '-': "Differenza: primo numero - secondo numero",
    '*': "Prodotto: primo numero * secondo numero",
    '/': "Divisione: primo numero / secondo numero",
}

const mostraDescrizioneDi = gestoreTesto(opDescriptions, (e) => e.target.textContent, (testo) => aiutoElem.textContent = testo)
function descriviOperazione(e) {
    e.preventDefault()
    mostraDescrizioneDi(e)
}

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

const keyMap = {
    Enter: update,
    Escape: clearAllFields
}

const textHelpMap = {
    n1: "Scrivi il primo numero",
    n2: "Scrivi il secondo numero",
    operazione: "Scegli l'operazione",
}

function clearAllFields() {
    n1Elem.value = ""
    n2Elem.value = ""
    resElem.textContent = ""
    errorElem.textContent = ""
    aiutoElem.textContent = ""
}

function gestoreTasti(keyMap) {
    return function (e) {
        const userAction = keyMap[e.key]
        if (userAction !== undefined) userAction()
    }
}

//ES9
function gestoreTesto(mappaAiuti, keyOf, show) {
    return (e) => show(mappaAiuti[keyOf(e)])
}

//ES9 - Kinda hard but very usefull
const showHelp = gestoreTesto(textHelpMap, (e) => e.target.id, (testo) => aiutoElem.textContent = testo)
const hideHelp = () => aiutoElem.textContent = ""
//Little trick... ;)
for (const elem of [n1Elem, n2Elem, opElem]) {
    elem.addEventListener("focus", showHelp)
    elem.addEventListener("blur", hideHelp)
}

//Solo una funzione di appoggio (helper) richiesta dall'esercizio
let lastResult = null
function executeOperation(a, simbolo, b) {
    try {
        valida(regole, a, b)
        const n1 = Number(n1Elem.value)
        const n2 = Number(n2Elem.value)

        const chosenOp = scegliOperazione(simbolo)
        const res = calcola(chosenOp, n1, n2)
        errorElem.textContent = ""
        resElem.textContent = format(n1, simbolo, n2, res)
        lastResult = res
    } catch (error) {
        resElem.textContent = ""
        errorElem.textContent = error.message
    }
}

function forOperation(sym) {
    //???
    return function () {
        executeOperation(n1Elem.value, sym, n2Elem.value)
    }
}


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

function update() {
    return executeOperation(n1Elem.value, opElem.value, n2Elem.value)
}

//console.log(calcolaBtn); 
/*
Abbiamo cambiato il modo in cui definiamo e scegliamo cosa fare (le op).
Ma la funzione che esegue il calcolo/op NON è cambiata
*/
calcolaBtn.addEventListener("click", update)
opElem.addEventListener("change", update)
n1Elem.addEventListener("input", update)
n2Elem.addEventListener("input", update)

sumBtn.addEventListener("click", forOperation(sumBtn.textContent))
sumBtn.addEventListener("contextmenu", descriviOperazione)
subBtn.addEventListener("click", forOperation(subBtn.textContent))
subBtn.addEventListener("contextmenu", descriviOperazione)
divBtn.addEventListener("click", forOperation(divBtn.textContent))
divBtn.addEventListener("contextmenu", descriviOperazione)
powBtn.addEventListener("click", forOperation(powBtn.textContent))
powBtn.addEventListener("contextmenu", descriviOperazione)

//Es 7
document.addEventListener("keydown", gestoreTasti(keyMap))

//ES11
resElem.addEventListener("dblclick", function () {
    if (lastResult === null) return
    n1Elem.value = lastResult
    n2Elem.value = ""
})