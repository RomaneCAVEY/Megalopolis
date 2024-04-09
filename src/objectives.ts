import * as B from "./board.js";
import * as G from "./graph.js";
import * as N from "./neighborhood.js";
import * as R from "./road.js";
import * as C from "./common.js";
import {List, MapOf} from 'immutable';



enum Objectives {
    Off_the_road,
    Quarter,
    Flowers_city,
    Green_city,
	reduce_circulation,
	Ring_Road
}


//Points by objective in the order of the enum Objectives (on the top)
const Objectives_points = [1,0,2,3,2,14];

/** Returns an empty list of Objectives
 * @param 
 * @return an empty list of Objectives
 */
function createEmptyObjectives(): List<Objectives>{
	return List<Objectives>();
}


/** Returns an list of 5 Objectives
 * @param 
 * @return a list of  5 Objectives
 */
function initializeObjectives(): List<Objectives>{
	const Object:List<Objectives> =createEmptyObjectives();

	const rand1 : number = Math.floor(Math.random() * 5);
	Object.push(rand1);

	let rand2 : number = Math.floor(Math.random() * 5);
	if(rand1===rand2){
		rand2=(rand2+1)%5;
	}
	Object.push(rand2);

	let rand3 : number = Math.floor(Math.random() * 5);
	if(rand1===rand3 || rand2===rand3){
		rand3=(rand3+1)%5;
	}
	Object.push(rand3);

	let rand4 : number = Math.floor(Math.random() * 5);
	if(rand1===rand4 || rand2===rand4 || rand3===rand4){
		rand4=(rand4+1)%5;
	}
	Object.push(rand4);

	let rand5 : number = Math.floor(Math.random() * 5);
	if(rand1===rand5 || rand2===rand5 || rand3===rand5 || rand4===rand5){
		rand5=(rand5+1)%5;
	}
	Object.push(rand5);
	
	return Object;
	
}

/** Returns an empty list of Objectives
 * @param index the index of the objectives in the Array Objectives
 * @return the point i-of the objective
 */
function Point_of_objective(index: number):number{
	return Objectives_points[index];
}



/** Returns the points of the "rule ring_road"
 * @param graph the graph of the road
 * @return points of the rule ring_road
 * Rules:
 * 	-1pt/Road section for all roads forming a loop closed. 
 *  -You can mark for multiple routes.
 */
function ring_road(graph: G.Graph<R.Road>) : number{
   return G.getCycles(graph).reduce(((acc,e)=> acc + e.size ) , 0);
}

/** Returns the points of the rule "reduce_circulation"
 * @param graph the graph of the road
 * @return points of the rule reduce_circulation
 * Rules:
 * 	1pt/road in your city
 */
function reduce_circulation(graph: G.Graph<R.Road>) : number{
	return (-1*G.getConnexComponents(graph).size);
}


/** Returns the points of the rule "Flowers_city"
 * @param board the board of the game
 * @return points of the rule Flowers_city
 * Rules:
 * 	1pt/each row and column of the tray containing exactly 3 Parks 
 * -1pt/each row and column containing no
 */
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
		function line(x:number | undefined, board:B.Board, c:number) 
		{
			if (x === undefined)
				return 0;

			if ( x === max_x)
				return c;

			else {
				if ( ((board.filter( (e: B.Quarter) => e !== C.nil && e.get("x") === x && e.get("color") === N.Color.Green )).size)<1)
					return line(x+1, board, c-1);
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
				if ( ((board.filter( (e: B.Quarter)=> e !== C.nil && e.get("y") === y && e.get("color") === N.Color.Green )).size)<1 )
					return column(y+1, board, c-1);
				else
					return column(y+1, board, c);
			}
		}

		return line(min_x,board,0)+column(min_y,board,0);
	}
	return addPoints() + removePoints();
}

/** Returns the points of the rule "Green_city"
 * @param graph the graph of the colors
 * @return points of the rule Green_city
 * Rules:
 * 	1pt per park in the city 
 * -3pt per industrial district in the city
 */
function Green_city(graph: G.Graph<N.Color>) : number{
	return G.getConnexComponents(graph).reduce(((acc,e)=> (e.get(0) ===N.Color.Green) ? acc+e.size : (e.get(0) ===N.Color.Grey) ? acc+(-3)*e.size: acc), 0);
}


/** Returns the points of the rule "Off_the_road"
 * @param board the board of the game
 * @return points of the rule Off_the_road
 * Rules:
 * 	1pt/road that doesn't end on the outskirts of the city 
 * -1pt/road that ends on the outskirts of the city (a map is on the periphery if it is on the edge of the plateau)
 */
function Off_the_road(board : B.Board) : number{
	//return board.reduce((acc,e)=>(e.get("road",0);
	return 0;
}



/** Returns the Size_largest_componentof_each_color
 * @param board the board of the game
 * @return List<Number>
 * Notice:
 * The order is the same as the enum color in neighborhoods
 */

function Size_largest_componentof_each_color(graph: G.Graph<N.Color>) : List<number>{
	return G.getConnexComponents(graph).reduce(((acc,e)=> (e.get(0) ===N.Color.Green && e.size>acc.get(0, 0)) ? acc.set(0,e.size) : (e.get(0) ===N.Color.Blue && e.size>acc.get(1, 0))? acc.set(1,e.size): (e.get(0)===N.Color.Red && e.size>acc.get(2, 0)) ? acc.set(2,e.size) : (e.get(0)===N.Color.Grey && e.size>acc.get(3, 0)) ? acc.set(3,e.size) : acc ), List<number>());
}



/** Returns the points of the rule "quarter"
 * @param board the board of the game
 * @return points of the rule quarter
 * Rules:
 * 1pt/district for the largest boroughs in each of the 4 types (a borough is a related component of neighbourhoods)
 */
function quarter(graph: G.Graph<N.Color>): number{
	//calcul composante connexe pour les couleurs , garde la plus grande pour chacun des 4 types
	return Size_largest_componentof_each_color(graph).reduce((acc,e)=> acc+e, 0);
}


/** Returns the points of the player
 * @param board: board of the game, graphC: graph of color, graphR: graph of the roads , players_objective: liste of objectives
 * @return points of the game
 */
function objectives_player_gain(graphC: G.Graph<N.Color>,graphR: G.Graph<R.Road>, board: B.Board,players_objective : List<Objectives>){
	return players_objective.reduce((acc,objective)=>(
	(objective===0)? 
		acc+Off_the_road(board):(objective===1)? 
			acc+quarter(graphC): (objective===2)? 
				acc+Flowers_city(board):(objective===3)?
					acc+Green_city(graphC):(objective===4)?
						acc+reduce_circulation(graphR):(objective===5)?
							acc+ring_road(graphR):
				acc),0);

}


export{Objectives,Point_of_objective,initializeObjectives,objectives_player_gain};