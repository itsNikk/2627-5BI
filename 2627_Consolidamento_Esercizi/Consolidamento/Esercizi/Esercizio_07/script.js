const canaleElem = document.getElementById("canale")
const volumeElem = document.getElementById("volume")
const ultimoElem = document.getElementById("ultimoTasto")

let canale = 1
let volume = 10

//def limita(x, min, max) => restituisce x, portato dentro l'intervallo da min a max
function limita(x, min, max) {
    return Math.max(min, Math.min(max, x))
}

const tasti = {
    ArrowUp: () => canale = limita(canale + 1, 1, 99),
    ArrowDown: () => canale = limita(canale - 1, 1, 99),
    ArrowRight: () => volume = limita(volume + 1, 0, 20),
    ArrowLeft: () => volume = limita(volume - 1, 0, 20),
    m: () => volume = 0
}

// Passo c: i tasti da 1 a 9 si aggiungono alla mappa con un ciclo,
// usando una funzione che crea il comportamento per ogni canale
function vaiA(n) {
    return () => canale = n
}

for (let i = 1; i <= 9; i++) {
    tasti[String(i)] = vaiA(i)
}

//def gestoreTasti(mappa, dopo, seMancante) => restituisce un gestore di keydown: se il
//    tasto è nella mappa esegue la sua funzione e poi chiama dopo(), altrimenti
//    chiama seMancante(tasto)
function gestoreTasti(mappa, dopo, seMancante) {
    return function (e) {
        const azione = mappa[e.key]
        if (azione === undefined) {
            seMancante(e.key)
            return
        }
        azione()
        dopo()
    }
}

function mostra() {
    canaleElem.textContent = canale
    volumeElem.textContent = volume
    ultimoElem.textContent = ""
}

function nonAssegnato(tasto) {
    ultimoElem.textContent = "Tasto non assegnato: " + tasto
}

document.addEventListener("keydown", gestoreTasti(tasti, mostra, nonAssegnato))
