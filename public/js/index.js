/*jshint esversion: 6 */

// HTML Elements //
const form = document.forms[0];
const tries = document.getElementById('tries');
const prevTriesSpan = document.getElementById('letters-guessed');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const hintArea = document.getElementById('hint');
const playSpace = document.getElementById('play-space');

hintArea.addEventListener('click', function() {
  hintArea.textContent = hint;
});
restartBtn.addEventListener('click', startGame);

// Game Data //
const answer = ['mermaid', 'bigfoot', 'unicorn', 'dragon', 'centaur', 'wizard', 'vampire', 'werewolf', 'pegasus', 'troll', 'yeti', 'leprechaun'];
const hints = ['Lives in water has no feet', 'has large feet', 'one horn', 'breathes fire', 'half man', 'uses a wand', 'drinks blood', 'full moon', 'winged stallion', 'lives under a bridge', 'big ape', 'four leaf clover'];
let guesses, guessesLeft, prevTries, hint, correctGuesses, pickNum;

// Game Logic //

function chooseAnswer() {
  pickNum = Math.floor(Math.random() * answer.length);
  randomAnswer = answer[pickNum].split('');
  hint = hints[pickNum];
  state = [...randomAnswer].fill(' _ ');
  console.log(randomAnswer);
  console.log(state);
}

function isValidGuess(guess) {
  return guess && guess.length === 1 && guess.match(/[a-z]/i) && !prevTries.includes(guess);
}

function changeLives() {
  guessesLeft--;
  tries.textContent = guessesLeft;
  prevTriesSpan.textContent = prevTries.join(', ');
}

function checkWin(state) {
  if (state.includes(' _ ')) {
    return false;
  } else {
    alert('you win');
    restartBtn.classList.remove('hidden');
  }
}

function startGame() {
  chooseAnswer();
  guessesLeft = 5;
  prevTries = [];
  correctGuesses = [];
  playSpace.textContent = state;
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
      // console.log('Correct guesses: ' + correctGuesses); // show the array of correct guesses
      console.log(state);
      playSpace.textContent = state.join(' '); // update with the matching letters found
      checkWin(state); // was this the last guess needed for a win?

    } else if (randomAnswer.indexOf(guess) === -1 && guessesLeft > 1) {
      resultDiv.textContent = 'Try another letter!';
      prevTries.push(guess); //add to list of letters tried
      // console.log(prevTries);
      changeLives();
    } else if (randomAnswer.indexOf(guess) === -1 && guessesLeft === 1) {
      changeLives();
      resultDiv.textContent = 'Oh no, you lost!';
      setTimeout(function() {
        startGame();
      }, 2000);
    }
  } else {
    resultDiv.textContent = 'Please guess something else. Your guess must be a single letter that you have not previously tried.';
  }
  form.guess.value = '';
});

startGame();
