type Road = { north: boolean, west: boolean, south: boolean, east: boolean};

function createRoad() : Road
{
    return {north: false, west: false, south: false, east: false};
}

export {Road, createRoad};
