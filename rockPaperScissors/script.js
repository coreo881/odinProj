function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computerPlay() {
  let choice = getRndInteger(1, 3);

  if (choice == 1) {
    return "Rock".toLowerCase();
  } else if (choice == 2) {
    return "Paper".toLowerCase();
  } else {
    return "Scissors".toLowerCase();
  }
}

function playerPlay() {
  let choice = prompt("Rock, paper, scissors?").toLowerCase();
  while (
    !choice ||
    (choice !== "rock" && choice !== "paper" && choice !== "scissors")
  ) {
    choice = prompt(
      "Invalid input! Please choose Rock, paper, or scissors"
    ).toLowerCase();
  }
  return choice;
}

function playRound(compChoice, playerChoice) {
  compChoice = computerPlay();
  playerChoice = playerPlay();

  if (
    (compChoice == "rock" && playerChoice == "scissors") ||
    (compChoice == "paper" && playerChoice == "rock") ||
    (compChoice == "scissors" && playerChoice == "paper")
  ) {
    return [`Computer chose ${compChoice}. Computer wins this round!`, 2];
  } else if (
    (compChoice == "scissors" && playerChoice == "rock") ||
    (compChoice == "rock" && playerChoice == "paper") ||
    (compChoice == "paper" && playerChoice == "scissors")
  ) {
    return [`Computer chose ${compChoice}. You win this round!`, 1];
  } else {
    console.log("It's a tie! Play again");
    return playRound();
  }
}

function game() {
  //declare the score keeping variables
  let playerScore = 0;
  let computerScore = 0;

  //play 5 rounds
  for (let index = 0; index < 5; index++) {
    let outcome = playRound();
    // display the result of that round
    console.log(`Game ${index + 1}: ${outcome[0]}`);

    if (outcome[1] == 1) {
      playerScore++;
    } else if (outcome[1] == 2) {
      computerScore++;
    }
  }

  if (playerScore > computerScore) {
    console.log(
      `Here's the final score.\nYou: ${playerScore}\nComputer: ${computerScore}\nYou won the game!`
    );
  } else {
    console.log(
      `Here's the final score.\nYou: ${playerScore}\nComputer: ${computerScore}\nThe computer won the game!`
    );
  }
}

game();
