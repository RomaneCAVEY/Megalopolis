import {finalBoard} from "../src/main.js" 
import * as B from "../src/board.js" 


let board=finalBoard;

function quarter_line_in_board(board: B.Board, i:number){
	return board.filter((e)=> e!== undefined && e.get('x')===i	);	
}


function display(){
	function bis(i:number){
		if (i===(15*2)){
			return ;
		}
		quarter_line_in_board(finalBoard,i);
		bis(i++)
	}
	return bis(-15*2);
}