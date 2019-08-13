const state = {
  suits: ["Hearts", "Spades", "Clubs", "Diamonds"],
  ranks: [
    { name: "Ace", value: 11 },
    { name: "King", value: 10 },
    { name: "Queen", value: 10 },
    { name: "Jack", value: 10 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 }
  ],

  deck: [],
  playerHand: [],
  dealerHand: []
};

const main = () => {
  createDeck();
  shuffleDeck();
  dealPlayerHand();
  dealDealerHand();
  playerHandTotal();
  dealerHandTotal();
};

const createDeck = () => {
  for (let suitIndex = 0; suitIndex < state.suits.length; suitIndex++) {
    const suit = state.suits[suitIndex];
    for (let rankIndex = 0; rankIndex < state.ranks.length; rankIndex++) {
      const rank = state.ranks[rankIndex];
      state.deck.push({
        rank: rank.name,
        value: rank.value,
        suit: suit
      });
    }
  }
  console.log(state.deck);
};

const shuffleDeck = () => {
  console.log("Shuffling!");
  for (let i = state.deck.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i);
    const temp = state.deck[random];
    state.deck[random] = state.deck[i];
    state.deck[i] = temp;
  }
  console.log(state.deck);
};

//Automatic Deal Card Function - Player

const dealPlayerHand = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = state.deck.pop();
    state.playerHand.push(dealtCard);
    let cardElement = document.createElement("img");
    cardElement.src =
      "/images/" +
      state.playerHand[i].rank +
      "_of_" +
      state.playerHand[i].suit +
      ".svg";
    document.querySelector(".card").appendChild(cardElement);
  }
  console.log("Player pulled card!", state.deck.length);
};

//Automatic Deal Card Function - Dealer

const dealDealerHand = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = state.deck.pop();
    state.dealerHand.push(dealtCard);
    let cardElement = document.createElement("img");
    cardElement.src =
      "/images/" +
      state.dealerHand[i].rank +
      "_of_" +
      state.dealerHand[i].suit +
      ".svg";
    document.querySelector(".card-2").appendChild(cardElement);
    // document.querySelector(".card-2").textContent = `${dealtCard.rank} of ${
    //   dealtCard.suit
    // }`;]
  }
  console.log("Dealer pulled card!", state.deck.length);
};

const playerHandTotal = () => {
  const playerTotal = state.playerHand.reduce((runningTotal, card) => {
    return runningTotal + card.value;
  }, 0);

  document.querySelector(".total").textContent = playerTotal;

  // for (let i = 0; i < state.playerHand.length; i++) {
  //   const card = state.playerHand[i];
  //   if (playerTotal) {
  //     playerTotal += card.value;
  //   } else {
  //     playerTotal = card.value;
  //   }
  //   document.querySelector(".total").textContent = playerTotal;
  // }
  if (playerTotal > 21) {
    console.log("Player loses!");
    document.querySelector(".player").textContent = "Player loses!";
    document.querySelector(".player-hit").disabled = true;
    document.querySelector(".stand").disabled = true;
  }

  if (playerTotal == 21) {
    console.log("Player wins!");
    document.querySelector(".player").textContent = "Player wins!";
    document.querySelector(".player-hit").disabled = true;
    document.querySelector(".stand").disabled = true;
  }
  console.log("Player hand total", playerTotal);
};

const hitPlayerHand = () => {
  for (let i = 0; i < 1; i++) {
    let hitCard = state.deck.pop();
    state.playerHand.push(hitCard);
    playerHandTotal();
    let cardElement = document.createElement("img");
    cardElement.src =
      "/images/" +
      state.dealerHand[i].rank +
      "_of_" +
      state.dealerHand[i].suit +
      ".svg";
    document.querySelector(".card").appendChild(cardElement);
  }
  console.log("Player hit card!", state.deck.length);
};

const dealerHandTotal = () => {
  let dealerTotal;
  for (let i = 0; i < state.dealerHand.length; i++) {
    const card = state.dealerHand[i];
    if (dealerTotal) {
      dealerTotal += card.value;
    } else {
      dealerTotal = card.value;
    }
    document.querySelector(".total-2").textContent = dealerTotal;
  }
  if (dealerTotal > 21) {
    console.log("Player loses!");
    document.querySelector(".dealer").textContent = "Dealer loses!";
  }

  if (dealerTotal == 21) {
    console.log("Player wins!");
    document.querySelector(".dealer").textContent = "Dealer wins!";
  }
  console.log("Dealer hand total", dealerTotal);
};

//Stand Function

const stand = () => {
  for (let i = 0; i < 1; i++) {
    let standCard = state.deck.pop();
    state.dealerHand.push(standCard);
    dealerHandTotal();
    let cardElement = document.createElement("img");
    cardElement.src =
      "/images/" +
      state.dealerHand[i].rank +
      "_of_" +
      state.dealerHand[i].suit +
      ".svg";
    document.querySelector(".card-2").appendChild(cardElement);

    if (dealerHandTotal < 16) {
      state.deck.pop();
    }
    // if (state.rank.value > 21) {
    //   console.log("Dealer loses!");
    //   document.querySelector(".player-hit").disabled = true;
    //   document.querySelector(".stand").disabled = true;
  }
};

// const deal = () => {
//   document.querySelector(".card").textContent = state.deck.pop();
//   console.log("Player One pulled card!", state.deck.length);
// };

// const deal2 = () => {
//   document.querySelector(".card-2").textContent = state.deck.pop();
//   console.log("Player Two pulled card!", state.deck.length);
// };

// document.querySelector(".pull-card").addEventListener("click", dealPlayerHand);

//Other Possibility:
// let card.src = document.createElement("./images/cards/${suit}_of_${rank}.svg")

document.querySelector(".stand").addEventListener("click", stand);
document.querySelector(".player-hit").addEventListener("click", hitPlayerHand);
document.addEventListener("DOMContentLoaded", main);
