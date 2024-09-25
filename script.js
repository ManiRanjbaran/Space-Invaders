const border = document.querySelector('.border');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');

const firstSquare = 0;
const lastSquare = 274;
const invaderMS = 200; // MS: Movement Speed
const laserMS = 90; // MS: Movement Speed

let shooterPos = 237;
let width = 25;
let direction = 1;
let invadersId;
let score = 0;
let goingRight = true;
let aliensRemoved = [];

// Making each Square inside the border
for (let i = 0; i < 275; i++) {
    const square = document.createElement('div');
    border.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.border div'));

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
]

function drawInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i))
            squares[alienInvaders[i]].classList.add('invader');
    }
}
drawInvaders();

function removeInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

// Draw next position of the Shooter and remove the last one 
// IF THE SHOOTER MOVES TO RIGHT
function drawShooter() {
    squares[shooterPos].classList.add('shooter');
}
drawShooter();

function game() {
    function moveShooter(event) {
        squares[shooterPos].classList.remove('shooter'); // Remove shooter's last placement

        switch (event.key) {
            case 'a':
                if (shooterPos > firstSquare) {
                    shooterPos -= 1;
                    drawShooter();
                }
                break;
            case 'd':
                if (shooterPos < lastSquare) {
                    shooterPos += 1;
                    drawShooter();
                }
                break;
        }
    }
    document.addEventListener('keydown', moveShooter);

    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
        removeInvaders();

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1;
                direction = -1;
                goingRight = false;
            }
        }

        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1;
                direction = 1;
                goingRight = true;
            }
        }
        checkGameOver();

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction; // Moves each Invader
            checkGameOver();
        }
        drawInvaders();
    }
    invadersId = setInterval(moveInvaders, invaderMS);

    function checkGameOver() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] === shooterPos) {
                clearInterval(invadersId);
                document.removeEventListener('keydown', moveShooter);
                resultDisplay.innerText = "You lost!";
            }
        }
    }

    function shoot() {
        let laserPos = shooterPos;
        function moveLaser() {
            squares[laserPos].classList.remove('laser');
            laserPos -= width;
            squares[laserPos].classList.add('laser');

            if (squares[laserPos].classList.contains('invader')) {
                squares[laserPos].classList.remove('laser');
                squares[laserPos].classList.remove('invader');
                squares[laserPos].classList.add('boom');
                score++

                setTimeout(() => squares[laserPos].classList.remove('boom'), 100);
                clearInterval(laserId)

                const alienRemoved = alienInvaders.indexOf(laserPos);
                aliensRemoved.push(alienRemoved);
                score++;
                scoreDisplay.innerText = score / 2;

                checkGameWon();
            }
        }
        laserId = setInterval(moveLaser, laserMS);
    }
    document.addEventListener('click', shoot);

    function checkGameWon() {
        if (alienInvaders.length === aliensRemoved.length) {
            resultDisplay.innerText = "You Won!";
            clearInterval(invadersId);
        }
    }
}
game();
