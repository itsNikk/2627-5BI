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

convBtn.addEventListener("click", () => {
    //Valore da conv
    //sout(valoreBox.value)
    try {
        const convToApply = conversioni[convMenu.value]
        const res = convToApply(valoreBox.value)
        resElem.textContent = res
    } catch (error) {
        errorBox.textContent = error.message
    }

})


