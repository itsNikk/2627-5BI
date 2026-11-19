const nomeElem = document.getElementById("nome")
const cognomeElem = document.getElementById("cognome")
const etaElem = document.getElementById("eta")
const aiutoElem = document.getElementById("aiuto")
const erroreElem = document.getElementById("errore")
const esitoElem = document.getElementById("esito")

const aiuti = {
    nome: "Scrivi il tuo nome",
    cognome: "Scrivi il tuo cognome",
    eta: "Scrivi la tua età in anni"
}

const obbligatorio = (t) => {
    if (t === "") throw new Error("Campo obbligatorio")
}
// Le regole di ogni campo, per id. Le regole sono funzioni che ricevono il testo
// del campo e lanciano un errore se non va bene.
const regoleCampo = {
    nome: [obbligatorio, almeno(2)],
    cognome: [obbligatorio, almeno(2)],
    eta: [obbligatorio, tra(14, 99)]
}


//def almeno(n) => restituisce una regola che lancia "Almeno n caratteri"
//    se il testo è più corto di n
function almeno(n) {
    return (t) => {
        if (t.length < n) throw new Error("Almeno " + n + " caratteri")
    }
}

//def tra(min, max) => restituisce una regola che lancia "Valore tra min e max"
//    se il numero è fuori dall'intervallo
function tra(min, max) {
    return (t) => {
        if (Number(t) < min || Number(t) > max) throw new Error("Valore tra " + min + " e " + max)
    }
}
//def valida(regole, testo) => esegue in ordine ogni regola sul testo
function valida(regole, testo) {
    for (const regola of regole) {
        regola(testo)
    }
}

//def controlla(id) => valida il campo con quell'id con le sue regole;
//    se una regola fallisce lancia l'errore "id: messaggio"
function controlla(id) {
    try {
        valida(regoleCampo[id], document.getElementById(id).value)
    } catch (err) {
        throw new Error(id + ": " + err.message)
    }
}

// e.target dice quale campo ha generato l'evento
function mostraAiuto(e) {
    aiutoElem.textContent = aiuti[e.target.id]
}

function nascondiAiuto() {
    aiutoElem.textContent = ""
}

function controllaCampo(e) {
    try {
        controlla(e.target.id)
        erroreElem.textContent = ""
    } catch (err) {
        erroreElem.textContent = err.message
    }
}
for (const campo of [nomeElem, cognomeElem, etaElem]) {
    campo.addEventListener("focus", mostraAiuto)
    campo.addEventListener("blur", nascondiAiuto)
    // Due AEL sullo stesso evento: partono nell'ordine in cui sono stati aggiunti
    campo.addEventListener("blur", controllaCampo)
}

// Passo c: per aggiungere un campo bastano una riga in regoleCampo, 
// una in aiuti
// e l'input nell'HTML; invia non cambia
document.getElementById("invia").addEventListener("click", function () {
    try {
        for (const id in regoleCampo) {
            controlla(id)
        }
        esitoElem.textContent = "Iscrizione inviata"
    } catch (err) {
        esitoElem.textContent = err.message
    }
})
