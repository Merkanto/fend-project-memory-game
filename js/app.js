/*
 * Create a list that holds all of your cards
 */
const cardsHolderArr = ['paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle'];
const cardsDeck = document.querySelector('.deck');
const restartGameBtn = document.querySelector('.game-restart');

//Game popup message of game variables
const gameTime = document.querySelector('.game-time');
const gameMessages = document.querySelector('.game-messages');
const gameStars = document.querySelector('.stars');
const gameMovesCounter = document.querySelector('.game-moves-counter');
const gameMoves = document.querySelector('.game-moves');

let gameTimer;
let gameMinutes = document.querySelector('.game-minutes');
let gameSeconds = document.querySelector('.game-seconds');

let resetGameTimer = 0;

let cardsMatchingArr = [];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//create function to stop game watch, who counts the game time until winning the game
function setGameTime() {
    gameTimer = setInterval(function () {
        gameSeconds.innerText++;
        if (gameSeconds.innerText === 60) {
            gameMinutes.innerText++;
            gameSeconds.innerText = 0;
        }
    }, 1000);
    return gameTimer;
}

//create function to turn the game card
function turnGameCard(e) {
    e.target.classList.add('open');
    e.target.classList.add('show');
}

//create function to show popup messages
function popupMessage() {
    const winnerMessage = document.querySelector(".game-message");
    gameMessages.style.display = "block";
    winnerMessage.appendChild(restartGameBtn);
    winnerMessage.appendChild(gameStars);
    winnerMessage.appendChild(gameTime);
    winnerMessage.appendChild(moveCounter);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
