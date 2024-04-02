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
	// TO DO : made random genration with Math.random()
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
	const rDict : TileDict<R.Road> = createEmptyRoadDict();
	if (nDict.get("ne") !== N.Color.Green)
		rDict.set("ne", R.createRandomRoad());
	else if (nDict.get("nw") !== N.Color.Green)
		rDict.set("nw", R.createRandomRoad());
	else if (nDict.get("se") !== N.Color.Green)
		rDict.set("se", R.createRandomRoad());
	else if (nDict.get("sw") !== N.Color.Green)
		rDict.set("sw", R.createRandomRoad());
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
    return tile; // TODO: flip the tile
}

export {createEmptyTile, createRandomTile, Tile, TileDict};