const tabButtons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    tabButtons.forEach((btn) => {
      btn.setAttribute("aria-selected", String(btn === button));
    });
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

const diceArt = {
  1: [
    "+-------+",
    "|       |",
    "|   o   |",
    "|       |",
    "+-------+"
  ],
  2: [
    "+-------+",
    "| o     |",
    "|       |",
    "|     o |",
    "+-------+"
  ],
  3: [
    "+-------+",
    "| o     |",
    "|   o   |",
    "|     o |",
    "+-------+"
  ],
  4: [
    "+-------+",
    "| o   o |",
    "|       |",
    "| o   o |",
    "+-------+"
  ],
  5: [
    "+-------+",
    "| o   o |",
    "|   o   |",
    "| o   o |",
    "+-------+"
  ],
  6: [
    "+-------+",
    "| o   o |",
    "| o   o |",
    "| o   o |",
    "+-------+"
  ]
};

const diceOutput = document.getElementById("dice-output");
const rollBtn = document.getElementById("roll-btn");

function rollDie() {
  const value = Math.floor(Math.random() * 6) + 1;
  diceOutput.textContent = `You rolled: ${value}\n\n${diceArt[value].join("\n")}`;
}

rollBtn.addEventListener("click", rollDie);
rollDie();

const suits = [
  { symbol: "♠", name: "Spades" },
  { symbol: "♥", name: "Hearts" },
  { symbol: "♦", name: "Diamonds" },
  { symbol: "♣", name: "Clubs" }
];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function buildDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

function drawUniqueCards(count) {
  const deck = buildDeck();
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, count);
}

function cardToAscii(card) {
  const top = String(card.rank).padEnd(2, " ");
  const bottom = String(card.rank).padStart(2, " ");
  return [
    "┌─────────┐",
    `|${top}       |`,
    "|         |",
    `|    ${card.suit.symbol}    |`,
    "|         |",
    `|       ${bottom}|`,
    "└─────────┘",
    `${card.rank} of ${card.suit.name}`
  ].join("\n");
}

const drawBtn = document.getElementById("draw-btn");
const drawCountInput = document.getElementById("draw-count");
const cardsOutput = document.getElementById("cards-output");

function drawCards() {
  const count = Number.parseInt(drawCountInput.value, 10);
  if (!Number.isInteger(count) || count < 1 || count > 52) {
    cardsOutput.innerHTML = '<span class="error">Please enter a number between 1 and 52.</span>';
    return;
  }
  const drawn = drawUniqueCards(count);
  cardsOutput.textContent = drawn.map(cardToAscii).join("\n\n");
}

drawBtn.addEventListener("click", drawCards);
drawCards();
