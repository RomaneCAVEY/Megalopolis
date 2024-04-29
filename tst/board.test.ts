import * as T from '../src/tile.js';
import * as N from '../src/neighborhood.js';
import {nil} from "../src/common.js";
import * as B from "../src/board.js";
import {List} from 'immutable';

const seed : number = 10;

describe('Tile tests', () => {
	
    test('Create a board should be an empty list of Quater', () => {
	const g = B.initBoard();
	expect(B.boardIsEmpty(g)).toBe(true);
    });

    test('add a "quarter" to board', () => {
	const t: T.Tile = T.createRandomTile(seed);
	
	const g1: B.Board = B.initBoard();
	const q: List<B.Quarter> = B.tileToQuarter(t, 0,1);
	const quarte1 : B.Quarter = q.get(0);
	const quarte2 : B.Quarter = q.get(1);
	const quarte3 : B.Quarter = q.get(2);
	const quarte4 : B.Quarter = q.get(3);
	
	const g1_new: B.Board = B.placeTile(g1, t, 0, 1);
	expect(B.findQuarter(g1_new, 0, 1)).toEqual(quarte1);
	expect(B.findQuarter(g1_new, 1, 1)).toEqual(quarte2);
	expect(B.findQuarter(g1_new, 0, 0)).toEqual(quarte3);
	expect(B.findQuarter(g1_new, 1, 0)).toEqual(quarte4);


    });

    test('remove quarter should remove quarter from board', () => {
	const t: T.Tile = T.createRandomTile(seed);
	const t2: T.Tile = T.createRandomTile(seed+10);
	
	const g1: B.Board = B.initBoard();


	/*
	const q: List<B.Quarter> = B.tileToQuarter(t, 0,1);
	const quarte1 : B.Quarter = q.get(0);
	const quarte2 : B.Quarter = q.get(2);
	*/
	const g1_new: B.Board = B.placeTile(g1, t, 0, 1);


	
	const q2: List<B.Quarter> = B.tileToQuarter(t2, -1,1);
	const quarte11 : B.Quarter = q2.get(1);
	const quarte12 : B.Quarter = q2.get(3);
	
	const g2_new: B.Board = B.placeTile(g1, t2, -1, 1);
	
	expect(B.findQuarter(g2_new, 0, 1)).toEqual(quarte11);
	expect(B.findQuarter(g2_new, 0, 0)).toEqual(quarte12);


		
    });

    test ('test creation of road graph',() => {
    });

    test ('test creation of neighborhood graph',() => {
    });
    
    test ('find the index in buildRoadGraph',() => {
    });

    test ('test all position to move',() => {
    });

    test ('test check move',() => {
    });

    test ('test roadCase', () => {
    });

    test ('test neightborhoodCase', () => {
    });

    

});
