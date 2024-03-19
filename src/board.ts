import {nil} from "./common.js";
import {Road} from "./road.js";
import {Color} from "./neighborhood.js";

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
    const q = findQuarter(board, x, y);
    let nb = board;
    nb = board.slice(nb.indexOf(q), 1);
    return nb;
}
