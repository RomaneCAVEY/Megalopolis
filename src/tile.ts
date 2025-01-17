import * as R from "./road.js";
import * as N from "./neighborhood.js";
import {Map, MapOf} from "immutable";
import {randomInRange} from "./random.js";

// Immutable dictionary of Road or Neighborhood with their placement on the tile
type TileDict<T> = MapOf<{nw: T, ne: T, se: T, sw: T}>;

// Immutable dictionary of two tileDict resp. Road and Neighborhood
type Tile = MapOf<{roads: TileDict<R.Road>, neighborhoods: TileDict<N.Color>}>;

// Create empty roads in all tile
function createEmptyRoadDict(): TileDict<R.Road>
{
    return Map({nw: R.createEmptyRoad(), ne: R.createEmptyRoad(), se: R.createEmptyRoad(), sw: R.createEmptyRoad()});
}

// Create green neighborhood in all tile
function createEmptyNeighborhoodDict(): TileDict<N.Color>
{
    return Map({nw: N.getRainbowNeighborhood(), ne: N.getRainbowNeighborhood(), se: N.getRainbowNeighborhood(), sw: N.getRainbowNeighborhood()});
}

// Combine empty RoadDict and empty NeighborhoodDict in a tile
function createEmptyTile(): Tile
{
    return Map({roads: createEmptyRoadDict(), neighborhoods: createEmptyNeighborhoodDict()});
}


// create real random neighborhoods in all tile
function createRandomNeighborhoodDict(seed : number) : TileDict<N.Color>
{
	const firstN : number = randomInRange(seed, 0, 4);
	let secondN : number = randomInRange(seed, 0, 3);
	let thirdN : number = randomInRange(seed, 0, 2);
	if (firstN === secondN) 
		secondN = secondN + 1;
	if (thirdN === secondN)
		thirdN = thirdN + 1;
	if (thirdN === firstN)
		thirdN = thirdN + 1;
	if (thirdN === secondN)
		thirdN = thirdN + 1;
	const lastN : number = 6 - thirdN - secondN - firstN;
	return Map({nw: N.createNeighborhood(firstN), ne: N.createNeighborhood(secondN), se: N.createNeighborhood(thirdN), sw: N.createNeighborhood(lastN)});
}

// create real random roads in all tile
function createRandomRoadDict(seed : number, nDict : TileDict<N.Color>) : TileDict<R.Road>
{
	let rDict : TileDict<R.Road> = createEmptyRoadDict();
	if (nDict.get("ne") !== N.Color.Green)
		rDict = rDict.set("ne", R.createRandomRoad(seed));
	if (nDict.get("nw") !== N.Color.Green)
		rDict = rDict.set("nw", R.createRandomRoad(seed+1));
	if (nDict.get("se") !== N.Color.Green)
		rDict = rDict.set("se", R.createRandomRoad(seed+20));
	if (nDict.get("sw") !== N.Color.Green)
		rDict = rDict.set("sw", R.createRandomRoad(seed+300));
	return rDict;
}


function createRoadBaseOnNeighborhood(nDict : TileDict<N.Color>) : TileDict<R.Road>
{
	let rDict : TileDict<R.Road> = createEmptyRoadDict();
	if (nDict.get("ne") === N.Color.Green) {
		rDict = rDict.set("se", R.createHorizontalRoad());
		rDict = rDict.set("sw", R.createCornerRoad());
		rDict = rDict.set("nw", R.createVerticalRoad());
	} else if (nDict.get("nw") === N.Color.Green) {
		rDict = rDict.set("sw", R.createHorizontalRoad());
		rDict = rDict.set("se", R.flipRoadOnRight(R.createCornerRoad()));
		rDict = rDict.set("ne", R.createVerticalRoad());
	} else if (nDict.get("se") === N.Color.Green) {
		rDict = rDict.set("ne", R.createHorizontalRoad());
		rDict = rDict.set("nw", R.flipRoadOnLeft(R.createCornerRoad()));
		rDict = rDict.set("sw", R.createVerticalRoad());
	} else if (nDict.get("sw") === N.Color.Green) {
		rDict = rDict.set("nw", R.createHorizontalRoad());
		rDict = rDict.set("ne", R.flipRoadOnRight(R.flipRoadOnRight(R.createCornerRoad())));
		rDict = rDict.set("se", R.createVerticalRoad());
	}
	return rDict;
}


// create real random tile
function createRandomTile(seed : number) : Tile
{
	const nDict : TileDict<N.Color> = createRandomNeighborhoodDict(seed);
	const rDict : TileDict<R.Road> = createRandomRoadDict(seed, nDict);
	return Map({roads : rDict, neighborhoods : nDict});
}

// create random neighborhood with connexe road in tile
function createRandomTileWithConnexeRoad(seed : number) : Tile
{
	const nDict : TileDict<N.Color> = createRandomNeighborhoodDict(seed);
	const rDict : TileDict<R.Road> = createRoadBaseOnNeighborhood(nDict);
	return Map({roads : rDict, neighborhoods : nDict});
}

// flip a tile by 180°
function flipTile(tile: Tile): Tile
{
    const neighborhoods : TileDict<N.Color> = tile.get("neighborhoods");
    const roads : TileDict<R.Road> = tile.get("roads");
    const newRoads : TileDict<R.Road> = Map({ne :  R.flipRoadOnRight(R.flipRoadOnRight(roads.get("sw"))), se : R.flipRoadOnRight(R.flipRoadOnRight(roads.get("nw"))), sw : R.flipRoadOnRight(R.flipRoadOnRight(roads.get("ne"))), nw : R.flipRoadOnRight(R.flipRoadOnRight(roads.get("se")))});
    //const newRoads2 : TileDict<R.Road> = newRoads.map((x)=>{ return R.flipRoadOnRight(R.flipRoadOnRight(x))});

    
    const newNeighborhoods : TileDict<N.Color> = Map({ne : neighborhoods.get("sw"), se : neighborhoods.get("nw"), sw : neighborhoods.get("ne"), nw : neighborhoods.get("se")});

    const newTile : Tile = tile.set("roads", newRoads);
    const newTileEnd : Tile = newTile.set("neighborhoods", newNeighborhoods);

    return newTileEnd;
}

export {createEmptyRoadDict, createEmptyNeighborhoodDict,createRandomNeighborhoodDict, createEmptyTile, createRandomTile, Tile, TileDict,flipTile, createRandomTileWithConnexeRoad};
