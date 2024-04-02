import {Road, createEmptyRoad} from "./road.js";
import {Color, createNeighborhood, getNeighborhood} from "./neighborhood.js";
import {Map, MapOf} from "immutable";

type TileDict<T> = MapOf<{nw: T, ne: T, se: T, sw: T}>;

type Tile = MapOf<{roads: TileDict<Road>, neighborhoods: TileDict<Color>}>;

function createEmptyRoadDict(): TileDict<Road>
{
    return Map({nw: createEmptyRoad(), ne: createEmptyRoad(), se: createEmptyRoad(), sw: createEmptyRoad()});
}

function createEmptyNeighborhoodDict(): TileDict<Color>
{
    return Map({nw: createNeighborhood(), ne: createNeighborhood(), se: createNeighborhood(), sw: createNeighborhood()});
}

function createEmptyTile(): Tile
{
    return Map({roads: createEmptyRoadDict(), neighborhoods: createEmptyNeighborhoodDict()});
}



function getRandomNeighborhoodDict() : TileDict<Color>
{
	// TO DO : made random genration with Math.random()
	return Map({nw: getNeighborhood(0), ne: getNeighborhood(1), se: getNeighborhood(2), sw: getNeighborhood(3)});
}

function getRandomRoadDict(nDict : TileDict<Color>) : TileDict<Road>
{
	// let rDict : TileDict<Road> = createEmptyRoadDict();

	return Map({nw: createEmptyRoad(), ne: createEmptyRoad(), se: createEmptyRoad(), sw: createEmptyRoad()});
}

function flipTile(tile: Tile): Tile
{
    return tile; // TODO: flip the tile
}

export {createEmptyTile, Tile, TileDict};