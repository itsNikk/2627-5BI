function raddoppia(n) {
    return n * 2
}

//funzione increment(n) => n+1
function increment(n) { return n + 1 }

//def applica(f,x) => f(x)
function applica(f, x) {
    return f(x)
}
//f(x) => increment(41)
console.log(applica(increment, 41));
console.log(applica(raddoppia, 21));
console.log(applica(raddoppia, applica(increment, 4)));
//applica(raddoppia, applica(increment,4))
// return raddoppia(increment(4))
// return raddoppia(5)
// return 10
console.log(applica(raddoppia, raddoppia(increment(5))));
// applica(raddoppia, raddoppia(increment(5))
// return raddoppia(raddoppia(increment,4))
// return raddoppia(raddoppia(increment,4))

//def applica2volte(f,x) => applica 2 volte f a x
function applica2volte(f, x) {
    return f(f(x))
}

applica2volte(increment, 5)
// applica2volte(increment, 5)
// return increment(increment(5))
// return increment(6)
// return 7