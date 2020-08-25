
var tableMine = [];
var tableRun = [];
var tableMineAutour = [];

var nbLigneColonne = 20;

function dessiner() {

    //couleur
    const GRIS_CLAIR = "rgb(225,225,225)";//cell jouée vide
    const GRIS_MOYEN = "rgb(175,175,175)";//cell non jouée
    const GRIS_FONCE = "rgb(100,100,100)";//cell jouée mine

    // récupérer le pinceau
    let canvas = document.querySelector("#canvasDem");
    let pinceau = canvas.getContext("2d");


    for (let i = 0; i <= nbLigneColonne; i++) {//ordonnée
        for (let j = 0; j <= nbLigneColonne; j++) { // abcisses
            if (tableRun[i][j] == 0) {
                pinceau.fillStyle = GRIS_MOYEN;
            } else if (tableRun[i][j] == 1) {
                pinceau.fillStyle = GRIS_CLAIR;
            } else {
                pinceau.fillStyle = GRIS_FONCE;
            }

            pinceau.fillRect(2 + 50 * j, 2 + 50 * i, 46, 46);

            if (tableRun[i][j] == 1 && tableMineAutour[i][j] != 0) {
                pinceau.font = '20pt comicsans';
                pinceau.fillStyle = 'black';
                pinceau.fillText(tableMineAutour[i][j], 50 * j + 10, 50 * i + 30);
            }else if(tableRun[i][j] == 1 && tableMineAutour[i][j] == 0){
                
            }
        }
    }

    //légendes
    //pinceau.font = '20px comicsans';
    //pinceau.fillStyle = 'black';
    //pinceau.fillText();

    //Capturer l'événement mousedown
    canvas.addEventListener('mousedown', canvas.fnl = e => { gestionClick(e) });
    canvas.addEventListener('contextmenu', canvas.fn2 = e => { e.preventDefault(); });
}

function gestionClick(event) {
    if (event.button == 0) {
        let x = event.offsetX;
        let y = event.offsetY;

        let colonne = Math.floor(x / 50);
        let ligne = Math.floor(y / 50);

        if (tableRun[ligne][colonne] == 1) {
            return;
        }
        //detection de bombe
        if (tableMine[ligne][colonne] == 1) {
            tableRun[ligne][colonne] = 2;
            console.log("mine !");
        } else {
            tableRun[ligne][colonne] = 1;
            console.log("Pas de mine !");
            
            if (ligne > 0) {
                if (colonne>= 0 && tableMine[ligne - 1][colonne - 1] == 0 ){
                   tableRun[ligne - 1][colonne - 1] = 1; 
                }
                if(tableMine[ligne - 1][colonne] == 0){
                    tableRun[ligne - 1][colonne] = 1;
                }
                if(colonne <= nbLigneColonne && tableMine[ligne - 1][colonne + 1] == 0){
                    tableRun[ligne - 1][colonne + 1] = 1;
                }
            }
            if (colonne >0 &&tableMine[ligne][colonne - 1] == 0) {
                tableRun[ligne][colonne - 1] = 1;
            }
            if(colonne < nbLigneColonne && tableMine[ligne][colonne + 1] == 0){
                tableRun[ligne][colonne + 1] = 1;
            }
            if (ligne < nbLigneColonne) {
                if (colonne>= 0 && tableMine[ligne + 1][colonne - 1] == 0) {
                    tableRun[ligne + 1][colonne - 1] = 1;
                }
                if(tableMine[ligne + 1][colonne] == 0){
                    tableRun[ligne + 1][colonne] = 1;
                }
                if(colonne <= nbLigneColonne && tableMine[ligne + 1][colonne + 1] == 0){
                    tableRun[ligne + 1][colonne + 1] = 1;
                }
            }
        }

    }else{
        
    }
    dessiner();
}

function initDemainer() {

    //on fait le tableau de jeu
    for (let i = 0; i <= nbLigneColonne; i++) {
        tableRun[i] = new Array();
        for (let j = 0; j <= nbLigneColonne; j++) {
            tableRun[i][j] = 0;
        }
    }
    //on fait le tableau où il y a les mines
    for (let i = 0; i <= nbLigneColonne; i++) {
        tableMine[i] = new Array();
        for (let j = 0; j <= nbLigneColonne; j++) {
            if(getRandomInt(6) == 5){
                tableMine[i][j] = 1;
            }else{
                tableMine[i][j] = 0;
            }
        }
    }
    for (let i = 0; i <= nbLigneColonne; i++) {
        tableMineAutour[i] = new Array();
        for (let j = 0; j <= nbLigneColonne; j++) {
            //detection de bombe autour
            let nbBoom = 0;
            if (i > 0) {
                if (j>= 0 && tableMine[i - 1][j - 1] == 1 ){
                    nbBoom++;
                }
                if(tableMine[i - 1][j] == 1){
                    nbBoom++;
                }
                if(j <= nbLigneColonne && tableMine[i - 1][j + 1] == 1){
                    nbBoom++;
                }
            }
            if (tableMine[i][j - 1] == 1) {
                nbBoom++;
            }
            if(tableMine[i][j + 1] == 1){
                nbBoom++;
            }
            if (i < nbLigneColonne) {
                if (j>= 0 && tableMine[i + 1][j - 1] == 1) {
                    nbBoom++;
                }
                if(tableMine[i + 1][j] == 1){
                    nbBoom++;
                }
                if(j <= nbLigneColonne && tableMine[i + 1][j + 1] == 1){
                    nbBoom++;
                }
            }
            console.log("nombre de bombes : " + nbBoom);
            tableMineAutour[i][j] = nbBoom;
        }
    }
    dessiner();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
