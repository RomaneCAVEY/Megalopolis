import * as B from "./board";
import * as G from "./graph";
import * as N from "./neighborhood";
import * as R from "./road";
import * as C from"./common";

enum Objectives {
    circulation,
    Quarter,
    Flowers_city,
    Green_city,
}

function circulation(graph: G.Graph<R.Road>) : number{
	//calcul nb composante connexe pour le graphe de road
	//-1 pour composante connexe qui ne sont pas des cycles
	//+1 pt par cycle
	return 0;
}

function Quarter(graph: G.Graph<N.Color>): number{
	//calcul composante connexe pour les couleurs , garde la plus grande pour chacun des 4 types
	return 0;
	
}

/* 
ville_fleurie:
score: 2
rule: |
1pt/chaque ligne et colonne du plateau contenant exactement 3
parcs
-1pt/chaque ligne et colonne ne contenant aucun parc */
function Flowers_city( board : B.Board ) : number
{
	const min_x = ( board.map( (e: B.Quarter) => ( e!==C.nil ) ? e.get("x") : 0 ) ).min();
	const max_x = ( board.map( (e: B.Quarter) => ( e!==C.nil ) ? e.get("x") : 0 ) ).max();
	const max_y = ( board.map( (e: B.Quarter) => ( e!==C.nil ) ? e.get("y") : 0 ) ).max();
	const min_y = ( board.map( (e: B.Quarter) => ( e!==C.nil ) ? e.get("y") : 0 ) ).min();
	function addPoints()
	{
		function line(x:number | undefined, board:B.Board, c:number) 
		{
			if (x === undefined)
				return 0;

			if ( x === max_x)
				return c;

			else {
				if ( ((board.filter( (e: B.Quarter) => e !== C.nil && e.get("x") === x && e.get("color") === N.Color.Green )).size) === 3 )
					return line(x+1, board, c+1);
				else
					return line(x+1, board, c);
			}
		}

		function column(y:number | undefined, board:B.Board, c:number) 
		{
			if (y === undefined)
				return 0;

			if ( y === max_y)
				return c;
			
			else {
				if ( ((board.filter( (e: B.Quarter)=> e !== C.nil && e.get("y") === y && e.get("color") === N.Color.Green )).size) === 3 )
					return column(y+1, board, c+1);
				else
					return column(y+1, board, c);
			}
		}

		return line(min_x,board,0)+column(min_y,board,0);
	}

	function removePoints()
	{
		return 0; // TO DO : retirer un point par colonne et ligne sans jardin
	}

	return addPoints() + removePoints();

	
	
}

function Green_city(graph: G.Graph<N.Color>) : number{
	//parcours en largeurs qui compte nb de quartier vert 
	return 0;
}


export{Objectives,circulation,Quarter,Flowers_city,Green_city};