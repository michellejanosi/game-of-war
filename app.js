/* Deck of Cars API: https://deckofcardsapi.com */
let deckId;
const cardsDiv = document.querySelector(".cards");

const newDeckButton = document.getElementById("new-deck");
const drawCardsButton = document.getElementById("draw-card");

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
      data.cards.forEach(card => {
        cardsDiv.innerHTML += `<img src="${card.image}" class="card-image" alt="card">`
      });
    });
}

newDeckButton.addEventListener("click", getNewDeck);
drawCardsButton.addEventListener("click", drawTwoCards);
