/* Deck of Cars API: https://deckofcardsapi.com */
let deckId;

const newDeckButton = document.getElementById("new-deck");
const getNewDeck = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
}

newDeckButton.addEventListener("click", getNewDeck);
