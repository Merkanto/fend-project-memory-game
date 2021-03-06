/*
 * Create a list that holds all of your cards
 */
const cardsHolderArr = ["paper-plane-o", "paper-plane-o", "bolt", "bolt", "bomb", "bomb", "diamond", "diamond", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "anchor", "anchor"];
const cardsDeck = document.querySelector(".deck");
const restartGameBtn = document.querySelector(".game-restart");

//Game popup message of game variables
const gameTime = document.querySelector(".game-time");
const gameMessages = document.querySelector(".game-messages");
const gameStars = document.querySelector(".stars");
const gameMovesCounter = document.querySelector(".game-moves-counter");
const gameMoves = document.querySelector(".game-moves");

let gameTimer;
let gameMinutes = document.querySelector(".game-minutes");
let gameSeconds = document.querySelector(".game-seconds");

let resetGameTimer = 0;

let cardsMatchingArr = [];
let finishGameCardsCounter = 0;

restartGameBtn.addEventListener("click", createGameBoard);
cardsDeck.addEventListener("click", openAndShowCardSymbol);
shuffle(cardsHolderArr);
startGameBoard();

//create gameBoard and start the game
function createGameBoard() {
    cardsDeck.innerHTML = "";
    shuffle(cardsHolderArr);
    startGameBoard();
    resetGameTimer = 0;
    gameMinutes.innerText = 0;
    gameSeconds.innerText = 0;
    finishGameCardsCounter = 0;
    gameMoves.innerText = 0;
    stopWatch();
    startRating();
    hidePopupMessage();
}

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

//creating start game board with all cards
function startGameBoard() {
    cardsMatchingArr = [];
    for (let i = 0; i < cardsHolderArr.length; i++) {
        const newListItem = document.createElement("li");

        newListItem.setAttribute("class", "card fa fa-" + cardsHolderArr[i]);
        cardsDeck.appendChild(newListItem);
    }
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

//stop watch
function stopWatch() {
    clearInterval(gameTimer);
}

//create function to turn the game card
function turnGameCard(e) {
    e.target.classList.add("open");
    e.target.classList.add("show");
}

//create function to hide popup messages
function hidePopupMessage() {
    const scoreBlock = document.querySelector(".score-panel");
    gameMessages.style.display = "none";
    restartGameBtn.appendChild(gameTime);
    scoreBlock.prepend(gameStars);
    scoreBlock.appendChild(gameTime);
    scoreBlock.appendChild(gameMovesCounter);
    scoreBlock.appendChild(restartGameBtn);
}

//create function to show popup messages
function showPopupMessage() {
    const winnerMessage = document.querySelector(".game-message");
    gameMessages.style.display = "block";
    winnerMessage.appendChild(restartGameBtn);
    winnerMessage.appendChild(gameStars);
    winnerMessage.appendChild(gameTime);
    winnerMessage.appendChild(gameMovesCounter);
}

//create function for matching of cards
function matchedCards() {
    cardsMatchingArr[0].classList.add("match disabled");
    cardsMatchingArr[1].classList.add("match disabled");
    finishGameCardsCounter++;

    if (finishGameCardsCounter === 8) {
        clearInterval(gameTimer);
        showPopupMessage();
    }
}

//create function for no matching of cards
function notMatchedCards() {
    cardsMatchingArr[0].classList.add("no-match");
    cardsMatchingArr[1].classList.add("no-match");
    setTimeout(function() {
        cardsMatchingArr[0].classList.remove("open", "show", "no-match");
        cardsMatchingArr[1].classList.remove("open", "show", "no-match");
        cardsMatchingArr = [];
    }, (1000));
}

//create function to checks if cards are matched
function areMatchedCards() {
    if (cardsMatchingArr[0].classList.value === cardsMatchingArr[1].classList.value) {
        setTimeout(function() {
            matchedCards();
            cardsMatchingArr = [];
        }, (500));
    } else {
        notMatchedCards();
    }
}

//if the player's moves are less than 17, he or she will receive a max star rating
function countMovesForRating() {
    gameMoves.innerText++;

    if (gameMoves.innerText > 17) {
        document.querySelector(".stars li:nth-child(1)").classList.add("empty-star");

    }

    if (gameMoves.innerText > 25) {
        document.querySelector(".stars li:nth-child(2)").classList.add("empty-star");
    }
}

//open card and show its symbol
function openAndShowCardSymbol(e) {
    if (e.target.classList === "open") {
        cardsMatchingArr[0].classList.add("not-disabled");
        cardsMatchingArr[1].classList.add("not-disabled");
    }

    if(resetGameTimer === 0) {
        setGameTime();
        resetGameTimer = 1;
    }
    if (cardsMatchingArr.length > 1) {
        return;
    }

    if (e.target.tagName === "LI") {
        turnGameCard(e);
        cardsMatchingArr.push(e.target);
        if(cardsMatchingArr.length === 2) {
            areMatchedCards();
            countMovesForRating();
        }
    }
}

//rating reset
function startRating() {
    document.querySelector(".stars li:nth-child(1)").classList.remove("empty-star");
    document.querySelector(".stars li:nth-child(2)").classList.remove("empty-star");
}