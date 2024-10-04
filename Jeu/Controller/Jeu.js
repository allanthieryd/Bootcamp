
import Personnage from "../Model/Personnage.js"
import Item from "../Model/Item.js"
import Enemy from "../Model/Enemy.js"
import Mur from "../Model/Mur.js"
import { RATIO, map } from "../config/Configuration.js"

let perso
let body = document.querySelector("body")
let divPerso = document.createElement("div")
//const???
let divMap = document.createElement("div")
let divNbItems = document.createElement("p")
let listeItems = []
let listeEnemies = []
let listeMurs = []
let mapJeu = []
let illustrations

let mapTemp = map.split("\n")
mapTemp.forEach(element => {
    mapJeu.push(element.split(""))
})

async function readMap() {
    const result = await fetch("./config/Map.txt")
        .then(response => response.text())
    console.log(await result.text())
}

async function readIllustration() {
    const result = await fetch("./config/illustrations.json")
    console.log(await result.json())
    illustrations = await result.json()
}

async function lectureConfigMap() {
    let map = await readMap()

    let mapTemp = map.split("\n")
    
}

mapJeu.forEach((element1, index1) => {
    element1.forEach((element2, index2)=>{
        switch(element2){
            case "P" :
                perso = new Personnage(index2, index1)
                break
            case "I" :
                listeItems.push(new Item(index2, index1))
                break
            case "E":
                listeEnemies.push(new Enemy(index2, index1))
                break
            case "1":
                listeMurs.push(new Mur(index2, index1))
                break
        }
    })
})



function displayPerso(){
    divPerso.style.marginLeft = (perso.posX*RATIO) + "px"
    divPerso.style.marginTop = (perso.posY*RATIO) + "px"
}



createElements()
displayItems()
displayPerso()
displayEnemies()
displayMurs()
moveEnemy()
// victory()

//display map et perso
body.append(divMap)
divMap.appendChild(divPerso)

function displayItems() {
    listeItems.forEach((element, index) => {
        let divItem = document.createElement("div")
        divItem.id = "divItem" + index
        divItem.className = "divItemClassName"
        divItem.style.marginLeft = (element.posX * RATIO) + "px"
        divItem.style.marginTop = (element.posY * RATIO) + "px"
        divMap.appendChild(divItem)
    });
}

function displayEnemies(){
    listeEnemies.forEach((element, index) => {
        let divEnemy = document.createElement("div")
        divEnemy.id = "divEnemy" + index
        divEnemy.className = "divEnemyClassName"
        divEnemy.style.marginLeft = (element.posX * RATIO) + "px"
        divEnemy.style.marginTop = (element.posY * RATIO) + "px"
        divMap.appendChild(divEnemy)
    });
}

function displayMurs(){
    listeMurs.forEach((element, index) => {
        let divMur = document.createElement("div")
        divMur.id = "divMur" + index
        divMur.className = "divMurClassName"
        divMur.style.marginLeft = (element.posX * RATIO) + "px"
        divMur.style.marginTop = (element.posY * RATIO) + "px"
        divMap.appendChild(divMur)
    });
}

//create maps perso, items
function createElements() {

    divMap.id = "divMapId"
    divMap.className = "divMapClassName"

    divPerso.id = "divPerso"
    divPerso.className = "divPersoClassName"

    divNbItems.id = "divNbItems"
    divNbItems.className = "divNbItemsClassName"
    body.append(divNbItems)
   /* for (let i = 0; i < 3; i++) {
        listeItems.push(new Item(generateRandomValue(), generateRandomValue()))
    }*/

   /* for(let i = 0; i < 3; i++){
        listeEnemies.push(new Enemy(generateRandomValue(), generateRandomValue()))
    }*/
}



let startPosX = perso.posX;  // Position initiale en X
let startPosY = perso.posY;  // Position initiale en Y

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (mouvementAllowed(perso.posX, perso.posY - 1)) {
                movePerso(perso.posX, perso.posY - 1);
            }
            break;
        case "ArrowDown":
            if (mouvementAllowed(perso.posX, perso.posY + 1)) {
                movePerso(perso.posX, perso.posY + 1);
            }
            break;
        case "ArrowLeft":
            if (mouvementAllowed(perso.posX - 1, perso.posY)) {
                movePerso(perso.posX - 1, perso.posY);
            }
            break;
        case "ArrowRight":
            if (mouvementAllowed(perso.posX + 1, perso.posY)) {
                movePerso(perso.posX + 1, perso.posY);
            }
            break;
        default:
            console.log("MAUVAIS CHOIX");
    }
    displayPerso();
});

function mouvementAllowed(x, y) {
    return mapJeu[y][x] != "1";  // Le perso peut bouger s'il ne rencontre pas de mur
}

function movePerso(newX, newY) {
    if (mapJeu[newY][newX] === "I") {
        mapJeu[perso.posY][perso.posX] = "0";
        perso.nbItemPickUp++
        console.log("Points: " + perso.nbItemPickUp)
        unshowItem()
        victory()
        divNbItems.innerHTML = perso.nbItemPickUp
    }
    if (mapJeu[newY][newX] === "E") {
        console.log("Un ennemi, tu es mort");
        alert("Tu as perdu avec "+ perso.nbItemPickUp+ " points")
        mapJeu[perso.posY][perso.posX] = "0";  // On remet la case actuelle à "0"
        perso.posX = startPosX;
        perso.posY = startPosY;
        clearMap()
    } else {
        mapJeu[perso.posY][perso.posX] = "0";  // On remet la case actuelle à "0"
        perso.posX = newX;
        perso.posY = newY;
    }
    mapJeu[perso.posY][perso.posX] = "P";  // On place le personnage à la nouvelle position
    console.log(`NOUVELLE POSITION: (${perso.posX}, ${perso.posY})`);
}

function victory() {
    if (perso.nbItemPickUp === listeItems.length) {
        perso.posX = startPosX;
        perso.posY = startPosY;
        setInterval(500)
        alert("Tu as gagné avec " + perso.nbItemPickUp + " points")
        
    }
}

// function time(t) {
//     while (true) {
//         let chrono = setInterval(1000)
//         console.log(chrono)
//         t = chrono
//     }
//     return t
// }

function clearMap() {
    listeEnemies = []
    listeItems = []
    listeMurs = []
}

function moveEnemy() {
    setInterval(() => {
        listeEnemies.forEach((enemy, index) => {
            let direction = getRandomDirection();  // Fonction pour choisir une direction aléatoire
            let newX = enemy.posX;
            let newY = enemy.posY;

            // Mise à jour des coordonnées en fonction de la direction choisie
            switch (direction) {
                case "up":
                    newY--;
                    break;
                case "down":
                    newY++;
                    break;
                case "left":
                    newX--;
                    break;
                case "right":
                    newX++;
                    break;
            }

            // Vérifiez que le mouvement est autorisé (pas de mur et pas en dehors des limites)
            if (mouvementAllowed(newX, newY)) {
                // Mise à jour de la carte
                mapJeu[enemy.posY][enemy.posX] = "0";  // Vide l'ancienne position de l'ennemi
                enemy.posX = newX;
                enemy.posY = newY;
                mapJeu[enemy.posY][enemy.posX] = "E";  // Place l'ennemi à la nouvelle position

                // Met à jour la position visuelle de l'ennemi
                let divEnemy = document.getElementById("divEnemy" + index);
                divEnemy.style.marginLeft = (enemy.posX * RATIO) + "px";
                divEnemy.style.marginTop = (enemy.posY * RATIO) + "px";
            }
        });
    }, 400);  // Déplacement toutes les 400 ms
}

// Fonction pour choisir une direction aléatoire
function getRandomDirection() {
    const directions = ["up", "down", "left", "right"];
    return directions[Math.floor(Math.random() * directions.length)];
}


function unshowItem(){
    listeItems.forEach((item, index)=>{
                    if (!item.pickUp && item.posX==perso.posX && item.posY==perso.posY){
                        console.log("on passe là")
                        perso.nbItemPickUp++
                        item.pickUp = true
                        console.log(perso.nbItemPickUp)
                        console.log(listeItems)
                        document.getElementById("divItem"+index).remove()
                    }
                })
}

console.log(mapTemp)