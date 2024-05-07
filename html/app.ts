import * as I from "../src/interactive.ts";
import * as B from "../src/board.ts";
import * as C from "../src/neighborhood.ts";
import * as Disp from "../src/display.ts";

const statusText = document.getElementById("status");

const gameStates: I.GameState = [];

document.getElementById("launch-button").addEventListener('click', () => {
    statusText.innerText = "Calcul en cours...";
    if (gameStates.length === 0) {
        gameStates.push(I.initGame(10));
        console.log(gameStates.slice(-1)[0]);
        statusText.innerText = "Partie initialisée ! Tour " + gameStates.slice(-1)[0].get('turn');
        document.getElementById("launch-button").innerText = "Tour suivant";
    } else {
        gameStates.push(I.playTurn(gameStates.slice(-1)[0]));
        statusText.innerText = "Tour " + gameStates.slice(-1)[0].get('turn');
    }
    document.getElementById("board").innerHTML = makeBoard(gameStates.slice(-1)[0]);
    document.getElementById("score").innerText = I.score(gameStates.slice(-1)[0]);
});


document.getElementById("display-board-term").addEventListener('click', () => {
    Disp.displayBoard(gameStates.slice(-1)[0].get('board'));
});


function makeBoard(gameState: I.GameState) {
    return gameState.get('board').reduce((acc, e) => {
        return acc + `<div class="tile" style="grid-row: ` + (15 - e.get('y')) + `; grid-column: ` + (e.get('x') + 15) + `;">` + makeQuarter(e) + `</div>`;
    }, "");
}

function makeQuarter(quarter: B.Quarter) {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewbox="0 0 4 4">`;

    svg += `<rect width="4" height="4" x="0" y="0" fill="` + getDisplayColor(quarter.get('color')) + `" />`;

    // Draw roads
    if (quarter.get("road").get("north"))
        svg += `<line x1="2" y1="0" x2="2" y2="2" stroke="#BBBBBB" stroke-linecap="round" />`;
    if (quarter.get("road").get("east"))
        svg += `<line x1="2" y1="2" x2="4" y2="2" stroke="#BBBBBB" stroke-linecap="round" />`;
    if (quarter.get("road").get("south"))
        svg += `<line x1="2" y1="2" x2="2" y2="4" stroke="#BBBBBB" stroke-linecap="round" />`;

    if (quarter.get("road").get("west"))
        svg += `<line x1="0" y1="2" x2="2" y2="2" stroke="#BBBBBB" stroke-linecap="round" />`;

    svg += `</svg>`;
    
    return svg;
}

function getDisplayColor(c: C.Color): string {
    switch (c) {
        case C.Color.Green:
            return "#00DFA2";

        case C.Color.Blue:
            return "#0079FF";

        case C.Color.Red:
            return "#FF0060";

        case C.Color.Grey:
            return "#666666";

        default:
            return "#FF00FF";
    }
}


