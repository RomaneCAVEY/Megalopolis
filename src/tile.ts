import {Road, createRoad} from "./road.js";
import {Color, createNeighborhood} from "./neighborhood.js";

type TileDict<T> = {nw: T, ne: T, se: T, sw: T};

type Tile = {roads: TileDict<Road>, neighborhoods: TileDict<Color>};

function createRoadDict(): TileDict<Road>
{
    return {nw: createRoad(), ne: createRoad(), se: createRoad(), sw: createRoad()};
}

function createNeighborhoodDict(): TileDict<Color>
{
    return {nw: createNeighborhood(), ne: createNeighborhood(), se: createNeighborhood(), sw: createNeighborhood()};
}

function createTile(): Tile
{
    return {roads: createRoadDict(), neighborhoods: createNeighborhoodDict()};
}

function flipTile(tile: Tile): Tile
{
    return tile; // TODO: flip the tile
}
