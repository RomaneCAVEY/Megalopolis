import * as I from "../src/interactive.ts";
import * as B from "../src/board.ts";
import * as C from "../src/neighborhood.ts";
import * as Disp from "../src/display.ts";

const statusText = document.getElementById("status");
const turnCounterText = document.getElementById("turn-counter");
const seedInput = document.getElementById("game-seed");

let gameStates: I.GameState = [];

let displayTurn = 0;
let gameEnded = true;

let waitingForResponse = false;

document.getElementById("launch-button").addEventListener('click', () => {
    gameStates = [];
    displayTurn = 0;
    gameEnded = false;
    gameStates.push(I.initGame(parseInt(seedInput.value)));
    console.log(gameStates.slice(-1)[0]);
    statusText.innerText = "Partie en cours.";
    turnCounterText.innerText = displayTurn;
    document.getElementById("score").innerText = 0;
    document.getElementById("score-target").innerText = I.objScore(gameStates[0]);

    document.getElementById("board").innerHTML = makeBoard(gameStates.slice(displayTurn)[0]);
    document.getElementById("score").innerText = I.score(gameStates.slice(displayTurn)[0]);
});

document.getElementById("next-turn").addEventListener('click', () => {
    if (waitingForResponse) {
        return;
    }
    
    const lastTurn = gameStates.slice(-1)[0].get('turn');
    
    if (displayTurn === lastTurn && !gameEnded) {
        waitingForResponse = true;
        statusText.innerText = "Calcul en cours, veuillez patienter...";
        playTurn(gameStates.slice(-1)[0]).then(
            (newState) => {
                gameStates.push(newState);
                displayTurn = gameStates.slice(-1)[0].get('turn');

                if (displayTurn >= gameStates[0].get('deck').size) {
                    statusText.innerText = "Partie terminée.";
                    
                    if (I.score(gameStates.slice(-1)[0]) >= I.objScore(gameStates[0])) {
                        statusText.innerText += " Victoire !";
                    } else {
                        statusText.innerText += " Défaite.";
                    }
                    gameEnded = true;
                } else {
                    statusText.innerText = "Partie en cours.";
                }
                waitingForResponse = false;
                turnCounterText.innerText = displayTurn;
                document.getElementById("board").innerHTML = makeBoard(gameStates.slice(displayTurn)[0]);
                document.getElementById("score").innerText = I.score(gameStates.slice(displayTurn)[0]);
            }
        );
        
    } else if (displayTurn < lastTurn) {
        displayTurn += 1;

        turnCounterText.innerText = displayTurn;
        document.getElementById("board").innerHTML = makeBoard(gameStates.slice(displayTurn)[0]);
        document.getElementById("score").innerText = I.score(gameStates.slice(displayTurn)[0]);
    }
});

document.getElementById("previous-turn").addEventListener('click', () => {
    const lastTurn = gameStates.slice(-1)[0].get('turn');
    
    if (displayTurn > 0) {
        displayTurn -= 1;
    }

    turnCounterText.innerText = displayTurn;
    document.getElementById("board").innerHTML = makeBoard(gameStates.slice(displayTurn)[0]);
    document.getElementById("score").innerText = I.score(gameStates.slice(displayTurn)[0]);
});

document.getElementById("random-seed").addEventListener('click', () => {
    seedInput.value = Math.floor(Math.random() * 123456789);
});


document.getElementById("display-board-term").addEventListener('click', () => {
    Disp.displayBoard(gameStates.slice(-1)[0].get('board'));
});

function playTurn(gameState: I.GameState) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(I.playTurn(gameState));
        });
    });
}

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


