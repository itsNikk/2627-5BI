const valoreElem = document.getElementById("valore")
const avvisoElem = document.getElementById("avviso")
const MIN = 0
const MAX = 100

let conteggio = 0

function cambiaDi(n) {
    return function () {
        imposta(conteggio + n)
    }
}

// Passo b:
function imposta(nuovo) {
    if (nuovo < MIN || nuovo > MAX) {
        avvisoElem.textContent = "Limite raggiunto"
        return
    }
    conteggio = nuovo
    valoreElem.textContent = conteggio
    avvisoElem.textContent = ""
}

// Passo c:
function gestoreTasti(mappa) {
    return function (e) {
        const azione = mappa[e.key]
        if (azione !== undefined) azione()
    }
}

function azzera() {
    imposta(0)
}
document.getElementById("meno10").addEventListener("click", cambiaDi(-10))
document.getElementById("meno1").addEventListener("click", cambiaDi(-1))
document.getElementById("piu1").addEventListener("click", cambiaDi(1))
document.getElementById("piu10").addEventListener("click", cambiaDi(10))
document.getElementById("azzera").addEventListener("click", azzera)

// Passo c:
const tasti = {
    ArrowUp: cambiaDi(1),
    ArrowDown: cambiaDi(-1),
    PageUp: cambiaDi(10),
    PageDown: cambiaDi(-10),
    Escape: azzera
}
document.addEventListener("keydown", gestoreTasti(tasti))
