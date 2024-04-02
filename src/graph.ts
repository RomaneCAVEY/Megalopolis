import {List, Map, MapOf} from 'immutable';

type Graph<T> = MapOf<{vertices: List<T>, adj: List<List<number>>}>;

function initGraph<T>(): Graph<T>
{
    return Map({ vertices: List<T>(), adj: List<List<number>>() });
}

function addVertex<T>(graph: Graph<T>, vertex: T): Graph<T>
{
    const newVertices = graph.get('vertices').push(vertex);
    const newAdj = graph.get('adj').push(List());
    const newGraph = graph.set("vertices", newVertices);
    return newGraph.set("adj", newAdj);
}

function addEdge<T>(graph: Graph<T>, indexV1: number, indexV2: number): Graph<T>
{
    if (graph.get('adj').get(indexV1, List<number>()).includes(indexV2))
	return graph; // Edge already exists
    
    const newAdj1 = graph.get('adj').get(indexV1, List<number>()).push(indexV2);
    const newGraph = graph.set('adj', graph.get('adj').set(indexV1, newAdj1));
    const newAdj2 = newGraph.get('adj').get(indexV2, List<number>()).push(indexV1);
    return newGraph.set("adj", graph.get('adj').set(indexV2, newAdj2));
}

function getVertices<T>(graph: Graph<T>): List<T>
{
    return graph.get('vertices');
}

function getVertexNeighbors<T>(graph: Graph<T>, vertexIndex: number): List<T>
{
    const adj = graph.get('adj').get(vertexIndex);
    return graph.get('vertices').filter((key, e) => adj.includes(key));
}

export {Graph, initGraph, addVertex, addEdge, getVertices, getVertexNeighbors};
