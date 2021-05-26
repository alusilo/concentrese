let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let gameFigures = shuffle(items.concat(items));
let cardArray = [];
for (var i = 0; i < gameFigures.length; i++) {
   cardArray.push({
      name: gameFigures[i],
      img: "/static/img/game/" + gameFigures[i] + ".jpg",
   });
}

//define variables and get DOM element

let grid = document.querySelector(".grid"); 
let scoreBoard = document.querySelector(".scoreBoard"); 
let popup = document.querySelector(".popup"); 
let playAgain = document.querySelector(".playAgain"); 
let clickBoard = document.querySelector(".clickBoard"); 
let timeBoard = document.querySelector(".timeBoard"); 
let inputScore = document.getElementById("inputScore");
let inputClicks = document.getElementById("inputClicks");
let inputTime = document.getElementById("inputTime");
let imgs;
let cardsId = []; 
let cardsSelected = [];
let cardsWon = 0; 
let clicks = 0;

let startingTime = Date.now();

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
   playAgain.addEventListener("click", replay);

   //add a click function for images

   imgs = document.querySelectorAll("img");

   Array.from(imgs).forEach(img => 
      img.addEventListener("click", flipCard)
   )
});

//createBoard function

function createBoard(grid, array) { 
   popup.style.display = "none"; 
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
   cardsId.push(selected); 
   this.classList.add("flip"); 
   this.setAttribute("src", cardArray[selected].img); 
   if (cardsId.length === 2) { 
      setTimeout(checkForMatch, 500);
   } 
}

// checkForMatch function

function checkForMatch() { 
   let imgs = document.querySelectorAll("img"); 
   let firstCard = cardsId[0];
   let secondCard = cardsId[1];
   if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) { 
      // alert("you have found a match"); 
      cardsWon += 1; 
      scoreBoard.innerHTML = cardsWon;
      inputScore.value = cardsWon;
      setTimeout(checkWon,500) 
   } else { 
      imgs[firstCard].setAttribute("src", "/static/img/game/blank.jpg");
      imgs[secondCard].setAttribute("src", "/static/img/game/blank.jpg");
      // alert("wrong, please try again");
      imgs[firstCard].classList.remove("flip"); imgs[secondCard].classList.remove("flip"); 
   } 
   cardsSelected = []; 
   cardsId = []; 
   clicks += 1; 
   clickBoard.innerHTML = clicks;
   inputClicks.value = clicks;
}

function checkWon() {
   if (cardsWon == cardArray.length / 2) {
      alert("You won")
      setTimeout(()=> popup.style.display = "flex" ,300); 
   }
}

// The replay function

function replay() { 
   arrangeCard(); 
   grid.innerHTML = "";
   gameFigures = shuffle(items.concat(items));
   cardArray = [];
   for (var i = 0; i < gameFigures.length; i++) {
      cardArray.push({
         name: gameFigures[i],
         img: "/static/img/game/" + gameFigures[i] + ".jpg",
      });
   }
   createBoard(grid, cardArray);
   cardsWon = 0;
   clicks = 0; 
   clickBoard.innerHTML = 0; 
   scoreBoard.innerHTML = 0; 
   popup.style.display = "none";
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