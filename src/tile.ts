type Road = import("./road.js");
type Color = import("./neighborhood.js");

type TileDict<T> = {nw: T, ne: T, se: T, sw: T};

type Tile = { roads: TileDict<Road>, neighborhoods: TileDict<Color>};

function createTile()
{
    let dict = {high_left:{}, high_right:[], low_left:"", low_right:""};
}
