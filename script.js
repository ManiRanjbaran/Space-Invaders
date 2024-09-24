const border = document.querySelector('.border');

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
        squares[alienInvaders[i]].classList.add('invader');
    }
}
drawInvaders();


// Add Shooter
squares[237].classList.add('shooter');
