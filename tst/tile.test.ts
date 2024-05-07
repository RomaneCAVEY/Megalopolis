import * as T from '../src/tile.js';
import * as R from '../src/road.js';
import * as N from '../src/neighborhood.js';
import {List,Map} from 'immutable';

const seed : number = 10;

describe('Tile tests', () => {
    
    test('Create a empty road dictionnary should be empty', () => {
        const g = T.createEmptyRoadDict();
        expect(g.get('nw').size === 4).toBe(true);
        expect(g.get('ne').size === 4).toBe(true);
        expect(g.get('se').size === 4).toBe(true);
        expect(g.get('sw').size === 4).toBe(true);
        expect(g.get('ne').filter(x => x === true).size === 0).toBe(true);
        //expect(g.get('ne').filter(x => x === false)).toBe(g.get('ne'));
    });

    test('Create a empty neighborhood dictionnary should be green', () => {
        const g = T.createEmptyNeighborhoodDict();
        expect(g.get('nw') === N.Color.Rainbow).toBe(true);
        expect(g.get('ne') === N.Color.Rainbow).toBe(true);
        expect(g.get('se') === N.Color.Rainbow).toBe(true);
        expect(g.get('sw') === N.Color.Rainbow).toBe(true);
        expect(g.size === 4).toBe(true);
    });

    test('Create a empty tile should be empty', () => {
        const g = T.createEmptyTile();
        expect(g.get('roads').size === 4).toBe(true);
        expect(g.get('neighborhoods').size === 4).toBe(true);
        expect(g.size === 2).toBe(true);
    });

    test('Create a random neighborhood dictionary should be full with different colors', () => {
        const g = T.createRandomNeighborhoodDict(seed);
        expect(g.get('nw') === g.get('ne')).toBe(false);
        expect(g.get('nw') === g.get('se')).toBe(false);
        expect(g.get('nw') === g.get('sw')).toBe(false);
        expect(g.get('ne') === g.get('se')).toBe(false);
        expect(g.get('ne') === g.get('sw')).toBe(false);
        expect(g.get('se') === g.get('sw')).toBe(false);
        expect(g.size === 4).toBe(true);
    });

    test('Create a random road dictionary should be full with different colors', () => {
        const g = T.createEmptyRoadDict();
        expect(g.get('nw') === g.get('ne')).toBe(false);
        expect(g.get('nw') === g.get('se')).toBe(false);
        expect(g.get('nw') === g.get('sw')).toBe(false);
        expect(g.get('ne') === g.get('se')).toBe(false);
        expect(g.get('ne') === g.get('sw')).toBe(false);
        expect(g.get('se') === g.get('sw')).toBe(false);
        expect(g.size === 4).toBe(true);
    });

    test('Create a random tile should be empty', () => {
        const g = T.createRandomTile(seed);
        expect(g.get('roads').size === 4).toBe(true);
        expect(g.get('neighborhoods').size === 4).toBe(true);
        expect(g.size === 2).toBe(true);
    });

    test('Flip a tile', () => {
        const g = T.createRandomTile(seed);
        const gflip = T.flipTile(g);
        // -b -ired     tile create with seed 10
        //  g -!grey

        const new_nw: R.Road = Map({ north: false, west: false, south: true, east: true }); //i-
        const new_sw: R.Road = Map({ north: true, west: false, south: false, east: true }); //!-
	const new_se: R.Road = Map({ north: false, west: true, south: false, east: true }); //--
        
        expect(gflip.get("roads").get("nw")).toEqual(new_nw);
        expect(gflip.get("roads").get("ne")).toEqual(g.get("roads").get("sw"));
        expect(gflip.get("roads").get("sw")).toEqual(new_sw);
        expect(gflip.get("roads").get("se")).toEqual(new_se);
        expect(gflip.get("neighborhoods").get("ne")).toBe(g.get("neighborhoods").get("sw"));
        expect(gflip.get("neighborhoods").get("nw")).toBe(g.get("neighborhoods").get("se"));
        expect(gflip.get("neighborhoods").get("sw")).toBe(g.get("neighborhoods").get("ne"));
        expect(gflip.get("neighborhoods").get("se")).toBe(g.get("neighborhoods").get("nw"));
        expect(gflip.size).toBe(2);
    });
    
});
