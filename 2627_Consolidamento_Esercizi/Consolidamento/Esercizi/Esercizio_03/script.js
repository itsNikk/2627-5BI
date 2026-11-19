const titoloElem = document.getElementById("titolo")
const contaTitoloElem = document.getElementById("contaTitolo")
const descrizioneElem = document.getElementById("descrizione")
const contaDescrizioneElem = document.getElementById("contaDescrizione")

// Il campo non è scritto nel meccanismo: 
// lo dice e.target, al momento dell'evento.
function limitatore(max, contaElem) {
    return function (e) {
        const campo = e.target
        if (campo.value.length > max) {
            campo.value = campo.value.slice(0, max)
        }
        contaElem.textContent = campo.value.length + "/" + max
    }
}

// LA PAGINA
// titoloElem.addEventListener("input", function () {
    // if (titoloElem.value.length > 30) {
        // titoloElem.value = titoloElem.value.slice(0, 30)
    // }
    // contaTitoloElem.textContent = titoloElem.value.length + "/30"
// })
// Passo c: 
titoloElem.addEventListener("input", limitatore(30, contaTitoloElem))
descrizioneElem.addEventListener("input", limitatore(100, contaDescrizioneElem))
