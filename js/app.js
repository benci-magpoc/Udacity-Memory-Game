/*
 * Create a list that holds all of your cards
 */
let cardList = Array.from(document.getElementsByClassName('card'));
let stars = 3;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

cardList = shuffle(cardList);
console.log(cardList);

const removeElements = (elms) => [...elms].forEach(el => el.remove());
removeElements(document.querySelectorAll(".card"));


const list = document.querySelector('.deck');
for (const cardLists of cardList) {
    list.appendChild(cardLists);
}

const restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    window.location.reload();
})

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

// card match - card open show
const clicks = document.querySelectorAll('li');
for (let click of clicks) {
    click.addEventListener('click', function () {
            alert(document.querySelector('i').className);
        }
    );
}