import {nil} from "./common.js";
import {Road} from "./road.js";
import {Color} from "./neighborhood.js";
import * as G from "./graph.js";

import {List} from 'immutable';
type Quarter = {x: number, y: number, road: Road, color: Color} | undefined; // nil
type Board = List<Quarter>;

function initBoard(): Board
{
    return List<Quarter>();
}

function findQuarter(board: Board, x: number, y: number): Quarter
{
    const b: Board = board.filter((e: Quarter): boolean => (e !== nil && e.x === x)).filter((e: Quarter): boolean => (e!== nil && e.y === y));
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
    if (findQuarter(board, quarter.x, quarter.y) !== nil) {
	nb = removeQuarterFromBoard(nb, quarter.x, quarter.y);
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

function buildRoadGraph(board: Board) : G.Graph<Road>
{
    const graph: Graph = board.reduce(
	(graph: G.Graph, q: Quarter): G.Graph => G.addVertex(graph, q),
	G.initGraph<Road>()
    );

    return board.reduce(
	(q: Quarter): G.Graph<Road> => roadCase(graph, q, board),
	graph
    );
}

function roadCase(graph: G.Graph, quarter: Quarter, board: Board) : G.Graph<Road>
{
    // TODO : améliorer la pureté
    const x = quarter.get('x');
    const y = quarter.get('y');

    const newGraph = graph;
    
    if (quarter.get('road').get('north') === true && findQuarter(board, x, y + 1).get('road').get('south') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x, y + 1));

    if (quarter.get('road').get('east') === true && findQuarter(board, x + 1, y).get('road').get('west') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x + 1, y));

    if (quarter.get('road').get('south') === true && findQuarter(board, x, y - 1).get('road').get('north') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x, y - 1));

    if (quarter.get('road').get('west') === true && findQuarter(board, x - 1, y).get('road').get('east') === true)
	newGraph = G.addEdge(newGraph, findQuarterIndexInGraph(graph, x, y), findQuarterIndexInGraph(graph, x - 1, y));

    return newGraph;
}

function findQuarterIndexInGraph(graph: G.graph, x: number, y: number): number
{
    return graph.get('vertices').findIndex(
	(v) => (v.get('x') === x
	    && v.get('y') === y)
    );
}			      


export{initBoard,addQuarterToBoard,removeQuarterFromBoard};
