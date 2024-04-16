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


function createDeck() : Deck
{
	const numberOfTile : number = 15;
	function getDeckRec(deck : Deck, n : number) : Deck
	{
		if (n === 0)
			return deck;
		return getDeckRec(deck.push(T.createRandomTile()), n-1);
	}
	return getDeckRec(initDeck(), numberOfTile);
}


function getTile(deck : Deck) : [T.Tile, Deck]
{
	if (deckIsEmpty(deck))
		throw new Error("You try to get a tile in an empty deck");
	return [deck.last(), deck.pop()];
}


export {deckIsEmpty, createDeck, getTile, initDeck, deckSize, Deck};
