import {MapOf, Map, List} from "immutable";
import {randomInRange} from "./random.js";

// const seed : number = 150;

// Immutable dictionary for a quart of tile
type Road = MapOf<{ north: boolean, west: boolean, south: boolean, east: boolean}>;


// Create a road empty (no road)
function createEmptyRoad() : Road
{
    return Map({north: false, west: false, south: false, east: false});
}

// Create a random road with 1 entry and 1 exit
function createRandomRoad(seed : number) : Road
{
	// create an empty road
	let road : Road = createEmptyRoad();
	// get keys to set road
	const tab = List(road.keys());
	// take 2 random number between 0 and 3 to place part of road
	const firstRoad : number = randomInRange(seed, 0, 4);
	let secondRoad : number = randomInRange(seed, 0, 3);
	if (firstRoad === secondRoad)
		secondRoad = secondRoad + 1;
	// place part of road
	road = road.set(tab.get(firstRoad, "north"), true);
	road = road.set(tab.get(secondRoad, "south"), true);
	return road;
}


function createVerticalRoad() : Road
{
	return Map({north: true, west: false, south: true, east: false});
}

function createHorizontalRoad() : Road
{
	return Map({north: false, west: true, south: false, east: true});
}

// Road : North / East
function createCornerRoad() : Road
{
	return Map({north: true, west: false, south: false, east: true});
}

function flipRoadOnRight(r : Road) : Road
{
	if (r.get("north") && r.get("west")) {
		r = r.set("north", false);
		r = r.set("south", true);
	}
	else if (r.get("south") && r.get("west")) {
		r = r.set("west", false);
		r = r.set("east", true);
	}
	else if (r.get("south") && r.get("east")) {
		r = r.set("south", false);
		r = r.set("north", true);
	}
	else if (r.get("north") && r.get("east")) {
		r = r.set("east", false);
		r = r.set("west", true);
	}
	return r;
}

function flipRoadOnLeft(r : Road) : Road
{
	if (r.get("north") && r.get("west")) {
		r = r.set("west", false);
		r = r.set("east", true);
	}
	else if (r.get("south") && r.get("west")) {
		r = r.set("south", false);
		r = r.set("north", true);
	}
	else if (r.get("south") && r.get("east")) {
		r = r.set("east", false);
		r = r.set("west", true);
	}
	else if (r.get("north") && r.get("east")) {
		r = r.set("north", false);
		r = r.set("south", true);
	}
	return r;
}


export {Road, createEmptyRoad, createRandomRoad, createVerticalRoad, createHorizontalRoad, createCornerRoad, flipRoadOnLeft, flipRoadOnRight};
