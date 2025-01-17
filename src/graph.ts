import {List, Map, MapOf} from 'immutable';

type Graph<T> = MapOf<{vertices: List<T>, adj: List<List<number>>}>;

function initGraph<T>(): Graph<T>
{
    return Map({ vertices: List<T>(), adj: List<List<number>>() });
}

function isEmpty<T>( graph: Graph<T>): boolean
{
    if (graph.get('vertices').size === 0 && graph.get('adj').size === 0 )
        return true;
    
    return false;
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
    return newGraph.set("adj", newGraph.get('adj').set(indexV2, newAdj2));
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
                          currentClass: number,
                          queued: number): MapOf<{notVisited: List<T>, classes: List<List<T>>, queued: number}>
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
    //console.log("Visiting (", v.get('x'), v.get('y'), ")\ntoVisit:", toVisit.map((e: B.Quarter) => "(" + e.get('x') + ", " + e.get('y') + ")").toArray());
    //console.log("queued:", queued);

    // If no neighbors and no nodes to visit, then return to parent function call.
    if (toVisit.size === 0 && (notVisited.size === 0 || queued > 0))
        return Map({notVisited: newNotVisited, classes: classes, queued: 0});
    
    // In case there is nothing to visit, take the next Vertex in notVisited and prepare a new class
    const newToVisit = (toVisit.size === 0) ? List<T>([newNotVisited.first()]) : toVisit;
    const newCurrentClass = (toVisit.size === 0) ? newClasses.size : currentClass;

    //console.log("newToVisit size:", newToVisit.size);
    
    // For each neighbor, do a recursive function call.
    const r = newToVisit.reduce(
        (acc, val) => connexCompRec(
            graph,
            acc.get('notVisited'),
            graph.get('vertices').indexOf(val),
            acc.get('classes'),
            newCurrentClass,
            acc.get('queued') - 1
        ),
        Map({notVisited: newNotVisited, classes: newClasses, queued: newToVisit.size})
    );

    return r;
}

function getConnexComponents<T>(graph: Graph<T>): List<List<T>>
{
    const notVisited: List<T> = graph.get('vertices');
    if (notVisited.size === 0)
        return List<List<T>>();
    else
        return connexCompRec<T>(graph, notVisited, 0, List<List<T>>().push(List<T>()), 0, 0).get('classes', List<List<T>>());
}

// Not used. Don't remember what it was for anymore.
/*function getComponentEdges<T>(graph: Graph<T>, component: List<T>): List<List<number>>
{
    // Get all vertices
    const vertices: List<T> = graph.get('vertices');

    // Get all edges
    return component.reduce(
        (acc, v1) => {
            // For each vertex v1 in component, get all its neighbors
            const neigh: List<T> = getVertexNeighbors(graph, vertices.indexOf(v1));
            return neigh.reduce(
                (acc2, v2) => {
                    // For each neighbor v2 of v1, make an edge linking v1 and v2 (v1 and v2 indices are sorted in ascending order since the graph is not directed)
                    const edge: List<number> = List([vertices.indexOf(v1), vertices.indexOf(v2)]).sort();
                    
                    // If edge is already known, it should not be registered a second time
                    if (acc2.includes(edge))
                        return acc2;
                    else
                        return acc2.push(edge);
                }, acc
            );
        },
        List<List<number>>([])
    );
}*/

/** Check if a connex component forms a cycle.
 * @param graph A graph
 * @param component A list of connected vertices
 * @return true if the components forms a cycle, false if not
 *
 * Notice : This function only checks that the component contains a cycle.
 */
function isCycle<T>(graph: Graph<T>, component: List<T>): boolean
{
    // TODO: this function is not programed in a functionnal style
    if (component.size < 3)
        return false;
    const vertices: List<T> = graph.get('vertices');
    const start: number = vertices.indexOf(component.first());
    let toVisit: List<number> = component.map((val) => vertices.indexOf(val));
    let visited: List<boolean> = vertices.map(() => false);
    let parents: List<number> = vertices.map(() => -1);

    parents = parents.set(start, start);
    while (toVisit.size > 0) {
        const current: number = toVisit.first();
        toVisit = toVisit.shift();
        visited = visited.set(current, true);
        
        const r: boolean = graph.get('adj', List()).get(current, List()).some((val : number) => {
            if (visited.get(val) === false) {
                toVisit = toVisit.push(val);
                visited = visited.set(val, true);
                parents = parents.set(val, current);
            } else if (visited.get(val) === true && parents.get(current) !== val) {
                return true;
            }
            return false;
        });

        if (r)
            return true;
    }
    return false;
}

/** Returns all cycles that are in the graph.
 * @param graph A graph
 * @return A list of all cycles (a cycle is a list of vertices)
 *
 * Notice: This function returns all vertices that are connected to a cycle. Some vertices may be outside the cycle itself.
 */
function getCycles<T>(graph: Graph<T>): List<List<T>>
{
    const classes: List<List<T>> = getConnexComponents<T>(graph);
    return classes.filter((val) => isCycle<T>(graph, val));
}


export {Graph, initGraph, isEmpty, addVertex, addEdge, getVertices, getVertexNeighbors, getConnexComponents, getCycles};
