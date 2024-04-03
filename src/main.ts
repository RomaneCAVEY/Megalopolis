import * as B from "./board.js";
import * as O from "./objectives";


const board = B.initBoard();
const objectives = O.initializeObjectives();
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