type Road = { north: boolean, west: boolean, south: boolean, east: boolean};

function createRoad() : Road
{
    let road = {north: false, west: false, south: false, east: false};
    return road;
}

export {Road};
