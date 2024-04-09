import * as R from "./road.js";
import * as N from "./neighborhood.js";
import {Map, MapOf} from "immutable";

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
function createRandomNeighborhoodDict() : TileDict<N.Color>
{
	const firstN : number = Math.floor(Math.random() * 4);
	let secondN : number = Math.floor(Math.random() * 3);
	let thirdN : number = Math.floor(Math.random() * 2);
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
function createRandomRoadDict(nDict : TileDict<N.Color>) : TileDict<R.Road>
{
	let rDict : TileDict<R.Road> = createEmptyRoadDict();
	if (nDict.get("ne") !== N.Color.Green)
		rDict = rDict.set("ne", R.createRandomRoad());
	if (nDict.get("nw") !== N.Color.Green)
		rDict = rDict.set("nw", R.createRandomRoad());
	if (nDict.get("se") !== N.Color.Green)
		rDict = rDict.set("se", R.createRandomRoad());
	if (nDict.get("sw") !== N.Color.Green)
		rDict = rDict.set("sw", R.createRandomRoad());
	return rDict;
}

// create real random tile
function createRandomTile() : Tile
{
	const nDict : TileDict<N.Color> = createRandomNeighborhoodDict();
	const rDict : TileDict<R.Road> = createRandomRoadDict(nDict);
	return Map({roads : rDict, neighborhoods : nDict});
}

// flip a tile by 180°
function flipTile(tile: Tile): Tile
{
	const neighborhoods : TileDict<N.Color> = tile.get("neighborhoods");
	const roads : TileDict<R.Road> = tile.get("roads");
	const newRoads : TileDict<R.Road> = Map({ne : roads.get("sw"), se : roads.get("nw"), sw : roads.get("ne"), nw : roads.get("se")});
	const newNeighborhoods : TileDict<N.Color> = Map({ne : neighborhoods.get("sw"), se : neighborhoods.get("nw"), sw : neighborhoods.get("ne"), nw : neighborhoods.get("se")});

	const newTile : Tile = tile.set("roads", newRoads);
	const newTileEnd : Tile = newTile.set("neighborhoods", newNeighborhoods);

    return newTileEnd;
}

export {createEmptyRoadDict, createEmptyNeighborhoodDict,createRandomNeighborhoodDict, createEmptyTile, createRandomTile, Tile, TileDict,flipTile};
