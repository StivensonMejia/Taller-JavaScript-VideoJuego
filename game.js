console.log(maps);

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function startGame() {

    game.font = elementSize + 'px none';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    mapRowsCols.forEach((row, rowI)  => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1.3);
            const posY = elementSize * (rowI + 0.91);

            if (col == 'O') {
                playerPosition.x = posX;
                playerPosition.y = posY;
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
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

function movePlayer() {

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
    
}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


function moveByKeys(event) {
    /* console.log(event); */
    if (event.key == 'ArrowUp') {
        moveUp();
    } else if (event.key == 'ArrowLeft') {
        moveLeft();
    } else if (event.key == 'ArrowRight') {
        moveRight();
    } else if (event.key == 'ArrowDown') {
        moveDown();
    }
}
function moveUp() {
    playerPosition.y -= elementSize
    movePlayer();
    console.log('arriba');
    console.log(elementSize);
}
function moveLeft() {
    console.log('izquierda');
}
function moveRight() {
    console.log('derecha');
}
function moveDown() {
    console.log('abajo');
}