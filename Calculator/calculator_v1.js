const calcolaBtn = document.getElementById("calcola")
const n1Elem = document.getElementById("n1")
const n2Elem = document.getElementById("n2")
const opElem = document.getElementById("operazione")
const resElem = document.getElementById("risultato")

function sum(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

function power(a, b) {
    return a ** b
}

function chooseOperation(op) {
    switch (op) {
        case '+':
            return sum
        case '**':
            return power
        case '-':
            return sub
    }
}

function calcola(f, a, b) {
    return f(a, b)
}

//console.log(calcolaBtn); 
calcolaBtn.addEventListener("click", function () {
    //se lavoro con input, form, select -> value
    const a = Number(n1Elem.value)
    const b = Number(n2Elem.value)

    const chosenOp = chooseOperation(opElem.value)
    const res = calcola(chosenOp, a, b)

    resElem.textContent = res
})
