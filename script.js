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

gameBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let userChoice = button.getAttribute("data-choice");
    let AIChoice = AIChoose();
    updateUI([userChoice, AIChoice]);

    // let gameOutcome = outcomes.find((outcome) => outcome.choice === userChoice);
    // console.log(gameOutcome.beats);
    // console.log(gameOutcome.beatenBy);
  });
});
