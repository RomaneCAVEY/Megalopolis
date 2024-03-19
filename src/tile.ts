import {Road, createRoad} from "./road.js";
import {Color, createNeighborhood} from "./neighborhood.js";
import {Map, MapOf} from "immutable";

type TileDict<T> = MapOf<{nw: T, ne: T, se: T, sw: T}>;

type Tile = MapOf<{roads: TileDict<Road>, neighborhoods: TileDict<Color>}>;

function createRoadDict(): TileDict<Road>
{
    return Map({nw: createRoad(), ne: createRoad(), se: createRoad(), sw: createRoad()});
}

function createNeighborhoodDict(): TileDict<Color>
{
    return Map({nw: createNeighborhood(), ne: createNeighborhood(), se: createNeighborhood(), sw: createNeighborhood()});
}

function createTile(): Tile
{
    return Map({roads: createRoadDict(), neighborhoods: createNeighborhoodDict()});
}

function flipTile(tile: Tile): Tile
{
    return tile; // TODO: flip the tile
}
