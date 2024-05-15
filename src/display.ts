import {nil, BlueBg, RedBg, Reset, GreyBg, GreenBg} from "./common.js";
import * as B from "./board.js";
import * as T from "./tile.js";
import * as R from "./road.js";
import * as N from "./neighborhood.js";
import * as D from "./deck.js";


function strRoad(r : R.Road) : string
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

function strNeighborhood(n : N.Color) : string
{
	switch (n) {
		case N.Color.Blue:
			return BlueBg;
		case N.Color.Green:
			return GreenBg;
		case N.Color.Grey:
			return GreyBg;
		case N.Color.Red:
			return RedBg;
		default:
			return "-";
	}
}

function displayTile(t : T.Tile)
{
	console.log(strNeighborhood(t.get("neighborhoods").get("nw")) + strRoad(t.get("roads").get("nw") ) + Reset + "" 
	+ strNeighborhood(t.get("neighborhoods").get("ne")) + strRoad(t.get("roads").get("ne")) + Reset);
	console.log(strNeighborhood(t.get("neighborhoods").get("sw")) + strRoad(t.get("roads").get("sw")) + Reset + "" 
	+ strNeighborhood(t.get("neighborhoods").get("se")) + strRoad(t.get("roads").get("se")) + Reset + "\n");
}

function strXYQuarter(q : B.Quarter) : string
{
	return "Coordonate : (" + q?.get("x") + ", " + q?.get("y") + ")";
}

function displayQuarter(q : B.Quarter) : string
{
	// console.log(strXYQuarter(q));
	if (q?.get("color") === nil)
		throw new Error("Pas defini");
	return strNeighborhood(q.get("color"))+ strRoad(q.get("road")) + Reset;
	// console.log(strRoad(q.get("road")));
}

function displayBoardWithCoordonate(b : B.Board)
{
	/* console.log("Etat du board : \n");
	console.log(b); */
	b.map((e) => console.log(displayQuarter(e)));
}

function displayBoard(board : B.Board)
{
	const xmin : number = board.reduce((acc, elem) => (elem === nil)?0:(elem.get("x") < acc)?elem.get("x"):acc, 0);
	const xmax : number = board.reduce((acc, elem) => (elem === nil)?0:(elem.get("x") > acc)?elem.get("x"):acc, 0);
	const ymax : number = board.reduce((acc, elem) => (elem === nil)?0:(elem.get("y") > acc)?elem.get("y"):acc, 0);
	const ymin : number = board.reduce((acc, elem) => (elem === nil)?0:(elem.get("y") < acc)?elem.get("y"):acc, 0);
	displayColumn(board, ymin, ymax, xmin, xmax);
}

function displayLine(board : B.Board, y : number, begin : number, end : number) : string
{
	if (begin === end+1)
		return " ";
	const q : B.Quarter = B.findQuarter(board, begin, y);
	if (q !== nil)
		return displayQuarter(q) + displayLine(board, y, begin+1, end);
	else
		return "  " + displayLine(board, y, begin+1, end);
	/* const line = board.filter((quarter) => quarter?.get("y") === y);
	line.map((elem) => {
		function dhsj(begin : number, end : number,  )
	}) */
}

function displayColumn(board : B.Board, ymin : number, ymax : number, xmin : number, xmax : number) : number
{
	// console.log(" ----------------------- Affichage de la ligne : " + ymax + "-----------------------")
	if (ymax === ymin-1)
		return 0;
	else 
		console.log(displayLine(board, ymax, xmin, xmax) + "  " + ymax);
		return displayColumn(board, ymin, ymax-1, xmin, xmax);
}

function displayDeck(d : D.Deck) 
{
	d.map((e) => displayTile(e));
}

export {strNeighborhood, strRoad, displayTile, displayQuarter, displayBoardWithCoordonate, displayDeck, displayBoard};