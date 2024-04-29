import * as D from '../src/deck.js';
import * as T from '../src/tile.js';
// import {List} from 'immutable';

const seed : number = 10;

describe('Deck tests', () => {
    
    test('Empty deck should be empty', () => {
        const d : D.Deck = D.initDeck();
        expect(D.deckIsEmpty(d)).toBe(true);
    });

	test('New deck should have a size of 15', () => {
		const d : D.Deck = D.createDeckWithSeed(seed);
		expect(D.deckSize(d)).toBe(15);
	});

	test('Get tile on a deck', () => {
		const d : D.Deck = D.createDeckWithSeed(seed);
		const tb = D.getTile(d);
		expect(D.deckSize(tb[1])).toBe(14);
		expect(tb[0]).toBe(d.last());
		expect(tb[1].includes(tb[0])).toBe(false);
	});

	test('Try to get a tile in an empty deck', () => {
		const d : D.Deck = D.initDeck();
		expect(() => D.getTile(d)).toThrow();
	});

});