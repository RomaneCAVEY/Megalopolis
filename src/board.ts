import {nil} from "./common.js";
import {Road} from "./road.js";
import {Color} from "./neighborhood.js";
import * as G from "./graph.js";

import {List, MapOf} from 'immutable';

//create two types the board and quarter which compose the board
type Quarter = MapOf<{x: number, y: number, road: Road, color: Color}> | undefined; // nil
type Board = List<Quarter>;

function initBoard(): Board
{
    return List<Quarter>();
}

function board_is_empty(board : Board) : boolean
{	
	return board.isEmpty();
}

// find a quarter with coordonate
function findQuarter(board: Board, x: number, y: number): Quarter
{
    const b: Board = board.filter((e: Quarter): boolean => (e !== nil && e.get('x') === x)).filter((e: Quarter): boolean => (e!== nil && e.get('y') === y));
    if (b.size === 0)
	return nil;
    else
	return b.get(0, nil);
}


function addQuarterToBoard(board: Board, quarter: Quarter): Board
{
    if (quarter === nil)
	return board;
    let nb: Board = board;
    if (findQuarter(board, quarter.get('x'), quarter.get('y')) !== nil) {
	nb = removeQuarterFromBoard(nb, quarter.get('x'), quarter.get('y'));
    }
    nb = nb.push(quarter);
    return nb;
}

function removeQuarterFromBoard(board: Board, x: number, y: number) : Board
{
    const q: Quarter = findQuarter(board, x, y);
    let nb: Board = board;
    nb = board.slice(nb.indexOf(q), 1);
    return nb;
}



// return index of vertices' list
function findQuarterIndexInGraph(graph: G.Graph<Quarter>, x: number, y: number): number
{
    return graph.get('vertices').findIndex(
	(v: Quarter) => (v !== nil && v.get('x') === x && v.get('y') === y)
    );
}


// build road graph from board
function buildRoadGraph(board: Board) : G.Graph<Quarter>
{
    const graph: G.Graph<Quarter> = board.reduce(
	(graph: G.Graph<Quarter>, q: Quarter): G.Graph<Quarter> => G.addVertex(graph, q),
	G.initGraph<Quarter>()
    );

    return board.reduce(
	(g: G.Graph<Quarter>, q: Quarter): G.Graph<Quarter> => roadCase(g, q, board),
	graph
    );
}

// return the road graph after adding an edge if conditions are check
function roadCase(graph: G.Graph<Quarter>, quarter: Quarter, board: Board) : G.Graph<Quarter>
{
    if (quarter === nil)
	return graph;
    // TODO : améliorer la pureté
    const x: number = quarter.get('x');
    const y: number = quarter.get('y');

    let newGraph: G.Graph<Quarter> = graph; // let non fonctionnel

    const qy1 = findQuarter(board, x, y + 1);
    const qyn1 = findQuarter(board, x, y - 1);
    const qx1 = findQuarter(board, x + 1, y);
    const qxn1 = findQuarter(board, x - 1, y);
    
    
    if (quarter.get('road').get('north') === true && qy1 !== nil && qy1.get('road').get('south') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x, y + 1));

    if (quarter.get('road').get('east') === true && qx1 !== nil && qx1.get('road').get('west') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x + 1, y));

    if (quarter.get('road').get('south') === true && qyn1 !== nil && qyn1.get('road').get('north') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x, y - 1));

    if (quarter.get('road').get('west') === true && qxn1 !== nil && qxn1.get('road').get('east') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x - 1, y));

    return newGraph;
}


// build neiborhood graph from board
function buildNeighborhoodGraph(board: Board) : G.Graph<Quarter>
{
    const graph: G.Graph<Quarter> = board.reduce(
	(graph: G.Graph<Quarter>, q: Quarter): G.Graph<Quarter> => G.addVertex(graph, q),
	G.initGraph<Quarter>()
    );

    return board.reduce(
	(g: G.Graph<Quarter> ,q: Quarter): G.Graph<Quarter> => roadCase(graph, q, board),
	graph
    );
}


// return the neighborhood graph after adding an edge if conditions are check
function neighborhoodCase(graph: G.Graph<Quarter>, quarter: Quarter, board: Board) : G.Graph<Quarter>
{
    if (quarter === nil)
	return graph;
    
    const x: number = quarter.get('x');
    const y: number = quarter.get('y');

    let newGraph: G.Graph<Quarter> = graph; // let non fonctionnel

    const qy1 = findQuarter(board, x, y + 1); 
    const qyn1 = findQuarter(board, x, y - 1);
    const qx1 = findQuarter(board, x + 1, y);
    const qxn1 = findQuarter(board, x - 1, y);
    
    if (qy1 !== nil && quarter.get('color') === qy1.get('color'))
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x, y + 1));

    if (qx1 !== nil && quarter.get('color') === qx1.get('color'))
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x + 1, y));

    if (qyn1 !== nil && quarter.get('color') === qyn1.get('color'))
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x, y - 1));

    if (qxn1 !== nil && quarter.get('color') === qxn1.get('color'))
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x - 1, y));
    
    return newGraph;
}



export{initBoard,addQuarterToBoard,removeQuarterFromBoard,Board,Quarter,board_is_empty};
