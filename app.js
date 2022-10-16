/* Deck of Cars API: https://deckofcardsapi.com */

let deckId;
const cardsDiv = document.querySelector(".cards");
const newDeckButton = document.getElementById("new-deck");
const drawCardsButton = document.getElementById("draw-card");
const headerText = document.getElementById("header-text");
const remainingCards = document.getElementById("remaining-cards");
const computerScoreText = document.getElementById("computer-score");
const playerScoreText = document.getElementById("player-score");
let computerScore = 0;
let playerScore = 0;

drawCardsButton.disabled = true;

const getNewDeck = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      drawCardsButton.disabled = false;
      computerScoreText.style.color = "#fff";
      playerScoreText.style.color = "#fff";
      computerScoreText.classList.remove("winner-text");
      playerScoreText.classList.remove("winner-text");
      remainingCards.textContent = `Remaining cards: 52`;
      computerScore = 0;
      playerScore = 0;
      computerScoreText.textContent = "Computer Score: 0";
      playerScoreText.textContent = "Your Score: 0";
      headerText.textContent = "Game of War!";
      cardsDiv.children[0].innerHTML = `<img src="img/back-of-card.png" class="card-image" alt="card">`;
      cardsDiv.children[1].innerHTML = "";
    });
}

const drawTwoCards = () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      cardsDiv.children[0].innerHTML = `<img src="${data.cards[0].image}" class="card-image" alt="card">`;
      cardsDiv.children[1].innerHTML = `<img src="${data.cards[1].image}" class="card-image" alt="card">`;

      remainingCards.innerHTML = `Remaining cards: ${data.remaining}`;

      determineCardWinner(data.cards[0], data.cards[1]);

       if (data.remaining === 0) {
         drawCardsButton.disabled = true;
         if (computerScore > playerScore) {
            computerScoreText.style.color="#fff100";
            headerText.textContent = "Computer Won! 🤖";
         } else if (computerScore < playerScore) {
            playerScoreText.style.color="#fff100";
            headerText.textContent = "You Won! 🥳";
         } else {
            computerScoreText.style.color = "#fff100";
            playerScoreText.style.color = "#fff100";
            headerText.textContent = "It's a tie!";
         }
       }
    });
}

function determineCardWinner(card1, card2) {
  const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    headerText.textContent = "Computer Wins!";
    computerScoreText.innerHTML = `Computer Score: ${computerScore += 1}`;
  } else if (card1ValueIndex < card2ValueIndex) {
    headerText.textContent = "You Win!";
    playerScoreText.innerHTML = `Your Score: ${playerScore += 1}`;
  } else {
    headerText.textContent = "War!";
  }
}

newDeckButton.addEventListener("click", getNewDeck);
drawCardsButton.addEventListener("click", drawTwoCards);
