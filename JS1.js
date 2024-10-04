console.log("Hello");

i = 1;
i++;
console.log(i);
i = "string";

var i = 1; //existence (scope) global, déprécié

let ii = 1; //scope actif

const iii = 1; //constante

//Boolean, int, var, let, const

//condition de début, de  fin et d'incrémentation de boucle
for (let j = 0; j < 5; ) {
  console.log("j : " + ++j);
}

let liste = [1,2,3]
liste.forEach(element => {
  console.log(element);
})

let j = 5
while (j > 0) {
  console.log("j:" + j)
  j--
}

//on exécute puis on teste si on continue
do {
  console.log("j:" + j)
  j++
}
while (j < 5)

let k = 0  
if (k < 5) {
  console.log("k < 5")
}
else if (k == 5) {
  console.log("k == 5")
}
else{
  console.log("k > 5")
}

let l = "hello"
switch (l) {
  case "hello":
    console.log("hello from switch case")
    break;
  case 3:
    console.log("NULL")
  default:
    console.log("default")
}

//structures de données
let liste2 = [1, 2, 3]
liste2[1]=5
liste2.push(4)
liste2.push("hello")
console.log(liste2)

let listeKeyValue = { 1: "Hello", "Hello": 2 }
console.log(listeKeyValue)

let listerandom = []

for (let j = 0; j < 100;) {
  a = Math.floor(Math.random()*100)
  listerandom.push(a)
  j++
}

console.log(listerandom)

function findElementList(liste, element) {
  return liste.includes(element) ? true : false
}

console.log(findElementList(listerandom,prompt("Que cherchez-vous ?")))