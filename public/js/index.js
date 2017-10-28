/*jshint esversion: 6 */
// add a closure!

// HTML Elements //
const form = document.forms[0];
const tries = document.getElementById('tries');
const prevTriesSpan = document.getElementById('letters-guessed');
const feedbackDiv = document.getElementById('feedback');
const restartBtn = document.getElementById('restart');
const hintArea = document.getElementById('hint');
const playSpace = document.getElementById('play-space');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const playAgain = document.querySelector('.play-again');

hintArea.addEventListener('click', function() {
  hintArea.textContent = 'Hint: ' + hint;
});
restartBtn.addEventListener('click', startGame);


// Game Data //
const answer = ['mermaid', 'bigfoot', 'unicorn', 'dragon', 'centaur', 'wizard', 'werewolf', 'pegasus', 'troll', 'yeti'];
const hints = ['She lives under the sea', 'Inhabits forests, especially in the Pacific Northwest', 'If this were a tech company, it would be worth more than $1 billion', 'Found in the sky', 'Half and half', '✨✨✨', 'Check the moon', 'Pure white, like the clouds', 'Also found in the comments section', 'Winter is his favorite season'];
let guesses, guessesLeft, prevTries, hint, correctGuesses, hideModal, showModal, pickNum;


// Game Logic //

function chooseAnswer() {
  pickNum = Math.floor(Math.random() * answer.length);
  randomAnswer = answer[pickNum].split('');
  hint = hints[pickNum];
  state = [...randomAnswer].fill(' _ ');
  displayState = [...randomAnswer].fill(' _ ').join('');
  feedbackDiv.textContent = '';
  console.log(randomAnswer);
  console.log(state);
}

function isValidGuess(guess) {
  return guess && guess.length === 1 && guess.match(/[a-z]/i) && !prevTries.includes(guess);
}

changeLives = function() {
  guessesLeft--;
  tries.textContent = guessesLeft;
  prevTriesSpan.textContent = prevTries.join(', ');
};

function checkWin(state) {
  if (state.includes(' _ ')) {
    return false;
  } else {
    var timeoutID = setTimeout(showModal, 800);
    close.addEventListener('click', hideModal);
    playAgain.addEventListener('click', hideModalPlay);
  }
}

function removeAnswer() {
  answer.splice(pickNum, 1);
  if (answer.length === 0) {
    alert("WOW! You beat the whole game.");
    // need to add some kind of congratulations message here - as a modal? With a new game buton
  }
}
hideModal = function() {
  modal.classList.add('hidden');
};
showModal = function() {
  modal.classList.remove('hidden');
};

hideModalPlay = function() {
  modal.classList.add('hidden');
  startGame();
};

function startGame() {
  chooseAnswer();
  removeAnswer();
  guessesLeft = 5;
  prevTries = [];
  correctGuesses = [];
  playSpace.textContent = displayState;
  tries.textContent = guessesLeft;
  prevTriesSpan.textContent = '';
}

// Event Listener aka ~THE GAME~
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const guess = form.guess.value;

  if (isValidGuess(guess)) {

    if (randomAnswer.indexOf(guess) >= 0) {
      // correctGuesses.push(guess); // add to the correct guesses array
      for (let i = 0; i < randomAnswer.length; i++) { // goes through the whole word so duplicate letters work
        if (randomAnswer[i] === guess) { // i is comparing the index and matching against the guess index
          state[i] = guess; // if they match, then replace the same state index with the guess
        }
      }
      console.log(state);
      playSpace.textContent = state.join(' '); // update with the matching letters found
      checkWin(state); // was this the last guess needed for a win?

    } else if (randomAnswer.indexOf(guess) === -1 && guessesLeft > 1) {
      feedbackDiv.textContent = 'That\'s not quite right. Try a different letter!';
      prevTries.push(guess); //add to list of letters tried
      // console.log(prevTries);
      changeLives();
    } else if (randomAnswer.indexOf(guess) === -1 && guessesLeft === 1) {
      changeLives();
      feedbackDiv.innerHTML = `<h1>Oh no, you lost!</h1>`;
      setTimeout(function() {
        startGame();
      }, 4000);
    }
  } else {
    feedbackDiv.textContent = 'Uh oh! Please guess something else. Your guess must be a single letter that you have not previously tried.';
  }
  form.guess.value = '';
});

startGame();
