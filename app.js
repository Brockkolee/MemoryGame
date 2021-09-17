const button = document.getElementById('button')
const grid = document.getElementById("grid")
const text = document.getElementById("text")
const array = []
const clock = document.querySelector('#timer')
totalCards = 0

//mode selected by clicking the button which determines the number of cards
function easy() {
    totalCards = 12
    getCards(totalCards)
}

function normal() {
    totalCards = 16
    getCards(totalCards)
}

function hard() {
    totalCards = 20
    getCards(totalCards)
}

//Generate the array of cards by create the divs
function getCards(numberOfCards) {

    
    startTime();
    button.style.display = "none"
    text.innerHTML = "Filp the cards and find matching cards"

    if (numberOfCards == 16) {
        grid.style.gridTemplateRows = "repeat(4,1fr)"
        
    } else if (numberOfCards == 20) {
        grid.style.gridTemplateColumns = "repeat(5,1fr)"
    }

    for(i = 0; i < numberOfCards; i++){
        card = document.createElement("div")
        card.className = "card"
        grid.append(card);
}   

    //create matching numbers for each card
    matchingNumber = 1;
    for (i = 1;i < numberOfCards + 1; i++) {
        
        if (i-matchingNumber > matchingNumber) {
            matchingNumber+=1
        }
        array.push(matchingNumber)
    }

    const cards = document.querySelectorAll('.card')

    //shuffle the array of numbers
    shuffle();  

    //use array of shuffled numbers and append to div
    cards.forEach((card,i) => {
        const number = document.createElement('div')
        number.classList.add('number')
        number.innerHTML = array[i];
        number.style.display= "none"
        card.appendChild(number);
        card.addEventListener("click", () => {
            console.log(clickedBox)
            number.style.display= "block"
            clickedBox.push(number.textContent);
            clickedBoxId.push(i)
            console.log(i)
            if (clickedBox.length == 2) {
                checkMatch();
            }
        })
    })

}


//This function shuffles the array 
function shuffle() {
    var i = array.length;
    while (i !== 0) {
        var j = Math.floor(Math.random()*i);
        i--;
        [array[i], array[j]] = [array[j],array[i]];
    }
    return array;
}

let clickedBox = [];
let clickedBoxId = [];
cardsFlipped = 0

//check if the 2 selected cards are matched
function checkMatch() {

    const cards = document.querySelectorAll('.card')
    const numbers = document.querySelectorAll('.number');

    let Id1 = clickedBoxId[0];
    let Id2 = clickedBoxId[1];

    function invis() {
        numbers[Id1].style.display = "none";
        numbers[Id2].style.display = "none";
    }
 
    if (clickedBoxId[0] == clickedBoxId[1]) {
        timer = setTimeout(invis,500)   
    }
    else if (clickedBox[0] == clickedBox[1]) {
        cards[Id1].style.pointerEvents = "none"
        cards[Id2].style.pointerEvents = "none"
        cardsFlipped += 2;

        if (cardsFlipped == totalCards) {
            text.textContent = "You Win! Click to play again!"
            text.addEventListener('click', () => {location.reload()})
            clearInterval(time)
            clock.style.display = "none"

        }

    } else if (clickedBoxId[0] != clickedBoxId[1])  {
       timer = setTimeout(invis,500)
    }

    clickedBox = [];
    clickedBoxId = [];

}

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    time = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        clock.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }

        if (minutes == 0 && timer == 0) {
            text.textContent = "Click to try again!"
            text.addEventListener('click', () => {location.reload()})
            clock.textContent = "Time's Up!"
            clearInterval(time)
        }
    }, 1000);
}

function startTime() {
    var twoMinutes = 60 * 2;
    startTimer(twoMinutes);
};