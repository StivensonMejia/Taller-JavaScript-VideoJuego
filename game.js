console.log(maps);

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;
localStorage.getItem('record',0);

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function fixNumber(n) {
    return Number(n.toFixed(3));
}
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = fixNumber(canvasSize);
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10.3;

    elementsSize = fixNumber(elementsSize);

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'center';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    showLives();
    ancientRecord();

    enemyPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);

        if (col == 'O') {
            if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
            }
        } else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
        } else if (col == 'X') {
            enemyPositions.push({
                x: posX,
                y: posY,
            });
        }
        
        game.fillText(emoji, posX, posY);
        });
    });

  movePlayer();
}

function movePlayer() {

    const gifColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const gifColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const gifColision = gifColisionX && gifColisionY;


    if (gifColision) {
        levelWin();
    }

    const enemyColisions = enemyPositions.find(enemy => {
        const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);

        return enemyColisionX && enemyColisionY;
    });

    if (enemyColisions) {
        levelFail();
    }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);


}

function levelWin() {
    console.log('subiste de nivel');
    level++;
    startGame();
}

function gameWin() {
    console.log('terminaste el juego');
    clearInterval(timeInterval)
    showRecord();
}

function levelFail() {

    lives--;
    console.log(lives);

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives)
}

function showTime () {
    timePlayer = Date.now() - timeStart;
    spanTime.innerHTML = timePlayer;
}

function showRecord() {
    if (!localStorage.getItem('record') || (localStorage.getItem('record') > timePlayer)) {

        localStorage.setItem('record', timePlayer);
        spanRecord.innerHTML = localStorage.getItem('record');

    } else if (localStorage.getItem('record') < timePlayer) {

    }

}

function ancientRecord() {
    if (record) {
        spanRecord.innerHTML = localStorage.getItem('record');
    }
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
    console.log(playerPosition);
}
function moveUp() {
    console.log('Me quiero mover hacia arriba');

    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize;
        playerPosition.y = fixNumber(playerPosition.y)
        startGame();
    }
}
function moveLeft() {
    console.log('Me quiero mover hacia izquierda');


    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        playerPosition.x = fixNumber(playerPosition.x)
        startGame();
    }
}
function moveRight() {
    console.log('Me quiero mover hacia derecha');


    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        playerPosition.x = fixNumber(playerPosition.x)
        startGame();
    }
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');

    
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        playerPosition.y = fixNumber(playerPosition.y)
        startGame();
    }
}