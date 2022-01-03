function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computerPlay() {
  let selections = ["rock", "paper", "scissors"];
  let choice = selections[getRndInteger(0, 2)];
  return choice;
}

function playRound(playerChoice) {
  let compChoice = computerPlay();

  if (
    (compChoice == "rock" && playerChoice == "scissors") ||
    (compChoice == "paper" && playerChoice == "rock") ||
    (compChoice == "scissors" && playerChoice == "paper")
  ) {
    updates.textContent = `Computer chose ${compChoice}. Computer wins this round!`;
    computerScore++;
    compScore.textContent = computerScore;
    roundsPlayed++;
  } else if (
    (compChoice == "scissors" && playerChoice == "rock") ||
    (compChoice == "rock" && playerChoice == "paper") ||
    (compChoice == "paper" && playerChoice == "scissors")
  ) {
    updates.textContent = `Computer chose ${compChoice}. You win this round!`;
    playerScore++;
    myScore.textContent = playerScore;
    roundsPlayed++;
  } else {
    updates.textContent = "It's a tie! Play again";
    tiesAmt++;
    ties.textContent = tiesAmt;
  }
}

function declareWinner(pScore, cScore) {
  if (pScore > cScore) {
    updates.innerHTML = `Here's the final score.<br>You: ${pScore}<br>Computer: ${cScore}<br>You won the game!`;
  } else {
    updates.innerHTML = `Here's the final score.<br>You: ${pScore}<br>Computer: ${cScore}<br>The computer won the game!`;
  }

  //this bit of trickery is to remove the event listeners once the game is complete
  buttons.forEach((button) => {
    // button.removeEventListener("click", clickHandler);
    var new_element = button.cloneNode(true);
    button.parentNode.replaceChild(new_element, button);
  });
}

function clickHandler(button, amountOfRounds) {
  let selection = button.getAttribute("data-selection");
  playRound(selection);
  if (playerScore >= amountOfRounds || computerScore >= amountOfRounds) {
    declareWinner(playerScore, computerScore);
  }
}

function startGame(amountOfRounds) {
  const gameButtons = document.querySelector(".gameButtons");
  gameButtons.classList.add("showGameButtons");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      clickHandler(button, amountOfRounds);
    });
  });
}

//the important game variables
const buttons = document.querySelectorAll(".gameButtons button");
const myScore = document.querySelector("#myScore");
const compScore = document.querySelector("#compScore");
const ties = document.querySelector("#ties");
const updates = document.querySelector(".updates p");
let roundsPlayed = 0;
let playerScore = 0;
let computerScore = 0;
let tiesAmt = 0;

let startButton = document.querySelector(".btn.start");
startButton.addEventListener("click", function () {
  startGame(5);
});
