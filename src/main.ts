import * as B from "./board.js";
import * as T from "./tile.js";
import * as R from "./road.js";
import * as N from "./neighborhood.js";
import * as D from "./display.js";
import * as O from "./objectives";


const tile : T.Tile = T.createRandomTile();
D.printTile(tile);

// const board = B.initBoard();
// const objectives = O.initializeObjectives();
/* 
objScore   = objectives.reduce((aTempScore, anObjective) => {
      return aTempScore + objectiveScore(anObjective);
})
deck       = getDeck()
finalBoard = deck.reduce((aBoard, aCard) => {
      aPlace = findPosition(aBoard, aCard, objectives);
      aNewBoard = placeCard(aBoard, aCard, aPlace);
      return aNewBoard;
})
finalScore = objectives.reduce((aTempScore, anObjective) => {
      return aTempScore + computeObjectiveBoardScore(anObjective, finalBoard);
})
hasWon     = (finalScore >= objScore)
 */