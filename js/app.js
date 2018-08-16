/*
 * Create a list that holds all of your cards
 */
let cardList = Array.from(document.getElementsByClassName('card'));
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
// $(document).ready(function () {
//     $('.card').click(function () {
//         // Card Open
//         $(this).addClass("open show");

//         // Save First Click i element className
//         let firstclick = ($(this).children('.fa'));
//         console.log(firstclick);
//         // Save Second Click i element className
//         let secondclick = ($(this).children('.fa'));
//         console.log(secondclick);

//         // compare first click element and second element to match card
//         if (firstclick === secondclick) {
//             // if match each other change card class to "card match"
//             $(this).removeClass("open show");
//             $(this).addClass("match")
//         } else {
//             // if not match each other close card after 2 seconds.
//             let ele = $(this);
//             setTimeout(function () {
//                 ele.removeClass("open show");
//             }, 2000);
//         }
//     })
// });

function initStars() {
    for (let i = 0; i < 5; i++) {
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

// reduce star rating
function reduceStar() {
    let stars = $(".fa-star");
    $(stars[stars.length - 1]).toggleClass("fa-star fa-star-o");
}

// Create initial Stars
initStars();

let movesCount = -1;

function moves() {
    movesCount += 1;
    $('.moves').html(movesCount);
    if (movesCount === 14 || movesCount === 20 || movesCount === 25 || movesCount === 30 || movesCount === 34) {
        reduceStar();
    }
    if (movesCount === 34) {
        alert('fail');
        window.location.reload();
    }
}

$(document).ready(function () {
    let clickhold = [];
    $('.card').click(function () {
        // Call moves Function to count move and stars.
        
        // Push the card to compare each other
        clickhold.push($(this).children('.fa').attr('class'));
        console.log(clickhold);

        // Card Open
        $(this).addClass("open show");
        if (clickhold.length == 2) {
            moves();
            if (clickhold[0] === clickhold[1]) {
                $('.open.show').removeClass("open show").addClass("match");
                console.log('matched');
                clickhold = [];
            } else {
                console.log('not matched');
                clickhold = [];
                let ele = $('.card');
                setTimeout(function () {
                    ele.removeClass("open show");
                }, 2000);
            }
        }
    })
});