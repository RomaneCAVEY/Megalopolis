import * as B from "./board.js";
import * as T from "./tile.js";
import * as R from "./road.js";
import * as N from "./neighborhood.js";
import * as D from "./deck.js";
import * as Disp from "./display.js";
import * as O from "./objectives";


const tile : T.Tile = T.createRandomTile();
D.printTile(tile);

// alone is the current and unique player


const board : B.Board = initBoard();
const objectives : List<O.Objectives> =initObjectives();

const objScore   = objectives.reduce((aTempScore, anObjective) => {
      return aTempScore + objectiveScore(anObjective);
},0);

const deck : D.Deck = D.initDeck();

// equivalent to game loop
const finalBoard = D.deck.reduce((aBoard, aCard) => {
      const aPlace = findPosition(aBoard, aCard, objectives);
      const aNewBoard = placeTile(aBoard, aTile, aPlace);
      return aNewBoard;
}, board);

const finalScore = objectives.reduce((aTempScore, anObjective) => {
      return aTempScore + computeObjectiveBoardScore(anObjective, finalBoard);
},0);
const hasWon = (finalScore >= objScore);
