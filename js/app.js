/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelectorAll('.card');
let cards = Array.from(deck);
let moves = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let starsChildren = stars.children;
let matchedCars = 0;

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
    return openCards;
}

//card not match
function notMatch(openCards){
    openCards.forEach(function (c) {
        c.className = 'card';
        });
        openCards.length = 0;
        return openCards;
}

//remove the stars when it has benn tried to many times
function removeStars() {
    moves.innerHTML++;
    if (moves.innerHTML == 2) {
        console.log(starsChildren[2]);
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
}

function newGame() {
    let openCards = [];
    cards = shuffle(cards);
    // select all the cards
    let deckParents = document.querySelector('.deck');

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
            //show the selected card
            event.target.className = 'card open show';
            //check if the alredy have benn choose, if yes the card return covered
            if (openCards.length > 1) {
                openCards = notMatch(openCards);
            }
            //adding to the list the selected card
            openCards.push(event.target);
                for (let x = 0; x < openCards.length; x++) {

                    for (let y = (x+1); y < openCards.length; y++ ) {
                        //check if the choosen cards are the same. if yes, they remain uncovered.
                        if ((openCards[x].firstElementChild.outerHTML === openCards[y].firstElementChild.outerHTML)) {
                            openCards = match(x, y, openCards);
                            continue;
                        } else {
                            //if the two cards are not the same, the game wait the next click to cover the cards and show them
                            openCards[y].className = 'card open show';
                            //the chosen cards become red and animate it
                            openCards[x].className = 'card open show not-match'
                            openCards[y].className = 'card open show not-match'
                            continue;
                        }
                    }
                }
            
        }
        if (matchedCars == 16) {
            setTimeout( function () {
                youWon()
            }, 800);
        }
    });
}


newGame();
const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', function() {
    resetStars()
    moves.innerHTML = 0;
    coverAllCards();
    newGame();
});


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
