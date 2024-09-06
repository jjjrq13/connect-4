/*
Lets set up our hidden button class thingy thing!
*/

//------------------------ CONST ------------------------

const allSections = document.querySelectorAll('section');
console.log(allSections);
const allButtons = document.querySelectorAll('button');
console.log(allButtons);
const nameInputs = document.querySelectorAll('input');
console.log(nameInputs);

const domBoard = [
    document.querySelectorAll('.column-A'),
    document.querySelectorAll('.column-B'),
    document.querySelectorAll('.column-C'),
    document.querySelectorAll('.column-D'),
    document.querySelectorAll('.column-E'),
    document.querySelectorAll('.column-F'),
    document.querySelectorAll('.column-G'),
];

const gameBoard = {
    A: [0, 0, 0, 0, 0, 0],
    B: [0, 0, 0, 0, 0, 0],
    C: [0, 0, 0, 0, 0, 0],
    D: [0, 0, 0, 0, 0, 0],
    E: [0, 0, 0, 0, 0, 0],
    F: [0, 0, 0, 0, 0, 0],
    G: [0, 0, 0, 0, 0, 0],
};

//------------------------ LET ------------------------

let playerOneName;
let playerTwoName;
let currentPlayer;

//------------------------ FUNCTIONS ------------------------

//display message function
const displayMessage = (element) => {
    document.querySelector('#display-message').textContent = `${element}`;
};

//player name function
const playerNameTrue = () => {
    if (nameInputs[0].value && nameInputs[1].value) {
        document.querySelector(
            '#player-red-name',
        ).textContent = `${nameInputs[0].value}`;
        playerOneName = `${nameInputs[0].value}`;

        document.querySelector(
            '#player-yellow-name',
        ).textContent = `${nameInputs[1].value}`;
        playerTwoName = `${nameInputs[1].value}`;
        console.log(
            `Player Red: ${playerOneName}, Player Yellow: ${playerTwoName}`,
        );
        return true;
    } else {
        nameInputs.forEach((name) => {
            if (!name.value) {
                name.style = 'border: 1px solid red';
            }
            return false;
        });
    }
};

//button functions
const gameRulesToggle = () => {
    let rules = document.querySelector('#rules-explained').classList;

    if (rules.contains('hidden')) {
        rules.remove('hidden');
        allButtons[1].classList.add('hidden');
    } else {
        rules.add('hidden');
        allButtons[1].classList.remove('hidden');
    }
};

const letsPlay = () => {
    if (allSections[1].classList.contains('hidden')) {
        allSections[1].classList.remove('hidden');
        allSections[0].classList.add('hidden');
    }
};

const beginGame = () => {
    if (allSections[2].classList.contains('hidden') && playerNameTrue()) {
        allSections[2].classList.remove('hidden');
        allSections[1].classList.add('hidden');
    }
    whoWillStartIsTheQuestion();
};

const playAgainButton = () => {
    console.log('game Has Restarted');
};

const whoWillStartIsTheQuestion = () => {
    let random = Math.round(Math.random());
    if (playerOneName && playerTwoName) {
        let start = [playerOneName, playerTwoName];
        currentPlayer = start[random];
    }
    console.log(currentPlayer);
    displayMessage(`${currentPlayer} you will start the game!`);
};

//game fucntions

const next = () => {
    if(currentPlayer === playerOneName){
        currentPlayer = playerTwoName;
    } else {
        currentPlayer = playerOneName;
    }
}


const assignPiece = (event) => {
    let column = event.target.id[0];
    console.log(column);
    let row = gameBoard[column].indexOf(0);
    let img = document.createElement('img');
    let id = document.querySelector(`#${column}${row}`);

    if (currentPlayer === playerOneName) {
        gameBoard[column][row] = 'R';
        img.setAttribute('src', './assets/red-piece.svg');
        img.setAttribute('alt', 'red playing piece');
        img.setAttribute('id', `${column}${row}-img`);
        id.appendChild(img);
        id.style = 'background-color: transparent';
        next();
    } else {
        gameBoard[column][row] = 'Y';
        img.setAttribute('src', './assets/yellow-piece.svg');
        img.setAttribute('alt', 'yellow playing piece');
        img.setAttribute('id', `${column}${row}-img`);
        id.appendChild(img);
        id.style = 'background-color: transparent';
        next();
    }
};




//------------------------ EVENT LISTNERS ------------------------

allButtons.forEach((btn) => {
    switch (btn.id) {
        case 'btn-game-rules':
            btn.addEventListener('click', gameRulesToggle);
            break;
        case 'btn-play':
            btn.addEventListener('click', letsPlay);
            break;
        case 'begin-game':
            btn.addEventListener('click', beginGame);
            break;
        case 'play-again-btn':
            btn.addEventListener('click', playAgainButton);
            break;
    }
});

domBoard.forEach((column) => {
    column.forEach((row) => {
        row.addEventListener('click', assignPiece);
    });
});


//------------------------ GAME CODE ------------------------

//game code

