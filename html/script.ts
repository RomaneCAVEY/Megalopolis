import {finalBoard} from "../src/main.js"; 
import * as B from "../src/board.js"; 
import * as C from "../src/neighborhood.js"; 
import {List, Map, MapOf} from 'immutable';


// Déclaration des constantes
const board=finalBoard;

// Tableau d'URLs d'images
const images = [
    "empty.png", 
    "green.png", 
    "o_c.png", 
    "o_h.pgn",
    "o_v.png",
    "b_c.png", 
    "b_h.pgn",
    "b_v.png",
    "i_c.png", 
    "i_h.pgn",
    "i_v.png"
];



function quarter_line_in_board(board: B.Board, i:number){
    return board.filter((e)=> e!== undefined && e.get('x')===i  );      
}


function display(){
    function bis(i:number){
        if (i===(15*2)){
            return ;
        }
        quarter_line_in_board(finalBoard,i);
        bis(i++);
    }
    return bis(-15*2);
}


/**
 * the coordonnate (a,b) is 
 * a=> the index in the tab of picture wich correponds to the picture of the quarter
 * b=> the degreee of rotation needed to represent the quarter
 * 
 */
function correspondante(quartier : B.Quarter): any //List<number>
{

    if (quartier===undefined){
        return List<number>().push(0).push(0);
    }
    if (quartier.get('color')===C.Color.Green){
        return List<number>().push(1).push(0);
    }

    //Check blue
    if (quartier.get('color')===C.Color.Blue){
        if (quartier.get('road').get('east')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(6).push(0);
        }
        if (quartier.get('road').get('south')===true && quartier.get('road').get('north')===true ){
            return List<number>().push(7).push(0);
        }
        if (quartier.get('road').get('north')===true && quartier.get('road').get('east')===true ){
            return List<number>().push(5).push(0) ;
        }
        if (quartier.get('road').get('east')===true && quartier.get('road').get('south')===true ){
            
            return List<number>().push(5).push(90);
        }
        if (quartier.get('road').get('south')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(5).push(180);

        }
        if (quartier.get('road').get('north')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(5).push(270);

        }
    }
    //check red
    if (quartier.get('color')===C.Color.Red){
        if (quartier.get('road').get('east')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(3).push(0);
        }
        if (quartier.get('road').get('south')===true && quartier.get('road').get('north')===true ){
            return List<number>().push(4).push(0);
        }
        if (quartier.get('road').get('north')===true && quartier.get('road').get('east')===true ){
            return List<number>().push(2).push(0) ;
        }
        if (quartier.get('road').get('east')===true && quartier.get('road').get('south')===true ){
            
            return List<number>().push(2).push(90);
        }
        if (quartier.get('road').get('south')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(2).push(180);
            
        }
        if (quartier.get('road').get('north')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(2).push(270);
            
        }
    }


    //check grey
    if (quartier.get('color')===C.Color.Grey){
        if (quartier.get('road').get('east')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(9).push(0);
        }
        if (quartier.get('road').get('south')===true && quartier.get('road').get('north')===true ){
            return List<number>().push(10).push(0);
        }
        if (quartier.get('road').get('north')===true && quartier.get('road').get('east')===true ){
            return List<number>().push(8).push(0) ;
        }
        if (quartier.get('road').get('east')===true && quartier.get('road').get('south')===true ){
            
            return List<number>().push(8).push(90);
        }
        if (quartier.get('road').get('south')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(8).push(180);
            
        }
        if (quartier.get('road').get('north')===true && quartier.get('road').get('west')===true ){
            return List<number>().push(8).push(270);
            
        }
    }
    return 0;
    
}


/* function creerMatrice(i, j) {
   var matrice = [];
   for (var row = 0; row < i; row++) {
   matrice[row]=[];
   for (var col = 0; col < j; col++) {
   matrice[row][col] = images[0];; // Vous pouvez initialiser les valeurs comme vous le souhaitez
   }
   }
   return matrice;
   } */

/* 
// Fonction pour créer et afficher les balises img
function afficherImages() {
var imageTableDiv = document.getElementById("imageTable");

// Parcourir le tableau d'images
images.forEach(function(imageUrl) {
// Créer une balise img
var img = document.createElement("img");
// Définir l'attribut src de l'image
img.src = imageUrl;
// Ajouter la balise img au div imageTable
if(imageTableDiv)
imageTableDiv.appendChild(img);
else
{
console .log("cou");
}
});
}

// Appel de la fonction pour afficher les images
afficherImages();
*/
display(); 
