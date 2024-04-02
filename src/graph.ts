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
    const adj: List<number> = graph.get('adj').get(vertexIndex, List());
    return graph.get('vertices').filter((e, key) => adj !== undefined && adj.includes(key));
}

function connexCompRec<T>(graph: Graph<T>,
			  notVisited: List<T>,
			  vertexIndex: number,
			  classes: List<List<T>>,
			  currentClass: number): MapOf<{notVisited: List<T>, classes: List<List<T>>}>
{
    const v = graph.get('vertices').get(vertexIndex);
    if (v === undefined)
	throw new Error("Vertex " + vertexIndex + " is not in graph. This should never happen.");

    // Delete the vertex that we're currently visiting.
    const newNotVisited = notVisited.delete(notVisited.indexOf(v));

    // Add it to its class
    const newClasses = classes.set(currentClass, classes.get(currentClass, List<T>()).push(v));

    // Get the vertex neighbors and only keep the ones that were not yet visited.
    const toVisit = getVertexNeighbors(graph, vertexIndex).filter((e) => newNotVisited.includes(e));

    // If no neighbors and no nodes to visit, then return to parent function call.
    if (toVisit.size === 0 && notVisited.size === 0)
	return Map({notVisited: notVisited, classes: classes});
    
    // In case there is nothing to visit, take the next Vertex in notVisited and prepare a new class
    const newToVisit = (toVisit.size === 0) ? List<T>([notVisited.first()]) : toVisit;
    const newCurrentClass = (toVisit.size === 0) ? newClasses.size : currentClass;
    const newNewClasses = (toVisit.size === 0) ? newClasses.push(List<T>()) : newClasses;

/*    if (newToVisit === undefined || newToVisit === null)
	throw new Error("newToVisit is undefined. This should never happen.");*/
    
    // For each neighbor, do a recursive function call.
    const r = newToVisit.reduce(
	(acc, val) => connexCompRec(
	    graph,
	    acc.get('notVisited'),
	    graph.get('vertices').indexOf(val),
	    acc.get('classes'),
	    newCurrentClass
	),
	Map({notVisited: newNotVisited, classes: newNewClasses})
    );

    return r;
}

function getConnexComponents<T>(graph: Graph<T>): List<List<T>>
{
    const notVisited: List<T> = graph.get('vertices');
    if (notVisited.size === 0)
	return List<List<T>>();
    else
	return connexCompRec<T>(graph, notVisited, 0, List<List<T>>().push(List<T>()), 0).get('classes', List<List<T>>());
}

export {Graph, initGraph, addVertex, addEdge, getVertices, getVertexNeighbors};
