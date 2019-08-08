const playingCardDeckType = ["Hearts", "Spades", "Clubs", "Diamonds"];
const value = [
  "Ace",
  "King",
  "Queen",
  "Jack",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10"
];

const deck = [];

const createDeckShuffle = () => {
  console.log("Shuffle!");
  for (let typeIndex = 0; typeIndex < playingCardDeckType.length; typeIndex++) {
    for (let valuesIndex = 0; valuesIndex < value.length; valuesIndex++) {
      //store values of cards into variables
      const newType = playingCardDeckType[typeIndex];
      const newValue = value[valuesIndex];

      //combines both arrays to create a full deck
      deck.push(`${newValue} ${"of"} ${newType}`);
    }
  }

  for (let i = deck.length - 1; i >= 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};
const deal = () => {
  document.querySelector(".card").textContent = deck.pop();
  console.log("Player One pulled card!", deck.length);
};

const deal2 = () => {
  document.querySelector(".card-2").textContent = deck.pop();
  console.log("Player Two pulled card!", deck.length);
};

document.querySelector(".pull-card").addEventListener("click", deal);
document.querySelector(".pull-card").addEventListener("click", deal2);
document.addEventListener("DOMContentLoaded", createDeckShuffle);
