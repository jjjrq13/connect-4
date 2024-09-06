
//*------------------------ CONST ------------------------

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

const displayID = document.querySelector('#display-message');

const gameBoard = {
    A: [0, 0, 0, 0, 0, 0],
    B: [0, 0, 0, 0, 0, 0],
    C: [0, 0, 0, 0, 0, 0],
    D: [0, 0, 0, 0, 0, 0],
    E: [0, 0, 0, 0, 0, 0],
    F: [0, 0, 0, 0, 0, 0],
    G: [0, 0, 0, 0, 0, 0],
};

// const gameBoard = {
//     A: ['a0', 'a1', 'a2', 'a3', 'a4', 'a5'],
//     B: ['b0', 'b1', 'b2', 'b3', 'b4', 'b5'],
//     C: ['c0', 'c1', 'c2', 'c3', 'c4', 'c5'],
//     D: ['d0', 'd1', 'd2', 'd3', 'd4', 'd5'],
//     E: ['e0', 'e1', 'e2', 'e3', 'e4', 'e5'],
//     F: ['f0', 'f1', 'f2', 'f3', 'f4', 'f5'],
//     G: ['g0', 'g1', 'g2', 'g3', 'g4', 'g5'],
// };

//*------------------------ LET ------------------------

let playerOneName = 'Red';
let playerTwoName = 'Yellow';

let redScore = 0;
let yellowScore = 0;

let currentPlayer;
let movesLeft = 42;
let weHaveAWinner = false;
let soundOn = false;

//*------------------------ FUNCTIONS ------------------------

// ------------------------ Sound ------------------------
const playSoundEffect = () => {
    let sound = document.querySelector('#music');
    console.log(sound);
    sound.play();
};

const backgroundMusic = () => {
    let sound = document.querySelector('#background-music');
    console.log(sound);
    console.log(sound.muted);
    if (soundOn) {
        console.log('Sound On True');
        sound.muted = true;
        soundOn = false;
    } else {
        console.log('Sound On false');
        sound.play();
        sound.muted = false;
        soundOn = true;
    }
};

const winningSoundEffect = () => {
    let sound = document.querySelector('#winner-sound');
    console.log(sound);
    sound.play();
};

// ------------------------ Reset Game ------------------------

const removePiecesFromBoard = () => {
    let circles = document.querySelectorAll('.circle');
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].querySelector('img')) {
            circles[i].removeChild(circles[i].querySelector('img'));
            circles[i].style = 'background-color: lightgrey';
        }
    }
};

const noMoreClicks = () => {
    let boardClass = document.querySelector('#board').classList;
    if (boardClass.contains('preventClick')) {
        boardClass.remove('preventClick');
    } else {
        boardClass.add('preventClick');
    }
};

const resetGameBoard = () => {
    let column = Object.keys(gameBoard);
    for (let c = 0; c < column.length; c++) {
        console.log(gameBoard[column[c]]);
        for (let r = 0; r < gameBoard[column[c]].length; r++) {
            gameBoard[column[c]][r] = 0;
        }
    }
};

// ------------------------ Display Functions ------------------------

const displayMessage = (element) => {
    displayID.textContent = `${element}`;
};

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

const updatePlayerScore = () => {
    document.querySelector('#player-yellow-score').textContent = yellowScore;
    document.querySelector('#player-red-score').textContent = redScore;
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

const whoPlaysNextIsTheQuestion = () => {
    let random = Math.round(Math.random());
    let start = [playerOneName, playerTwoName];
    currentPlayer = start[random];
    console.log(currentPlayer);
    displayMessage(`Fate has picked you ${currentPlayer}, Begin!`);
};

// ------------------------ Button Functions ------------------------

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
    if (displayID.textContent.includes('tie')) {
        console.log('there was a tie, im in function');
        whoPlaysNextIsTheQuestion();
        resetGameBoard();
        removePiecesFromBoard();
        weHaveAWinner = false;
        movesLeft = 42;
        updatePlayerScore();
        console.log(
            `Inside of tie, before calling noClick ${allButtons[3].classList}`,
        );
        allButtons[3].classList.add('hidden');
    } else {
        resetGameBoard();
        removePiecesFromBoard();
        currentPlayer = weHaveAWinner;
        weHaveAWinner = false;
        movesLeft = 42;
        updatePlayerScore();
        displayMessage(`Winner goes first, your move ${currentPlayer}`);
        noMoreClicks();
        allButtons[3].classList.add('hidden');
    }
};

// ------------------------ Game Functions ------------------------

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
        playSoundEffect();
        next();
    } else {
        gameBoard[column][row] = 'Y';
        img.setAttribute('src', './assets/yellow-piece.svg');
        img.setAttribute('alt', 'yellow playing piece');
        img.setAttribute('id', `${column}${row}-img`);
        id.appendChild(img);
        id.style = 'background-color: transparent';
        playSoundEffect();
        next();
    }
    checkForTie();
};

const next = () => {
    if (currentPlayer === playerOneName) {
        currentPlayer = playerTwoName;
        displayMessage(`${playerTwoName}, your turn!`);
        checkForWinner();
        movesLeft--;
        console.log(movesLeft);
    } else {
        currentPlayer = playerOneName;
        displayMessage(`${playerOneName}, your turn!`);
        checkForWinner();
        movesLeft--;
        console.log(movesLeft);
    }
};

const checkForWinner = () => {
    let column = Object.keys(gameBoard);
    //vertical win
    for (let c = 0; c < column.length; c++) {
        for (let r = 0; r < 3; r++) {
            let winner = [
                gameBoard[column[c]][r],
                gameBoard[column[c]][r + 1],
                gameBoard[column[c]][r + 2],
                gameBoard[column[c]][r + 3],
            ];
            if (winner.every((element) => element === 'R')) {
                winningSoundEffect();
                weHaveAWinner = playerOneName;
                redScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            } else if (winner.every((element) => element === 'Y')) {
                winningSoundEffect();
                weHaveAWinner = playerTwoName;
                yellowScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            }
        }
    }
    //Horizontal win
    for (let r = 0; r < 6; r++) {
        for (let i = 0; i < 4; i++) {
            let winner = [
                gameBoard[column[i]][r],
                gameBoard[column[i + 1]][r],
                gameBoard[column[i + 2]][r],
                gameBoard[column[i + 3]][r],
            ];
            if (winner.every((element) => element === 'R')) {
                winningSoundEffect();
                weHaveAWinner = playerOneName;
                redScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            } else if (winner.every((element) => element === 'Y')) {
                winningSoundEffect();
                weHaveAWinner = playerTwoName;
                yellowScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            }
        }
    }
    //diagnol wins (R-L)
    for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 3; r++) {
            let winner = [
                gameBoard[column[c]][r],
                gameBoard[column[c + 1]][r + 1],
                gameBoard[column[c + 2]][r + 2],
                gameBoard[column[c + 3]][r + 3],
            ];
            if (winner.every((element) => element === 'R')) {
                winningSoundEffect();
                weHaveAWinner = playerOneName;
                redScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            } else if (winner.every((element) => element === 'Y')) {
                winningSoundEffect();
                weHaveAWinner = playerTwoName;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                yellowScore++;
                break;
            }
        }
    }
    //diagnol wins (L-R)
    for (let c = 0; c < 4; c++) {
        for (let r = 5; r > 2; r--) {
            let winner = [
                gameBoard[column[c]][r],
                gameBoard[column[c + 1]][r - 1],
                gameBoard[column[c + 2]][r - 2],
                gameBoard[column[c + 3]][r - 3],
            ];
            if (winner.every((element) => element === 'R')) {
                winningSoundEffect();
                weHaveAWinner = playerOneName;
                redScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            } else if (winner.every((element) => element === 'Y')) {
                winningSoundEffect();
                weHaveAWinner = playerTwoName;
                yellowScore++;
                noMoreClicks();
                displayMessage(`${weHaveAWinner} has won this round!`);
                allButtons[3].classList.remove('hidden');
                break;
            }
        }
    }
};

const checkForTie = () => {
    if (movesLeft === 0) {
        displayMessage('Intense Game, You both tied.');
        allButtons[3].classList.remove('hidden');
        console.log(allButtons[3].classList);
    }
};

// !------------------------ Build Functions ------------------------
//?                 My Little Work Station Over Here!


// !------------------------ Build Functions ------------------------

//*------------------------ EVENT LISTNERS ------------------------

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

document.querySelector('#main-logo').addEventListener('click', backgroundMusic);
document.querySelector('#tiny-logo').addEventListener('click', backgroundMusic);
