/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelectorAll('.card');
let cards = Array.from(deck);
let moves = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let starsChildren = stars.children;
let matchedCars = 0;
let tryAgain = document.querySelector('.close-button');
// select all the cards
let deckParents = document.querySelector('.deck');
let openCards = [];

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
//cover all the cards
function coverAllCards() {
    let coveredCards = document.querySelectorAll('.match, .show, .open');
    let coveredCardsArray = Array.from(coveredCards);
    coveredCardsArray.forEach(function(cc) {
        cc.className = 'card';
    });
}

//card match
function match(x, y, openCards) {
    openCards[x].className = 'card match';
    openCards[y].className = 'card match';
    openCards.pop(x);
    openCards.pop(y);
    matchedCars += 2;
    //if the game ad been won, appears the score
    if (matchedCars == 16) {
        setTimeout( function () {
            youWon()
        }, 200);
    }
    return openCards;
}

//card not match
function notMatch(openCards){
    openCards.forEach(function (c) {
        //flip the card
        c.className = 'card flip'
        setTimeout(function (){c.className = 'card';}, 500);
        });
        openCards.length = 0;
        return openCards;
}

//remove the stars when it has benn tried to many times
function removeStars() {
    moves.innerHTML++;
    if (moves.innerHTML == 2) {
        starsChildren[2].firstElementChild.className = 'fa fa-star-o';
    }
    if  (moves.innerHTML == 3) {
        starsChildren[1].firstElementChild.className = 'fa fa-star-o';
    }

    if  (moves.innerHTML == 4) {
        starsChildren[0].firstElementChild.className = 'fa fa-star-o';
    }
}

// Adding stars when restart
function resetStars() {
    for (let i = 0; i < 3; i++) {
        starsChildren[i].firstElementChild.className = 'fa fa-star';
    }
}

//Appers when the game has been won
function youWon() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    tryAgain.addEventListener('click', function () {
        restart();
        modal.style.display = 'none';
    });
}

function newGame() {
    openCards.length = 0;
    cards = shuffle(cards);
    // remove all the card fron the DOM
    while (deckParents.firstChild) {
        deckParents.removeChild(deckParents.firstChild);
    }

    //create a new Document Fragment and adding all the shuffled cards
    const element = document.createDocumentFragment("ul");
    for (let i = 0; i < 16; i++) {
        element.appendChild(cards[i]);
    }
    deckParents.appendChild(element);

    // add event listner
    deckParents.addEventListener('click', function (event) {
        if ((event.target.nodeName === 'LI') && (event.target.className === "card")) {
            //adding one move
            removeStars();
            //uncover the card
            event.target.className = 'card flip';
            //show the selected card
            setTimeout(function() {
                event.target.className += ' open show';
            }, 250);

            //check if the alredy have been choose, if yes the card return covered
            if (openCards.length > 1) {
                openCards = notMatch(openCards);
            }
            //adding to the list the selected card
            openCards.push(event.target);
            //first card
            if (openCards.length > 1) {
                openCards[1].className += ' flip';
                //check if the choosen cards are the same. if yes, they remain uncovered.
                if ((openCards[0].firstElementChild.outerHTML === openCards[1].firstElementChild.outerHTML)) {
                    setTimeout(function() {
                        openCards = match(0, 1, openCards);
                    }, 500)
                } else {
                    //if the two cards are not the same, the game wait the next click to cover the cards and show them
                    //the chosen cards become red and animate it
                    setTimeout(function() {
                        openCards[0].className = 'card open show not-match';
                        openCards[1].className = 'card open show not-match' }, 500);
                }    
            }
        }
    });
}


newGame();

function restart() {
    resetStars();
    moves.innerHTML = 0;
    matchedCars = 0;
    coverAllCards();
    newGame(); 
}

const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', restart);


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
