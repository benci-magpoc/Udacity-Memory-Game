/*
 * Create a list that holds all of your cards
 */
let cardList = Array.from(document.getElementsByClassName('card'));

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
});

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

// Timer Settings
let started = false;
let timeCount = 0;
let timerPrint;
let popup ='<div id="ex1" class="modal"><p>Thanks for clicking. That felt good.</p><a href="#" rel="modal:close">Close</a></div>';
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

let movesCount = -1;

function moves() {
    movesCount += 1;
    $('.moves').html(movesCount);
    if (movesCount === 12 || movesCount === 16 || movesCount === 20 || movesCount === 24 || movesCount === 28) {
        reduceStar();
    }
    if (movesCount === 34) {
        alert('fail');
        window.location.reload();
    }
}

// Game Reset or Finish Check
function gameProcessCheck() {
    $('.popup').html(popup);
    // var r = confirm("게임을 다시 시작하시겠습니까? 당신의 시간은" + timerPrint);
    // if (r == true) {
    //     window.location.reload();
    // } else {
    //     alert('게임이 끝났습니다');
    // }
}

$(document).ready(function () {

    let clickhold = [];
    $('.card').click(function () {

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
                setTimeout(function () {
                    ele.removeClass("open show");
                    $('.card').removeClass('disable');
                }, 1000);

            }
            if (matchCount === 1) {
                gameProcessCheck();
            }
        }
    })
});