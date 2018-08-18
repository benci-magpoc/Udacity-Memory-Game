// Create Card List
let cardList = Array.from(document.getElementsByClassName('card'));

// Shuffle Function
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

// Shuffle the Card and Put it in to cards
cardList = shuffle(cardList);
const removeElements = (elms) => [...elms].forEach(el => el.remove());
removeElements(document.querySelectorAll(".card"));
const list = document.querySelector('.deck');
for (const cardLists of cardList) {
    list.appendChild(cardLists);
}

// When click restart Button Restart the game
const restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    window.location.reload();
});

// Set Star Count to put in the Final Dialog
let starsCount = 5;

// initial Stars Funciton
function initStars() {
    for (let i = 0; i < 5; i++) {
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

// reduce star rating
function reduceStar() {
    let stars = $(".fa-star");
    $(stars[stars.length - 1]).toggleClass("fa-star fa-star-o");
    starsCount--;
}

// Timer Settings
let started = false;
let timeCount = 0;
let timerPrint;

// starts the timer
function startTimer() {
    timeCount += 1;
    $(".timer").html(timeCount);
    timerPrint = setTimeout(startTimer, 1000);
}

// Check Match count
let matchCount = 0;

// Create initial Stars
initStars();

// Set Moves Count -1 to initial moves Count
let movesCount = -1;

// moves Count Function
function moves() {
    movesCount += 1;
    $('.moves').html(movesCount);
    // When movesCount get each point, start reduceStar() function to reduce stars
    if (movesCount === 14 || movesCount === 16 || movesCount === 20 || movesCount === 24 || movesCount === 28) {
        reduceStar();
    }
    if (movesCount === 34) {
        alert('fail');
        window.location.reload();
    }
}

// Game Reset or Finish Check
function gameProcessCheck() {
    vex.dialog.confirm({
        message: `You finished the Game. You got ${starsCount}/5 stars. You takes ${timeCount} Seconds to finish the game. Do you want to restart the game?`,
        callback: function (value) {
            if (value) {
                window.location.reload();
            } else {
                console.log('My master do not want to play game anymore.');
            }
        }
    })
}

// Ready to click function
$(document).ready(function () {
    let clickhold = [];
    $('.card').click(function () {
        // When Clicks timer start
        if (!started) {
            started = true;
            timeCount = 0;
            timerPrint = setTimeout(startTimer, 1000);
            return;
        }
        // Push the card to compare each other
        clickhold.push($(this).children('.fa').attr('class'));
        console.log(clickhold);
        // Card Open
        $(this).addClass("open show");
        $(this).addClass('disable');
        if (clickhold.length == 2) {
            // Call moves Function to count move and stars.
            moves();
            $('.card').addClass('disable');
            if (clickhold[0] === clickhold[1]) {
                $('.open.show').removeClass("open show").addClass("match");
                console.log('matched');
                // Count matchCount to Finish the game.
                matchCount += 1;
                clickhold = [];
                $('.card').removeClass('disable');
            } else {
                console.log('not matched');
                clickhold = [];
                let ele = $('.card');
                // After 1second flip the card again
                setTimeout(function () {
                    ele.removeClass("open show");
                    $('.card').removeClass('disable');
                }, 1000);
            }
            // Count matchCount to check games are finished
            if (matchCount === 8) {
                // Stop Timer When game finished.
                clearTimeout(timerPrint);
                // Run gameProcessCheck function to popup the dialog
                gameProcessCheck();

            }
        }
    })
});