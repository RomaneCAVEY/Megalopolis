import * as T from '../src/tile.js';
import * as N from '../src/neighborhood.js';
import {List} from 'immutable';

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
        expect(g.get('nw') === N.Color.Green).toBe(true);
	expect(g.get('ne') === N.Color.Green).toBe(true);
	expect(g.get('se') === N.Color.Green).toBe(true);
	expect(g.get('sw') === N.Color.Green).toBe(true);
	expect(g.size === 4).toBe(true);
    });

    test('Create a empty tile should be emptye', () => {
        const g = T.createEmptyTile();
        expect(g.get('roads').size === 4).toBe(true);
	expect(g.get('neighborhoods').size === 4).toBe(true);
	expect(g.size === 2).toBe(true);
    });

    test('Create a random neighborhood dictionary should be full with different colors', () => {
        const g = T.createRandomNeighborhoodDict();
        expect(g.get('nw') === g.get('ne')).toBe(false);
	expect(g.get('nw') === g.get('se')).toBe(false);
	expect(g.get('nw') === g.get('sw')).toBe(false);
	expect(g.get('ne') === g.get('se')).toBe(false);
	expect(g.get('ne') === g.get('sw')).toBe(false);
	expect(g.get('se') === g.get('sw')).toBe(false);
	expect(g.size === 4).toBe(true);
    });
    
 
    
});
