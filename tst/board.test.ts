import * as T from '../src/tile.js';
import * as N from '../src/neighborhood.js';
import {nil} from "../src/common.js";
import * as B from "../src/board.js";
import {List} from 'immutable';
import * as G from '../src/graph.js';

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
        
        const b1: B.Board = B.initBoard();


        /*
        const q: List<B.Quarter> = B.tileToQuarter(t, 0,1);
        const quarte1 : B.Quarter = q.get(0);
        const quarte2 : B.Quarter = q.get(2);
        */
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);


        
        const q2: List<B.Quarter> = B.tileToQuarter(t2, -1,1);
        const quarte11 : B.Quarter = q2.get(1);
        const quarte12 : B.Quarter = q2.get(3);
        
        const b2_new: B.Board = B.placeTile(b1, t2, -1, 1);
        
        expect(B.findQuarter(b2_new, 0, 1)).toEqual(quarte11);
        expect(B.findQuarter(b2_new, 0, 0)).toEqual(quarte12);


                
    });
//---------------------------------------------------------------------------
    test ('find index of vertices list thanks findQuarterIndexInGraph',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

	const t2: T.Tile = T.createRandomTile(seed);
	const b2_new: B.Board = B.placeTile(b1_new, t2, 1,0);
	
	const g2:G.Graph<B.Quarter> = B.buildRoadGraph(b2_new); // (0 ,1 ,2)
	//console.log(JSON.stringify(g2));                      // ( ,  , 3)

	const quarter0 = B.findQuarterIndexInGraph(g2, 0, 0);
	const quarter1 = B.findQuarterIndexInGraph(g2, 1, 0);
	const quarter2 = B.findQuarterIndexInGraph(g2, 2, 0);
	const quarter3 = B.findQuarterIndexInGraph(g2, 2, -1);

	expect(quarter0).toBe(0);
	expect(quarter1).toBe(1);
	expect(quarter2).toBe(2);
	expect(quarter3).toBe(3);
	
       
        
    });


    test ('test all position to move',() => {
        const t: T.Tile = T.createRandomTile(seed);
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 1, 1);

        const t2: T.Tile = T.createRandomTile(seed+10);
        const b2_new: B.Board = B.placeTile(b1_new, t, -1, -1);

        const list: List<number> = B.allPositionToAddTile(b2_new);
        expect(list.get(0, 1)).toBe(3);
        expect(list.get(1, 1)).toBe(-3);
        expect(list.get(2, 1)).toBe(3);
        expect(list.get(3, 1)).toBe(-3);
        
    });

    test ('find a possible position to place a tile',() => {
        const t: T.Tile = T.createRandomTile(seed);
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);

        const t2: T.Tile = T.createRandomTile(seed+10);

        const allPos = B.allPositionToAddTile(b1_new);
        const list = B.findPositionToAddTile(allPos, b1_new, t2, List());
        expect(B.checkMove(b1_new, list.get(0,100), list.get(1,100))).toBe(true);
    });

    test ('check each quarter should return true if it is next to an other quarter',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);
        
        expect(B.checkEachQuarter(b1_new, -1,1)).toBe(true);
        expect(B.checkEachQuarter(b1_new, -2,1)).toBe(false);
        expect(B.checkEachQuarter(b1_new, -3,1)).toBe(false);
    });
    
    test ('test check move',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);
        
        expect(B.checkMove(b1_new, -1,1)).toBe(true);
        expect(B.checkMove(b1_new, -2,1)).toBe(true);
        expect(B.checkMove(b1_new, -3,1)).toBe(false);
        
    });

    test ('test build road graph',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

        const g1:G.Graph<B.Quarter> = B.buildRoadGraph(b1_new);
	expect(g1.get('adj').get(0, List()).get(0)).toBe(1);
	expect(g1.get('adj').get(1, List()).get(0)).toBe(0);
	expect(g1.get('adj').get(1, List()).get(1)).toBe(2);
	expect(g1.get('adj').get(2, List()).get(0)).toBe(1);

	const t2: T.Tile = T.createRandomTile(seed);
	const b2_new: B.Board = B.placeTile(b1_new, t2, 1,0);
	const g2:G.Graph<B.Quarter> = B.buildRoadGraph(b2_new);
	//console.log(JSON.stringify(g2))
	expect(g2.get('adj').get(1, List()).includes(0)).toBe(true);  //(0, 1, 2)   - - -|
	expect(g2.get('adj').get(1, List()).includes(2)).toBe(true);  //( ,  , 3)       -|
        
    });

    test ('test build neighborhood graph',() => {
	const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

        const g1:G.Graph<B.Quarter> = B.buildNeighborhoodGraph(b1_new);
	expect(g1.get('adj').get(0, 1)).toBe(List());
	expect(g1.get('adj').get(1, 1)).toBe(List());
	expect(g1.get('adj').get(2, 1)).toBe(List());
	expect(g1.get('adj').get(3, 1)).toBe(List());

	const t2: T.Tile = T.createRandomTile(seed);
	const b2_new: B.Board = B.placeTile(b1_new, t2, 1,0);
	
	const g2:G.Graph<B.Quarter> = B.buildRoadGraph(b2_new);
	//expect(g2.get('adj').get(0)).toBe(g2.get('vertices')....
	
    });
    

    test ('test roadCase', () => {
	
    });

    test ('test neightborhoodCase', () => {
    });

    

});
