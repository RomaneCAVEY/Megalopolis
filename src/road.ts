import {MapOf, Map, List} from "immutable";

type Road = MapOf<{ north: boolean, west: boolean, south: boolean, east: boolean}>;

function createEmptyRoad() : Road
{
    return Map({north: false, west: false, south: false, east: false});
}

function createRandomRoad() : Road
{
	const road : Road = createEmptyRoad();
	const tab = List(road.keys());
	const firstRoad : number = Math.floor(Math.random() * 4);
	let secondRoad : number = Math.floor(Math.random() * 3);
	if (firstRoad === secondRoad)
		secondRoad = secondRoad + 1;
	road.set(tab.get(firstRoad, "north"), true);
	road.set(tab.get(secondRoad, "north"), true);
	return road;
	/* switch(firstRoad) {
		case 0:
			road.set("north", true);
			break;
		case 1:
			road.set("west", true);
			break;
		case 2:
			road.set("south", true);
			break;
		case 3:
			road.set("east", true);
			break;
		default:
			console.log("No assignment of road");
	}
	switch(secondRoad) {
		case 0:
			road.set("north", true);
			break;
		case 1:
			road.set("west", true);
			break;
		case 2:
			road.set("south", true);
			break;
		case 3:
			road.set("east", true);
			break;
		default:
			console.log("No assignment of road");
	}
	return road; */
}

export {Road, createEmptyRoad, createRandomRoad};
