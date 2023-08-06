console.log(maps);

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;

function startGame() {

    game.font = elementSize + 'px none';
    game.textAlign = 'end';

    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    mapRowsCols.forEach((row, rowI)  => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1.3);
            const posY = elementSize * (rowI + 0.91);
            game.fillText(emoji, posX, posY);
        });
    });

    /* for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
            game.fillText(emojis[mapRowsCols[y -1][x-1]], elementSize * x, elementSize * y);
        }
    } */
}

function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }
    else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = (canvasSize / 10) -1;

    startGame();
}