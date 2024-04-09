import * as N from '../src/neighborhood.js';
import {List} from 'immutable';

describe('Neighborhood tests', () => {
    
    test('Green neighborhor should be green', () => {
        const g = N.getRainbowNeighborhood();
        expect(g).toBe(N.Color.Rainbow);
    });

    test('Create green neighborhor should be green', () => {
        const g = N.createNeighborhood(0);
        expect(g).toBe(N.Color.Green);

	const g2 = N.createNeighborhood(8);
        expect(g).toBe(N.Color.Green);
    });

    test('Create blue neighborhor should be bleu', () => {
        const g = N.createNeighborhood(1);
        expect(g).toBe(N.Color.Blue);

	const g2 = N.createNeighborhood(9);
        expect(g).toBe(N.Color.Blue);
    });

    test('Create Red neighborhor should be red', () => {
        const g = N.createNeighborhood(2);
        expect(g).toBe(N.Color.Red);

	const g2 = N.createNeighborhood(10);
        expect(g).toBe(N.Color.Red);
    });

    test('Create Gray neighborhor should be gray', () => {
        const g = N.createNeighborhood(3);
        expect(g).toBe(N.Color.Grey);

	const g2 = N.createNeighborhood(11);
        expect(g).toBe(N.Color.Grey);
    });

});
