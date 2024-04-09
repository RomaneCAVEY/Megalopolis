import {MapOf, Map, List} from "immutable";

// Immutable dictionary for a quart of tile
type Road = MapOf<{ north: boolean, west: boolean, south: boolean, east: boolean}>;


// Create a road empty (no road)
function createEmptyRoad() : Road
{
    return Map({north: false, west: false, south: false, east: false});
}

// Create a random road with 1 entry and 1 exit
function createRandomRoad() : Road
{
	// create an empty road
	let road : Road = createEmptyRoad();
	// get keys to set road
	const tab = List(road.keys());
	// take 2 random number between 0 and 3 to place part of road
	const firstRoad : number = Math.floor(Math.random() * 4);
	let secondRoad : number = Math.floor(Math.random() * 3);
	if (firstRoad === secondRoad)
		secondRoad = secondRoad + 1;
	// place part of road
	road = road.set(tab.get(firstRoad, "north"), true);
	road = road.set(tab.get(secondRoad, "north"), true);
	return road;
}

export {Road, createEmptyRoad, createRandomRoad};
