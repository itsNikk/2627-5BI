const convBtn = document.getElementById("converti");
const valoreBox = document.getElementById("valore");
const resElem = document.getElementById("risultato");
const convMenu = document.getElementById("conversione");
const errorBox = document.getElementById("errore");

/*
function x() {} -> dichiarazione
() => {} -> anon func
*/
//Obj -> coopie K:V
// str -> func
const conversioni = {
    "km-m": (km) => km * 1000,
    "m-km": (m) => m / 1000,
    "C-F": (c) => ((c * 9) / 5) + 32,
    "F-C": (f) => (f - 32) * 5 / 9,
    "ore-min": (h) => h * 60
}

function choose(map, key) {
    if (map[key] === undefined) throw new Error("Not supported: " + key)
    return map[key]
}


function performConversion() {
    //Valore da conv
    //sout(valoreBox.value)
    try {
        if (valoreBox.value === "") throw new Error("Inserire un valore")
        const convToApply = choose(conversioni, convMenu.value)
        const res = convToApply(valoreBox.value)
        errorBox.textContent = ""
        resElem.textContent = res
    } catch (error) {
        resElem.textContent = ""
        errorBox.textContent = error.message
    }
}

valoreBox.addEventListener("input", performConversion())
convBtn.addEventListener("click", performConversion)


