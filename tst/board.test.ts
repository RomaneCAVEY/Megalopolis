import * as T from '../src/tile.js';
import * as N from '../src/neighborhood.js';
import {nil} from "../src/common.js";
import * as B from "../src/board.js";
import {List} from 'immutable';
import * as G from '../src/graph.js';

const seed : number = 10;

describe('Tile tests', () => {
        
    test('Create a board should be an empty list of Quater', () => {
        const g = B.initBoard();
        expect(B.boardIsEmpty(g)).toBe(true);
    });

    test('add a "quarter" to board', () => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const g1: B.Board = B.initBoard();
        const q: List<B.Quarter> = B.tileToQuarter(t, 0,1);
        const quarte1 : B.Quarter = q.get(0);
        const quarte2 : B.Quarter = q.get(1);
        const quarte3 : B.Quarter = q.get(2);
        const quarte4 : B.Quarter = q.get(3);
        
        const g1_new: B.Board = B.placeTile(g1, t, 0, 1);
        expect(B.findQuarter(g1_new, 0, 1)).toEqual(quarte1);
        expect(B.findQuarter(g1_new, 1, 1)).toEqual(quarte2);
        expect(B.findQuarter(g1_new, 0, 0)).toEqual(quarte3);
        expect(B.findQuarter(g1_new, 1, 0)).toEqual(quarte4);


    });

    test('remove quarter should remove quarter from board', () => {
        const t: T.Tile = T.createRandomTile(seed);
        const t2: T.Tile = T.createRandomTile(seed+10);
        
        const b1: B.Board = B.initBoard();


        /*
        const q: List<B.Quarter> = B.tileToQuarter(t, 0,1);
        const quarte1 : B.Quarter = q.get(0);
        const quarte2 : B.Quarter = q.get(2);
        */
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);


        
        const q2: List<B.Quarter> = B.tileToQuarter(t2, -1,1);
        const quarte11 : B.Quarter = q2.get(1);
        const quarte12 : B.Quarter = q2.get(3);
        
        const b2_new: B.Board = B.placeTile(b1, t2, -1, 1);
        
        expect(B.findQuarter(b2_new, 0, 1)).toEqual(quarte11);
        expect(B.findQuarter(b2_new, 0, 0)).toEqual(quarte12);


                
    });
//---------------------------------------------------------------------------
    test ('find index of vertices list thanks findQuarterIndexInGraph',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

        const t2: T.Tile = T.createRandomTile(seed);
        const b2_new: B.Board = B.placeTile(b1_new, t2, 1,0);
        
        const g2:G.Graph<B.Quarter> = B.buildRoadGraph(b2_new); // (0 ,1 ,2)
        //console.log(JSON.stringify(g2));                      // ( ,  , 3)

        const quarter0 = B.findQuarterIndexInGraph(g2, 0, 0);
        const quarter1 = B.findQuarterIndexInGraph(g2, 1, 0);
        const quarter2 = B.findQuarterIndexInGraph(g2, 2, 0);
        const quarter3 = B.findQuarterIndexInGraph(g2, 2, -1);

        expect(quarter0).toBe(0);
        expect(quarter1).toBe(1);
        expect(quarter2).toBe(2);
        expect(quarter3).toBe(3);
        
       
        
    });


    test ('test all position to move',() => {
        const t: T.Tile = T.createRandomTile(seed);
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 1, 1);

        const t2: T.Tile = T.createRandomTile(seed+10);
        const b2_new: B.Board = B.placeTile(b1_new, t, -1, -1);

        const list: List<number> = B.allPositionToAddTile(b2_new);
        expect(list.get(0, 1)).toBe(3);
        expect(list.get(1, 1)).toBe(-3);
        expect(list.get(2, 1)).toBe(3);
        expect(list.get(3, 1)).toBe(-3);
        
    });

    test ('find a possible position to place a tile',() => {
        const t: T.Tile = T.createRandomTile(seed);
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);

        const t2: T.Tile = T.createRandomTile(seed+10);

        const allPos = B.allPositionToAddTile(b1_new);
        const list = B.findPositionToAddTile(allPos, b1_new, t2, List());
        expect(B.checkMove(b1_new, list.get(0,100), list.get(1,100))).toBe(true);
    });

    test ('check each quarter should return true if it is next to an other quarter',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        // plateau avec une seule tuile en 0,1
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);

        // vérification de la validité du coup pour 3 emplacements demandés
        // un quartier doit directement être relié au plateau
        // ex: (0, 1)(plateau) 0 pas relier au plateau => Faux
        expect(B.checkEachQuarter(b1_new, -1,1)).toBe(true);
        expect(B.checkEachQuarter(b1_new, -2,1)).toBe(false);
        expect(B.checkEachQuarter(b1_new, -3,1)).toBe(false);
    });
    
    test ('test check move',() => {
        const t: T.Tile = T.createRandomTile(seed);

        // plateau avec une seule tuile en 0,1
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 1);
        
        // vérification de la validité du coup pour 3 emplacements demandés
        // prise en compte qu'un quartier peut faire partie d'une tuile et
        // donc ne pas directement etre relier au plateau
        // ex: (0, 1)(plateau) 0 pas relier au plateau => Vrai
        expect(B.checkMove(b1_new, -1,1)).toBe(true);
        expect(B.checkMove(b1_new, -2,1)).toBe(true);
        expect(B.checkMove(b1_new, -3,1)).toBe(false);
        
    });

    test ('test build road graph',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

        // graph avec une seule tile en 0,0
        const g1:G.Graph<B.Quarter> = B.buildRoadGraph(b1_new);  // (0, 1)
        // test que 0 est relier a 1 qui est relié a 2              ( , 2)
        expect(g1.get('adj').get(0, List()).get(0)).toBe(1);
        expect(g1.get('adj').get(1, List()).get(0)).toBe(0);
        expect(g1.get('adj').get(1, List()).get(1)).toBe(2);
        expect(g1.get('adj').get(2, List()).get(0)).toBe(1);
        // test qu'il n'y a aucune autre composante connexe
        expect(g1.get('adj').get(0, List()).size).toBe(1);
        expect(g1.get('adj').get(1, List()).size).toBe(2);
        expect(g1.get('adj').get(2, List()).size).toBe(1);

        const t2: T.Tile = T.createRandomTile(seed);
        const b2_new: B.Board = B.placeTile(b1_new, t2, 1,0);
        const g2:G.Graph<B.Quarter> = B.buildRoadGraph(b2_new);
        //console.log(JSON.stringify(g2))
        expect(g2.get('adj').get(1, List()).includes(0)).toBe(true);  //(0, 1, 2)   - - -|
        expect(g2.get('adj').get(1, List()).includes(2)).toBe(true);  //( ,  , 3)       -|
        expect(g2.get('adj').get(1, List()).includes(1)).toBe(false);  //(0, 1, 2)   - - -|
        expect(g2.get('adj').get(1, List()).includes(3)).toBe(false);
        
    });

    test ('test build neighborhood graph',() => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);
        // graph avec une seule tile en 0,0
        const g1:G.Graph<B.Quarter> = B.buildNeighborhoodGraph(b1_new);

        // test que aucun quarter n'est relie au sein d'une tuile pour les couleur
        expect(g1.get('adj').get(0, 1)).toBe(List()); //(0 , 1)
        expect(g1.get('adj').get(1, 1)).toBe(List()); //(2 , 3)
        expect(g1.get('adj').get(2, 1)).toBe(List());
        expect(g1.get('adj').get(3, 1)).toBe(List());

        const t2: T.Tile = T.createRandomTile(seed);
        const b2_new: B.Board = B.placeTile(b1_new, t2, 1,0);

        // graph avec deux tuiles en 0,0 et en 1,0 qui est en partie sur la premiere
        // test que le quartier 0 et 2 sont reliés et les quartiers 1 et 4 aussi
        // test que 0 n'est pas relié à 1 et que 4 n'est pas relié a 5
        const g2:G.Graph<B.Quarter> = B.buildNeighborhoodGraph(b2_new); // (0, 2, 3)  b b r
        expect(g2.get('adj').get(0, List()).includes(2)).toBe(true);    // (1, 4, 5)  g g grey
        expect(g2.get('adj').get(0, List()).includes(1)).toBe(false);
        expect(g2.get('adj').get(1, List()).includes(4)).toBe(true);
        expect(g2.get('adj').get(4, List()).includes(5)).toBe(false);
        
    });
    

    test ('test roadCase', () => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

        // graph avec une seule tile en 0,0
        const g1:G.Graph<B.Quarter> = B.buildRoadGraph(b1_new);
        
        // création d'un quartier dont les coordonnées sont -1,0
        const quarter0 : B.Quarter = B.tileToQuarter(t, -1,0).get(0);

        // ajout du quartier en tant que vertex dans le graph
        const g2 = G.addVertex(g1, quarter0);


        // verification de la fonction RoadCase
        const g3 = B.roadCase(g2, quarter0, b1_new);

        expect(g3.get('adj').get(0, List()).includes(3)).toBe(true);  // (3, 0, 1)  4 et 0 sont connexe, 0 et 1, 1 et 3 aussi
        expect(g3.get('adj').get(0, List()).size).toBe(2);           // ( ,  , 2)
        expect(g3.get('adj').get(3, List()).get(0)).toBe(0);
        expect(g3.get('adj').get(3, List()).size).toBe(1);
        
        expect(g3.get('adj').get(1, List()).size).toBe(2);
        expect(g3.get('adj').get(2, List()).size).toBe(1);
        
    });

    test ('test neightborhoodCase', () => {
        const t: T.Tile = T.createRandomTile(seed);
        
        const b1: B.Board = B.initBoard();
        const b1_new: B.Board = B.placeTile(b1, t, 0, 0);

        // graph avec une seule tile en 0,0
        const g1:G.Graph<B.Quarter> = B.buildNeighborhoodGraph(b1_new);
        
        // création d'un quartier dont les coordonnées sont -1,0
        const quarter0 : B.Quarter = B.tileToQuarter(t, -1,0).get(0);

        // ajout du quartier en tant que vertex dans le graph
        const g2 = G.addVertex(g1, quarter0);


        // verification de la fonction neighborhoodcase
        const g3 = B.neighborhoodCase(g2, quarter0, b1_new);

        expect(g3.get('adj').get(0, List()).get(0)).toBe(4);  // (4, 0, 1) seule 4 et 0 sont connexe
        expect(g3.get('adj').get(0, List()).size).toBe(1);    // ( , 2, 3)
        expect(g3.get('adj').get(4, List()).get(0)).toBe(0);
        expect(g3.get('adj').get(4, List()).size).toBe(1);
        
        expect(g3.get('adj').get(1, List()).size).toBe(0);
        expect(g3.get('adj').get(2, List()).size).toBe(0);
        expect(g3.get('adj').get(3, List()).size).toBe(0);
    });

    

});
