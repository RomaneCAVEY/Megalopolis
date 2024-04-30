import * as B from "./board.js";
import * as T from "./tile.js";
import * as R from "./road.js";
import * as N from "./neighborhood.js";
import * as D from "./deck.js";
import * as Disp from "./display.js";
import * as O from "./objectives.js";
import * as G from "./graph.js";
import {List, Map, MapOf} from "immutable";

const seed : number = 10;

const tile : T.Tile = T.createRandomTile(seed);
Disp.displayTile(tile);

const board : B.Board = B.initBoard();
const colorGraph: G.Graph<B.Quarter> = G.initGraph();
const roadGraph: G.Graph<B.Quarter> = G.initGraph();
const objectives : List<O.Objectives> = O.initializeObjectives();

console.log("objectives: " + JSON.stringify(objectives));

const objScore = objectives.reduce((aTempScore, anObjective) => {
      return aTempScore + O.Point_of_objective(anObjective);
}, 0);

console.log("objScore: " + objScore);

const deck : D.Deck = D.createDeckWithSeed(seed*2);

console.log("deckSize: " + deck.size);

// equivalent to game loop
const finalValues: MapOf<{board: B.Board, cGraph: G.Graph<B.Quarter>, rGraph: G.Graph<B.Quarter>}> = deck.reduce((aTriplet, aCard) => {
    const aPlace = B.findPositionToAddTile(B.allPositionToAddTile(aTriplet.get('board')), aTriplet.get('board'), aCard, objectives);
    console.log("placing tile at pos: (" + aPlace.get(0) + ", " + aPlace.get(1) + ")");
	Disp.displayTile(aCard);
    const aNewBoard = B.placeTile(aTriplet.get('board'), aCard, aPlace.get(0, 0), aPlace.get(1, 0));
	/* console.log("Etat du board : ");
	console.log(aNewBoard);
	console.log("\n"); */
    const aNewCGraph = B.buildNeighborhoodGraph(aNewBoard);
    const aNewRGraph = B.buildRoadGraph(aNewBoard);
    return Map({board: aNewBoard, cGraph: aNewCGraph, rGraph: aNewRGraph});
}, Map({board: board, cGraph: colorGraph, rGraph: roadGraph}));

const finalBoard = finalValues.get('board');
const finalRoadGraph = finalValues.get('rGraph');
const finalColorGraph = finalValues.get('cGraph');

console.log(Disp.displayBoard(finalBoard));

const finalScore = O.objectives_player_gain(finalColorGraph, finalRoadGraph, finalBoard, objectives);

const hasWon = (finalScore >= objScore);

console.log("final score: " + finalScore + "; hasWon: " + hasWon);
