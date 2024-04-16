import * as O from "../src/objectives.js";
import {List} from 'immutable';


describe('Obj tests', () => {
	
	test('Size 5', () => {
		const d : List<O.Objectives> = O.initializeObjectives();
		expect(d.size).toBe(5);
	});

});