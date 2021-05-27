//define variables and get DOM element

let grid = document.querySelector(".grid"); 
let scoreBoard = document.querySelector(".scoreBoard");
let infoTitle = document.querySelector("#info-title"); 
let infoDescription = document.querySelector("#info-description"); 
let popup = document.querySelector(".popup"); 
// let playAgain = document.querySelector(".playAgain"); 
let clickBoard = document.querySelector(".clickBoard"); 
let timeBoard = document.querySelector(".timeBoard"); 
let inputScore = document.getElementById("inputScore");
let inputClicks = document.getElementById("inputClicks");
let inputTime = document.getElementById("inputTime");
let imgs;
let cardsId = [];
let cardsSelected = [];
let infoSelected;
let cardsWon = 0;
let clicks = 0;
let cardArray = [];

let startingTime = Date.now();

$.ajaxSetup({
    async: false
});

cardArray = (function() {
    var result;
    $.getJSON('/static/json/data.json', {}, function(data){
      result = data;
    });
    return result;
})();

arrangeCard();

setInterval(function getTime() {
   if (cardsWon < cardArray.length / 2) {
      inputTime.value = Number(((Date.now() - startingTime)/1000.0).toFixed(2));
      timeBoard.innerHTML = Number(((Date.now() - startingTime)/1000.0).toFixed(2));
   }
}, 100);

document.addEventListener("DOMContentLoaded", function () {
   
   //define functions 
   createBoard(grid, cardArray);
   
   arrangeCard();

   //add a click function for images

   imgs = document.querySelectorAll("img[data-id]");

   Array.from(imgs).forEach(img => {
      img.addEventListener("click", flipCard)
   });

   imgs.forEach((arr, index) => {
      arr.setAttribute("src", cardArray[index].img);
      arr.classList.add("flip");
   }, 2000);

   setTimeout(function(){
      imgs.forEach((arr, index) => {
        arr.setAttribute("src", "/static/img/game/blank.jpg");
        arr.classList.add("flip");
      });
   }, 3000);
});

//createBoard function

function createBoard(grid, array) {
   array.forEach((arr, index) => {
      let img = document.createElement("img");
      img.setAttribute("src", "/static/img/game/blank.jpg");
      img.setAttribute("data-id", index);
      grid.appendChild(img);
   })
}

// arrangeCard function

function arrangeCard() { 
   cardArray.sort(() => 0.5 - Math.random())
}

// flip Card function

function flipCard() {
   let selected = this.dataset.id;
   cardsSelected.push(cardArray[selected].name);
   infoSelected = {
      "title": cardArray[selected].title,
      "description": cardArray[selected].description
   }
   cardsId.push(selected); 
   this.classList.add("flip"); 
   this.setAttribute("src", cardArray[selected].img); 
   if (cardsId.length === 2) { 
      setTimeout(checkForMatch, 500);
   } 
}

// checkForMatch function

function checkForMatch() { 
   let imgs = document.querySelectorAll("img[data-id]");
   let firstCard = cardsId[0];
   let secondCard = cardsId[1];
   if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
      infoTitle.innerHTML = infoSelected.title;
      infoDescription.innerHTML = infoSelected.description;
      imgs[firstCard].removeEventListener("click", flipCard);
      imgs[secondCard].removeEventListener("click", flipCard);
      $('#staticBackdrop').modal("show");
      cardsWon += 1;
      scoreBoard.innerHTML = cardsWon;
      inputScore.value = cardsWon;
      //setTimeout(checkWon, 500) 
   } else { 
      imgs[firstCard].setAttribute("src", "/static/img/game/blank.jpg");
      imgs[secondCard].setAttribute("src", "/static/img/game/blank.jpg");
      imgs[firstCard].classList.remove("flip");
      imgs[secondCard].classList.remove("flip"); 
   } 
   cardsSelected = [];
   cardsId = [];
   clicks += 1;
   clickBoard.innerHTML = clicks;
   inputClicks.value = clicks;
}

function checkWon() {
   if (cardsWon == cardArray.length / 2) {
      $('#congrats').modal("show");
   }
}

// Random function

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}