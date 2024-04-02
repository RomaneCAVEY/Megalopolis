import * as R from "./road.js";
import * as N from "./neighborhood.js";
import {Map, MapOf} from "immutable";

type TileDict<T> = MapOf<{nw: T, ne: T, se: T, sw: T}>;

type Tile = MapOf<{roads: TileDict<R.Road>, neighborhoods: TileDict<N.Color>}>;

function createEmptyRoadDict(): TileDict<R.Road>
{
    return Map({nw: R.createEmptyRoad(), ne: R.createEmptyRoad(), se: R.createEmptyRoad(), sw: R.createEmptyRoad()});
}

function createEmptyNeighborhoodDict(): TileDict<N.Color>
{
    return Map({nw: N.getGreenNeighborhood(), ne: N.getGreenNeighborhood(), se: N.getGreenNeighborhood(), sw: N.getGreenNeighborhood()});
}

function createEmptyTile(): Tile
{
    return Map({roads: createEmptyRoadDict(), neighborhoods: createEmptyNeighborhoodDict()});
}



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

function createRandomTile() : Tile
{
	const nDict : TileDict<N.Color> = createRandomNeighborhoodDict();
	const rDict : TileDict<R.Road> = createRandomRoadDict(nDict);
	return Map({roads : rDict, neighborhoods : nDict});
}

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

export {createEmptyTile, createRandomTile, Tile, TileDict};