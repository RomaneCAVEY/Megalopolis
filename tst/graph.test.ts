import * as G from '../src/graph.js'
import {List} from 'immutable'

describe('Graph tests', () => {
    
    test('Empty graph should be empty', () => {
        let g = G.initGraph<number>();
        expect(G.isEmpty(g)).toBe(true);
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
    
    test('getVertices should extract the list of vertices from the graphe', () => {
	let g: G.Graph<number> = G.initGraph<number>();
	g = G.addVertex(g,10);
	g = G.addVertex(g,11);

	let listVertices = G.getVertices(g);
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


	let listVertices = G.getVertexNeighbors(g, 0);
	expect(listVertices.size).toBe(2);
	expect(listVertices.get(0)).toBe(12);
	expect(listVertices.get(1)).toBe(13);

	let listVerticesOrphelin = G.getVertexNeighbors(g, 1);
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


	let listListVertices = G.getConnexComponents(g);
	expect(listListVertices.size).toBe(3);
	expect(listListVertices.get(0, List()).size).toBe(3);
	expect(listListVertices.get(1, List()).size).toBe(2);
	expect(listListVertices.get(2, List()).size).toBe(1);
	expect(listListVertices.get(0, List()).get(0)).toBe(10);
	expect(listListVertices.get(1, List()).get(0)).toBe(11);
	expect(listListVertices.get(2, List()).get(0)).toBe(15);
	
     });
    
 });
