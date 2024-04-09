import * as B from "./board.js";
import * as T from "./tile.js";
import * as R from "./road.js";
import * as N from "./neighborhood.js";
import * as O from "./objectives";

function printRoad(r : R.Road) : string
{
	let f : string = "0", s : string = "0";
	if (r.get("north")) {
		f = "↑";
	}
	if (r.get("south")) {
		s = "↓";
	}
	if (r.get("west")) {
		if (f === "0")
			f = "←";
		else
			s = "←";
	}
	if (r.get("east")) {
		if (f === "0")
			f = "→";
		else
			s = "→";
	}
	return f+s;
}

function printNeighborhood(n : N.Color) : string
{
	switch (n) {
		case N.Color.Blue:
			return "b";
		case N.Color.Green:
			return "v";
		case N.Color.Grey:
			return "g";
		case N.Color.Red:
			return "r";
		default:
			return "-";
	}
}

function printTile(t : T.Tile)
{
	console.log(printNeighborhood(t.get("neighborhoods").get("nw")) + printRoad(t.get("roads").get("nw")) + "    " 
	+ printNeighborhood(t.get("neighborhoods").get("ne")) + printRoad(t.get("roads").get("ne")));
	console.log(printNeighborhood(t.get("neighborhoods").get("sw")) + printRoad(t.get("roads").get("sw")) + "    " 
	+ printNeighborhood(t.get("neighborhoods").get("se")) + printRoad(t.get("roads").get("se")) + "\n");
}

// const tile : T.Tile = T.createRandomTile();
// printTile(tile);

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