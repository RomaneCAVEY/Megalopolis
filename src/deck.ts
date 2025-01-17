import * as T from "./tile.js";
import {List} from 'immutable';

type Deck = List<T.Tile>;

function initDeck() : Deck
{
	return List<T.Tile>();
}


function deckIsEmpty(deck : Deck) : boolean
{
	return deck.isEmpty();
}


function deckSize(deck : Deck) : number
{
	return deck.size;
}


function createGoodDeck(seed : number) : Deck
{
	const numberOfTile : number = 15;
	function getDeckRec(deck : Deck, n : number) : Deck
	{
		if (n === 0)
			return deck;
		return getDeckRec(deck.push(T.createRandomTileWithConnexeRoad(seed*n+1)), n-1);
	}
	return getDeckRec(initDeck(), numberOfTile);
}


function createDeckWithSeed(seed : number) : Deck
{
	const numberOfTile : number = 15;
	function getDeckRec(deck : Deck, n : number) : Deck
	{
		if (n === 0)
			return deck;
		return getDeckRec(deck.push(T.createRandomTile(seed*n+1)), n-1);
	}
	return getDeckRec(initDeck(), numberOfTile);
}


function getTile(deck : Deck) : [T.Tile, Deck]
{
	if (deckIsEmpty(deck))
		throw new Error("You try to get a tile in an empty deck");
	return [deck.last(), deck.pop()];
}


export {deckIsEmpty, createDeckWithSeed, getTile, initDeck, deckSize, createGoodDeck, Deck};
