const valElem = document.getElementById("valore")

let counter = 0;

function cambiaDi(n) {
    return () => {
        counter += n
        valElem.textContent = counter
    }
}

function azzera() {
    counter = 0
    valElem.textContent = counter
}

document.getElementById("meno10").addEventListener("click", cambiaDi(-10))
document.getElementById("meno1").addEventListener("click", cambiaDi(-1))
document.getElementById("piu1").addEventListener("click", cambiaDi(+1))
document.getElementById("piu10").addEventListener("click", cambiaDi(+10))
document.getElementById("azzera").addEventListener("click", azzera)
