import * as G from '../src/graph.js';
import {List} from 'immutable';

describe('Graph tests', () => {
    
    test('Empty graph should be empty', () => {
        const g = G.initGraph<number>();
        expect(G.isEmpty(g)).toBe(true);
    });

    test('isEmpty on non-empty graph should return false', () => {
        let g = G.initGraph<number>();
        g = G.addVertex(g, 1);
        expect(G.isEmpty(g)).toBe(false);
    });

    test('addVertex should add an vertex to the graph', () => {
        let g: G.Graph<number> = G.initGraph<number>();
        g = G.addVertex(g,10);
        expect(g.get('vertices').size).toBe(1);
        expect(g.get('vertices').get(0)).toBe(10);
    });

    test('addEdge should add an edge to the graph', () => {
        let g: G.Graph<number> = G.initGraph<number>();
        g = G.addVertex(g,10);
        g = G.addVertex(g,11);

        g = G.addEdge(g,0,1);
        expect(g.get('adj').size).toBe(2);
        expect(g.get('adj').get(0, List()).get(0)).toBe(1);
        expect(g.get('adj').get(1, List()).get(0)).toBe(0);
    });

    test('addEdge should not add an already existing edge', () => {
        let g: G.Graph<number> = G.initGraph<number>();
        g = G.addVertex(g,10);
        g = G.addVertex(g,11);
        g = G.addEdge(g,0,1);
        
        expect(G.addEdge(g, 0, 1)).toBe(g);
    });
    
    test('getVertices should extract the list of vertices from the graphe', () => {
        let g: G.Graph<number> = G.initGraph<number>();
        g = G.addVertex(g,10);
        g = G.addVertex(g,11);

        const listVertices = G.getVertices(g);
        expect(listVertices.size).toBe(2);
        expect(listVertices.get(0)).toBe(10);
        expect(listVertices.get(1)).toBe(11);
    });

    test('getVertexNeighbors should extract the list of vertices from the graphe which are link to the one in parameter', () => {
        let g: G.Graph<number> = G.initGraph<number>();
        g = G.addVertex(g,10);
        g = G.addVertex(g,11);
        g = G.addVertex(g,12);
        g = G.addVertex(g,13);

        g = G.addEdge(g,0,2);
        g = G.addEdge(g,0,3);


        const listVertices = G.getVertexNeighbors(g, 0);
        expect(listVertices.size).toBe(2);
        expect(listVertices.get(0)).toBe(12);
        expect(listVertices.get(1)).toBe(13);

        const listVerticesOrphelin = G.getVertexNeighbors(g, 1);
        expect(listVerticesOrphelin.size).toBe(0);

        
    });

    test('getConnexComponents', () => {
        let g: G.Graph<number> = G.initGraph<number>();
        g = G.addVertex(g,10);
        g = G.addVertex(g,11);
        g = G.addVertex(g,12);
        g = G.addVertex(g,13);
        g = G.addVertex(g,14);
        g = G.addVertex(g,15);

        g = G.addEdge(g,0,2);
        g = G.addEdge(g,2,3);
        g = G.addEdge(g,1,4);


        const listListVertices = G.getConnexComponents(g);
        expect(listListVertices.size).toBe(3);
        expect(listListVertices.get(0, List()).size).toBe(3);
        expect(listListVertices.get(1, List()).size).toBe(2);
        expect(listListVertices.get(2, List()).size).toBe(1);
        expect(listListVertices.get(0, List()).get(0)).toBe(10);
        expect(listListVertices.get(1, List()).get(0)).toBe(11);
        expect(listListVertices.get(2, List()).get(0)).toBe(15);

        const lv = G.getConnexComponents(G.initGraph<number>());
        expect(lv.size).toBe(0);
    });

    test('getConnexComponents should throw an error when invalid graph provided', () => {
        let g: G.Graph<any> = G.initGraph<any>();
        g = G.addVertex(g, 10);

        g = G.addVertex(g, 11);
        g = g.set('vertices', g.get('vertices').set(0, undefined));

        expect(() => {
            G.getConnexComponents(g);
        }).toThrow();
    });

    test('getCycles should get all cycles of a graph', () => {
        let g: G.Graph<number> = G.initGraph<number>();

        for (let i = 0; i < 10; i++) {
            g = G.addVertex(g, i);
        }

        g = G.addEdge(g, 0, 1);
        g = G.addEdge(g, 1, 2);
        g = G.addEdge(g, 2, 0);
        g = G.addEdge(g, 2, 3);
        g = G.addEdge(g, 4, 5);
        g = G.addEdge(g, 6, 7);
        g = G.addEdge(g, 7, 8);
        g = G.addEdge(g, 8, 6);

        const cycles = G.getCycles(g);

        expect(cycles.size).toBe(2);
        expect(cycles.get(0, List<number>()).size).toBe(4);
        expect(cycles.get(1, List<number>()).size).toBe(3);

        expect(cycles.get(0, List<number>()).get(0, -1)).toBe(0);
        expect(cycles.get(0, List<number>()).get(1, -1)).toBe(1);
        expect(cycles.get(0, List<number>()).get(2, -1)).toBe(2);
        expect(cycles.get(0, List<number>()).get(3, -1)).toBe(3);

        
        expect(cycles.get(1, List<number>()).get(0, -1)).toBe(6);
        expect(cycles.get(1, List<number>()).get(1, -1)).toBe(7);
        expect(cycles.get(1, List<number>()).get(2, -1)).toBe(8);
    });
    
 });
