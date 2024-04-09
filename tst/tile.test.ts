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
		const g = T.createRandomNeighborhoodDict();
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
		const g = T.createRandomTile();
		expect(g.get('roads').size === 4).toBe(true);
		expect(g.get('neighborhoods').size === 4).toBe(true);
		expect(g.size === 2).toBe(true);
	});

	test('Flip a tile', () => {
		const g = T.createRandomTile();
		const gflip = T.flipTile(g);
		expect(gflip.get("roads").get("ne")).toBe(g.get("roads").get("sw"));
		expect(gflip.get("roads").get("nw")).toBe(g.get("roads").get("se"));
		expect(gflip.get("roads").get("sw")).toBe(g.get("roads").get("ne"));
		expect(gflip.get("roads").get("se")).toBe(g.get("roads").get("nw"));
		expect(gflip.get("neighborhoods").get("ne")).toBe(g.get("neighborhoods").get("sw"));
		expect(gflip.get("neighborhoods").get("nw")).toBe(g.get("neighborhoods").get("se"));
		expect(gflip.get("neighborhoods").get("sw")).toBe(g.get("neighborhoods").get("ne"));
		expect(gflip.get("neighborhoods").get("se")).toBe(g.get("neighborhoods").get("nw"));
		expect(gflip.size).toBe(2);
	});
	
});
