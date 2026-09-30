//text = "no text" ==> IF(TEXT===UNDEFINED)
let showMessage = function (from, text = "no text") {
    console.log(from + ": " + text);
}

function execMessage(action, from, text) {
    action(from, text)
}

function showMessageUpperCase(from, text) {
    console.log(from.toUpperCase() +
        ": "
        + text.toUpperCase());
}

execMessage(showMessage, "Nome", "testo")
execMessage(showMessageUpperCase, "Nome", "testo")

//le funzioni sono tipi, quindi valori
let funcCopy = showMessage

//CTRL + D per dupliare
funcCopy("asdkb", "new val")
showMessage("Luca", "ciao");
showMessage("Anna", "com'è?");
showMessage("Anna"); //????