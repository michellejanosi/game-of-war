/* Deck of Cars API: https://deckofcardsapi.com */

let deckId;
const cardsDiv = document.querySelector(".cards");
const newDeckButton = document.getElementById("new-deck");
const drawCardsButton = document.getElementById("draw-card");
const headerText = document.getElementById("header-text");
const remainingCards = document.getElementById("remaining-cards");

const getNewDeck = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      deckId = data.deck_id;
    });
}

const drawTwoCards = () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.cards);
      console.log(data.remaining)
      cardsDiv.children[0].innerHTML = `<img src="${data.cards[0].image}" class="card-image" alt="card">`;
      cardsDiv.children[1].innerHTML = `<img src="${data.cards[1].image}" class="card-image" alt="card">`;

      remainingCards.innerHTML = `Remaining cards: ${data.remaining}`;

      determineCardWinner(data.cards[0], data.cards[1]);
    });
}

function determineCardWinner(card1, card2) {
  const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  console.log("card 1:", card1ValueIndex);
  console.log("card 2:", card2ValueIndex);

  if (card1ValueIndex > card2ValueIndex) {
    headerText.textContent = "Computer Wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    headerText.textContent = "You Win!";
  } else {
    headerText.textContent = "War!";
  }
}

newDeckButton.addEventListener("click", getNewDeck);
drawCardsButton.addEventListener("click", drawTwoCards);
