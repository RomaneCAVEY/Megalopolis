import * as T from '../src/tile.js';
import * as G from '../src/graph.js';
import * as B from '../src/board.js';
import * as O from "../src/objectives.js";
import {List} from 'immutable';

const seed : number = 10;
// -b -|r
//  g -|grey

describe('Objectives tests', () => {
    
    test('The Size is 5', () => {
	const d : List<O.Objectives> = O.initializeObjectives();
	expect(d.size).toBe(5);
    });
    test('The elements of the list are', () => {
	const d : List<O.Objectives> = O.initializeObjectives();
	expect(d.sort().reduce((acc,e)=>(acc<e)? e: -5,-1)).toBe(d.sort().last());
    });
    
    test('ring_road', () => {
	const t: T.Tile = T.createRandomTile(seed);
	const b1: B.Board = B.initBoard();
	const b1_new: B.Board = B.placeTile(b1, t, 0, 0);
	
	const g1: G.Graph<B.Quarter> = B.buildRoadGraph(b1_new);

	const no: number = O.ring_road(g1);
	//expect(no).toBe(1);

	const t2: T.Tile = T.createRandomTile(seed);
	const t2_new = T.flipTile(t2);
	const q: List<B.Quarter> = B.tileToQuarter(t2_new, 0,0);
        const quarte1 : B.Quarter = q.get(0); // is road i-
        const quarte3 : B.Quarter = q.get(2); // is road !-

	
	const b2: B.Board = B.addQuarterToBoard(b1_new, quarte1); // now we have:  i--i
	const b2_new: B.Board = B.addQuarterToBoard(b2, quarte3); //               !--!
	
	
	const g2: G.Graph<B.Quarter> = B.buildRoadGraph(b2_new);
	const yes: number = O.ring_road(g2);
	//expect(yes).toBe(1)

    });
    test('reduce_circulation', () => {
	const t: T.Tile = T.createRandomTile(seed);
	const b1: B.Board = B.initBoard();
	const b1_new: B.Board = B.placeTile(b1, t, 0, 0);
	
	const g1: G.Graph<B.Quarter> = B.buildRoadGraph(b1_new);
	const one: number = O.reduce_circulation(g1);
	expect(one).toBe(-1);

	const t2: T.Tile = T.createRandomTile(seed);
	const t2_new = T.flipTile(t2);
	const q: List<B.Quarter> = B.tileToQuarter(t2_new, 0,0);
        const quarte2 : B.Quarter = q.get(1); // is color g
        const quarte4 : B.Quarter = q.get(3); // is color b

	
	const b2: B.Board = B.addQuarterToBoard(b1_new, quarte2); // now we have:  b- g
	const b2_new: B.Board = B.addQuarterToBoard(b2, quarte4); //               g b-
	
	
	const g2: G.Graph<B.Quarter> = B.buildRoadGraph(b2_new);
	const two: number = O.reduce_circulation(g2);
	expect(two).toBe(-2)
    });

    test('Flowers_city', () => {
	const t: T.Tile = T.createRandomTile(seed); // . .
	const b1: B.Board = B.initBoard();          // g .
	const b1_new: B.Board = B.placeTile(b1, t, 0, 0);
	
	const no: number = O.Flowers_city(b1_new);
	//expect(no).toBe(-2);

	const t2: T.Tile = T.createRandomTile(seed); // . . .
	const t3: T.Tile = T.createRandomTile(seed); // g g g
	const b2: B.Board = B.placeTile(b1_new, t2, 1, 0);
	const b3: B.Board = B.placeTile(b2, t3, 2, 0);
	const three: number = O.Flowers_city(b3);
	expect(three).toBe(0);
	
	const t4: T.Tile = T.createRandomTile(seed); // . . . . g
	const t4_new = T.flipTile(t4);               // g g g . .
	const b4: B.Board = B.placeTile(b3, t4_new, 3, 0);
	const one: number = O.Flowers_city(b4);
	expect(one).toBe(0);
	

    });

    test(' Green_city', () => {
	const t: T.Tile = T.createRandomTile(seed); // . .
	const b1: B.Board = B.initBoard();          // g .
	const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

	const g1: G.Graph<B.Quarter> = B.buildNeighborhoodGraph(b1_new);
	const no: number = O.Green_city(g1);
	expect(no).toBe(-2);

	const t2: T.Tile = T.createRandomTile(seed);
	const t2_new = T.flipTile(t2);
	const q: List<B.Quarter> = B.tileToQuarter(t2_new, 0,0);
        const quarte2 : B.Quarter = q.get(1); // is color g
        const quarte4 : B.Quarter = q.get(3); // is color b

	
	const b2: B.Board = B.addQuarterToBoard(b1_new, quarte2); // now we have:  b- g
	const b2_new: B.Board = B.addQuarterToBoard(b2, quarte4); //               g b-
	
	
	const g2: G.Graph<B.Quarter> = B.buildNeighborhoodGraph(b2_new);
	const two: number = O.Green_city(g2);
	expect(two).toBe(2)

    });

    test('Foreman', () => {

    });

    test('Quarter', () => {

    });


});
