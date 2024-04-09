import * as R from '../src/road.js';
import {List, Map} from 'immutable';


describe('Road tests', () => {
    
    test('empty road should be empty', () => {
        const g = R.createEmptyRoad();
        expect(g.get('north')).toBe(false);
	expect(g.get('west')).toBe(false);
	expect(g.get('south')).toBe(false);
	expect(g.get('east')).toBe(false);
    });

    test('Create Random Road should be random', () => {
	const e = R.createEmptyRoad();
        const g = R.createRandomRoad();
	expect(g === e).toBe(false);
	expect(g.filter(x=> x === true).size === 2).toBe(true);
    });

});
