import * as T from "./tile";
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


function getDeck() : Deck
{
	const numberOfTile : number = 15;
	function getDeckRec(deck : Deck, n : number) : Deck
	{
		if (n === 0)
			return deck;
		return getDeckRec(deck.push(T.createEmptyTile()), n-1);
	}
	return getDeckRec(initDeck(), numberOfTile);
}


/* function getTile(deck : Deck) : T.Tile
{
	;
} */