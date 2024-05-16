import * as B from "./board.js";
import * as T from "./tile.js";
import * as R from "./road.js";
import * as N from "./neighborhood.js";
import * as D from "./deck.js";
import * as Disp from "./display.js";
import * as O from "./objectives.js";
import * as G from "./graph.js";
import {List, Map, MapOf} from "immutable";

type GameState = MapOf<{board: B.Board, colors: G.Graph<B.Quarter>, roads: G.Graph<B.Quarter>, objectives: List<O.Objectives>, deck: D.Deck, turn: number}>;

function initGame(seed: number): GameState {
    const board : B.Board = B.initBoard();
    const colorGraph: G.Graph<B.Quarter> = G.initGraph();
    const roadGraph: G.Graph<B.Quarter> = G.initGraph();
    const objectives : List<O.Objectives> = O.initializeObjectives();

    console.log("objectives: " + JSON.stringify(objectives));

    const deck : D.Deck = D.createGoodDeck(seed*2);
    console.log("deckSize: " + deck.size);

    return Map({
	board: board,
	colors: colorGraph,
	roads: roadGraph,
	objectives: objectives,
	deck: deck,
	turn: 0
    });
}

function objScore(game: GameState): number {
    return game.get('objectives').reduce((aTempScore, anObjective) => {
	return aTempScore + O.Point_of_objective(anObjective);
    }, 0);
}

function playTurn(game: GameState): GameState {

    const aCard = game.get('deck').get(game.get('turn'));

    if (aCard === undefined) {
	return game;
    }
    
    const aPlace = B.findPositionToAddTile(B.allPositionToAddTile(game.get('board')), game.get('board'), aCard, game.get('objectives'));
    console.log("placing tile at pos: (" + aPlace.get(0) + ", " + aPlace.get(1) + ")");
    
    const aNewBoard = B.placeTile(game.get('board'), (aPlace.get(3) === 1) ? T.flipTile(aCard) : aCard, aPlace.get(0, 0), aPlace.get(1, 0));
    Disp.displayTile((aPlace.get(3) === 1) ? T.flipTile(aCard) : aCard);
    
    const aNewCGraph: G.Graph<B.Quarter> = B.buildNeighborhoodGraph(aNewBoard);
    const aNewRGraph: G.Graph<B.Quarter> = B.buildRoadGraph(aNewBoard);
    
    return Map({board: aNewBoard, colors: aNewCGraph, roads: aNewRGraph, objectives: game.get('objectives'), deck: game.get('deck'), turn: game.get('turn') + 1});
}

function score(game: GameState): number {
    return O.objectives_player_gain(game.get('colors'), game.get('roads'), game.get('board'), game.get('objectives'));
}

export{
    initGame,
    objScore,
    playTurn,
    score
};
