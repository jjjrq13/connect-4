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

const board = document.querySelector('#board');
console.log(board)

//------------------------ LET ------------------------

let playerOneName;
let playerTwoName;

//------------------------ FUNCTIONS ------------------------


//display message function 
const displayMessage = (element) => {
    document.querySelector('#display-message').textContent = `${element}`;;
}

//player name function
const playerNameTrue = () => {
    if (nameInputs[0].value && nameInputs[1].value) {
        document.querySelector('#player-red-name').textContent = `${nameInputs[0].value}`;
        playerOneName = `${nameInputs[0].value}`

        document.querySelector('#player-yellow-name').textContent = `${nameInputs[1].value}`;
        playerTwoName = `${nameInputs[1].value}`
        console.log(`Player Red: ${playerOneName}, Player Yellow: ${playerTwoName}`);
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
};

const playAgainButton = () => {
    console.log('Gmae Has Restarted');
}

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

//game code

displayMessage('You can suck it ')