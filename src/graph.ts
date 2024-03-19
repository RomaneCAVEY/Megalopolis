type Graph<T> = { vertices: Array<T>, adj: Array<Array<number>> };

function initGraph<T>(): Graph<T>
{
    return { vertices: [], adj: [] };
}

function addToGraph<T>(graph: Graph<T>, vertex: T): Graph<T>
{
    return initGraph();
}
