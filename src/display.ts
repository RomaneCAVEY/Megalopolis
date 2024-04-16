import {nil} from "./common.js";
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

function displayTile(t : T.Tile)
{
	console.log(strNeighborhood(t.get("neighborhoods").get("nw")) + strRoad(t.get("roads").get("nw")) + "    " 
	+ strNeighborhood(t.get("neighborhoods").get("ne")) + strRoad(t.get("roads").get("ne")));
	console.log(strNeighborhood(t.get("neighborhoods").get("sw")) + strRoad(t.get("roads").get("sw")) + "    " 
	+ strNeighborhood(t.get("neighborhoods").get("se")) + strRoad(t.get("roads").get("se")) + "\n");
}

function strXYQuarter(q : B.Quarter) : string
{
	return "Coordonate : (" + q?.get("x") + ", " + q?.get("y") + ")";
}

function displayQuarter(q : B.Quarter)
{
	console.log(strXYQuarter(q));
	if (q?.get("color") === nil)
		throw new Error("Pas defini");
	console.log(strNeighborhood(q?.get("color")));
	console.log(strRoad(q.get("road")));
}

function displayBoard(b : B.Board)
{
	b.map((e) => displayQuarter(e));
}

function displayDeck(d : D.Deck) 
{
	d.map((e) => displayTile(e));
}

export {strNeighborhood, strRoad, displayTile, displayQuarter, displayBoard, displayDeck};