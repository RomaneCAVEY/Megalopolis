import {List, Map, MapOf} from 'immutable';

type Graph<T> = MapOf<{vertices: List<T>, adj: List<List<number>>}>;

function initGraph<T>(): Graph<T>
{
    return Map({ vertices: List<T>(), adj: List<List<number>>() });
}

function addToGraph<T>(graph: Graph<T>, vertex: T): Graph<T>
{
    return initGraph();
}
