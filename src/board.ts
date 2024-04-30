import {nil} from "./common.js";
import {Road} from "./road.js";
import {Color} from "./neighborhood.js";
import {Tile} from "./tile.js";
import * as G from "./graph.js";
import * as O from './objectives.js';

import {List, Map, MapOf} from 'immutable';

//create two types the board and quarter which compose the board
type Quarter = MapOf<{x: number, y: number, road: Road, color: Color}> | undefined; // nil
type Board = List<Quarter>;

function initBoard(): Board
{
    return List<Quarter>();
}

function boardIsEmpty(board : Board) : boolean
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

// axe y to the top !
function tileToQuarter(tile: Tile, x: number, y: number): List<Quarter>
{
    const q1: Quarter = Map({x: x, y: y, road: tile.get('roads').get('nw'), color: tile.get('neighborhoods').get('nw')});
    const q2: Quarter = Map({x: x+1, y: y, road: tile.get('roads').get('ne'), color: tile.get('neighborhoods').get('ne')});
    const q3: Quarter = Map({x: x, y: y-1, road: tile.get('roads').get('sw'), color: tile.get('neighborhoods').get('sw')});
    const q4: Quarter = Map({x: x+1, y: y-1, road: tile.get('roads').get('se'), color: tile.get('neighborhoods').get('se')});

    return List([q1, q2, q3, q4]);
}


function placeTile(board: Board, tile: Tile, x: number, y: number): Board
{
    const quarters: List<Quarter> = tileToQuarter(tile, x, y);
    return quarters.reduce(
        (acc, q) => addQuarterToBoard(acc, q),
        board
    );
}


function addQuarterToBoard(board: Board, quarter: Quarter): Board
{
    if (quarter === nil) {
        return board;
    } else if (findQuarter(board, quarter.get('x'), quarter.get('y')) !== nil) {
        return removeQuarterFromBoard(
            board,
            quarter.get('x'),
            quarter.get('y')
        ).push(quarter);
    } else {
        return board.push(quarter);
    }
}

function removeQuarterFromBoard(board: Board, x: number, y: number) : Board
{
    return board.delete(
        board.indexOf(
            findQuarter(board, x, y)
        )
    );
}

// return index of vertices' list
function findQuarterIndexInGraph(graph: G.Graph<Quarter>, x: number, y: number): number
{
    return graph.get('vertices').findIndex(
        (v: Quarter) => (v !== nil && v.get('x') === x && v.get('y') === y)
    );
}

function allPositionToAddTile(board: Board): List<number>
{
    const maxX = board.reduce((acc, q) => (q === undefined) ? acc : Math.max(acc, q.get('x')), -Infinity) +1;
    const minX = board.reduce((acc, q) => (q === undefined) ? acc : Math.min(acc, q.get('x')), +Infinity) -2;
    const maxY = board.reduce((acc, q) => (q === undefined) ? acc : Math.max(acc, q.get('y')), -Infinity) +2;
    const minY = board.reduce((acc, q) => (q === undefined) ? acc : Math.min(acc, q.get('y')), +Infinity) -1;
    return List<number>([maxX, minX, maxY, minY]);
}

function findPositionToAddTile (aList: List<number>, board: Board, tile: Tile, objectives: List<O.Objectives>): List<number>
{
    if (aList.get(0, 0) === -Infinity)
        return List([0, 0]);
    const xRandom = Math.floor(Math.random() * (aList.get(0, 0) - aList.get(1, 0)) + aList.get(1, 0));
    const yRandom = Math.floor(Math.random() * (aList.get(2, 0) - aList.get(3, 0)) + aList.get(3, 0));
    
    if ( checkMove(board, xRandom, yRandom) === true)
        return List([xRandom,yRandom]);

    return findPositionToAddTile(aList, board, tile, objectives);
}

function checkEachQuarter( board: Board, x:number, y:number) : boolean
{
    if (findQuarter(board, x+1, y) !== nil || findQuarter(board, x, y+1) !== nil  || findQuarter(board, x-1, y) !== nil || findQuarter(board, x, y-1) !== nil)
        return true;
    
    return false;
}

function checkMove( board: Board, x:number, y:number): boolean
{
    if ( checkEachQuarter( board,x,y) || checkEachQuarter( board,x+1,y) ||checkEachQuarter( board,x,y-1) || checkEachQuarter( board,x+1,y-1) )
        return true;
    
    return false;
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
        (g: G.Graph<Quarter> ,q: Quarter): G.Graph<Quarter> => neighborhoodCase(graph, q, board),
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




export {
    initBoard,
    addQuarterToBoard,
    removeQuarterFromBoard,
    Board,
    Quarter,
    boardIsEmpty,
    placeTile,
    allPositionToAddTile,
    findPositionToAddTile,
    buildNeighborhoodGraph,
    buildRoadGraph,
    tileToQuarter,
    findQuarter,
    checkMove,
    checkEachQuarter,
};
