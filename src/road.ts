import {MapOf, Map} from "immutable";

type Road = MapOf<{ north: boolean, west: boolean, south: boolean, east: boolean}>;

function createRoad() : Road
{
    return Map({north: false, west: false, south: false, east: false});
}

export {Road, createRoad};
