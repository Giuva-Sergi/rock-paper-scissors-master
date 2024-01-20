// MODAL COMPONENT //
const rulesBtn = document.querySelector(".rules-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

[rulesBtn, closeBtn].forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.classList.contains("rules-btn")) {
      modal.setAttribute("data-visible", true);
    } else if (e.target.classList.contains("close-btn")) {
      modal.setAttribute("data-visible", false);
    }
  });
});

// ********************************************** //

// GAME MECHANICS //
const gameBtns = document.querySelectorAll(".game-btn");
const gameSection = document.querySelector(".game-section");
const gameResultsSection = document.querySelector(".game-results");
const choiceContainers = document.querySelectorAll(".choice-container");
const userContainer = document.querySelector(".user__choice-container");
const cpuContainer = document.querySelector(".ai__choice-container");
const resultHeader = document.querySelector(".result__header");
const playAgainContainer = document.querySelector(".play-again-container");
const scoreEl = document.querySelector(".score");
let score = 0;

const outcomes = [
  { choice: "paper", beats: "rock", beatenBy: "scissors" },
  { choice: "rock", beats: "scissors", beatenBy: "paper" },
  { choice: "scissors", beats: "paper", beatenBy: "rock" },
];

const AIChoose = function () {
  let rand = Math.floor(Math.random() * outcomes.length);
  return outcomes[rand].choice;
};

const updateUI = function (choices) {
  choices.forEach((choice, id) => {
    setTimeout(() => {
      choiceContainers[
        id
      ].innerHTML = `<button class="game-btn" data-choice="${choice}"></button>`;
    }, id * 1000);
  });

  gameSection.classList.toggle("hidden");
  gameResultsSection.classList.toggle("hidden");
};

const showWinner = function ([user, cpu]) {
  gameResultsSection.classList.add("show-winner");
  playAgainContainer.classList.toggle("hidden");
  let gameOutcome = outcomes.find((outcome) => outcome.choice === user);
  let winner;
  if (cpu === gameOutcome.beats) {
    resultHeader.innerHTML = "you win";
    userContainer.classList.add("winner");
    winner = "user";
  } else if (cpu === gameOutcome.beatenBy) {
    resultHeader.innerHTML = "you lose";
    cpuContainer.classList.add("winner");
    winner = "cpu";
  } else {
    resultHeader.innerHTML = "draw";
  }
  setTimeout(() => updateScore(winner), 1000);
};

const updateScore = function (winner) {
  if (winner === "user") {
    score++;
  } else if (winner === "cpu") {
    score--;
  }
  if (score <= 0) return;
  scoreEl.innerHTML = score;
};

gameBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let userChoice = button.getAttribute("data-choice");
    let AIChoice = AIChoose();
    updateUI([userChoice, AIChoice]);
    setTimeout(() => showWinner([userChoice, AIChoice]), 2000);
  });
});

// PLAY AGAIN COMPONENT
const playAgainBtn = document.querySelector(".play-again__btn");

playAgainBtn.addEventListener("click", () => {
  choiceContainers.forEach((container) => {
    container.classList.remove("winner");
    container.innerHTML = "";
  });
  gameResultsSection.classList.toggle("hidden");
  gameResultsSection.classList.toggle("show-winner");
  gameSection.classList.toggle("hidden");
  playAgainContainer.classList.toggle("hidden");
});
