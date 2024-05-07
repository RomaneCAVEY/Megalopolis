import * as O from "../src/objectives.js";
import {List} from 'immutable';


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


	});
	test('reduce_circulation', () => {

	});

	test('Flowers_city', () => {

	});

	test(' Green_city', () => {

	});

	test('Foreman', () => {

	});

	test('Quarter', () => {

	});


});
