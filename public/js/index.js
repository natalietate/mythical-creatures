// HTML Elements //
const form = document.forms[0];
const tries = document.getElementById('tries');
const prevTriesSpan = document.getElementById('letters-guessed');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const hintArea = document.getElementById('hint');
const playSpace = document.getElementById('play-space');

hintArea.addEventListener('click', function(){hintArea.textContent = hint})
restartBtn.addEventListener('click', startGame);

// Game Data //
let answer = ['mermaid', 'bigfoot', 'unicorn', 'dragon', 'centaur', 'wizard']
let hints = ['Lives in water has no feet', 'has large feet', 'one horn', 'breathes fire', 'half man', 'uses a wand']
let guesses, triesCounter, prevTries, hint, correctGuesses, numberPicker

// Game Logic //
function startGame() {
  triesCounter = 5;
  prevTries = [];

// This is where we select the answer and corresponding hint!
  numberPicker = Math.floor(Math.random() * answer.length)
  randomAnswer = answer[numberPicker].split('')
  hint = hints[numberPicker]

  console.log(randomAnswer)
  state = [].concat(randomAnswer).fill('_');
  console.log(state)
  correctGuesses = [];
  playSpace.textContent = state;
  tries.textContent = triesCounter;
  prevTriesSpan.textContent = '';
  resultDiv.textContent = 'Pick a letter!'
}

function answerLines() {
  console.log(randomAnswer.length)
  playSpace.textContent = randomAnswer.length
}

function isValidGuess(guess) {
  return guess && guess.length === 1 && !prevTries.includes(guess);
}

function changeLives() {
  triesCounter--;
  tries.textContent = triesCounter;
  prevTriesSpan.textContent = prevTries.join(', ');
}

function checkWin(state) {
  if (state.includes('_')) {
    console.log('not yet')
  } else {
    alert('you win')
  }
}


// Event Listener aka ~THE GAME~
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const guess = form.guess.value

  if (isValidGuess(guess)) {

    if (randomAnswer.indexOf(guess) >= 0) {
      correctGuesses.push(guess); // add to the correct guesses array

      /* state.splice(randomAnswer.indexOf(guess), 1, guess); */
      /* original attempt - worked unless you have multiple letters that are the same! Could never figure out a proper loop. */

      for (var i = 0; i < randomAnswer.length; i++) { // go through the whole word so duplicate letters work
        if (randomAnswer[i] === guess) { // i is comparing the index and matching against the guess index
          state[i] = guess // if they match, then the corresponding
          console.log(state) // just keeping track of the loops for myself
        }
      }

      console.log('Correct guesses: ' + correctGuesses) // show the array
      console.log('Index of the correct guess within answer word: ' + randomAnswer.indexOf(guess)) // this is correct, need to use that to add it to the array in the right order
      console.log(state)
      playSpace.textContent = state.join(' ') // update with the matching letters found
      checkWin(state)

    } else if (randomAnswer.indexOf(guess) === -1 && triesCounter > 1) {
      resultDiv.textContent = 'Try another letter!';
      prevTries.push(guess); //add to list of letters tried
      console.log(prevTries);
      changeLives();
    } else if (randomAnswer.indexOf(guess) === -1 && triesCounter === 1) {
      changeLives();
      resultDiv.textContent = 'You lose!';
      restartBtn.classList.remove('hidden');
    }
  } else {
    resultDiv.textContent = 'Input must be a single letter and you must not have already guessed it!'
  }

  form.guess.value = '';
});


startGame();
