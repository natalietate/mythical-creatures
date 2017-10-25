// HTML Elements //
const form = document.forms[0];
const tries = document.getElementById('tries');
const prevTriesSpan = document.getElementById('letters-guessed');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const hintArea = document.getElementById('hint');
const playSpace = document.getElementById('play-space');

// Game Data //
let answer = ['mermaid', 'bigfoot', 'unicorn', 'dragon', 'centaur', 'wizard']
let hints = ['Lives in water has no feet', 'has large feet', 'one horn', 'breathes fire', 'half man', 'uses a wand']
let guesses, triesCounter, prevTries, hint, correctGuesses
// i = 0


// Game Logic //
function startGame() {
  triesCounter = 5;
  prevTries = [];
  randomAnswer = answer[Math.floor(Math.random() * answer.length)].split('')
  console.log(randomAnswer)
  state = [].concat(randomAnswer).fill('_');
  console.log(state)
  correctGuesses = [];
  playSpace.textContent = state;
  // hintArea.textContent = hints[i]
  tries.textContent = triesCounter;
  prevTriesSpan.textContent = '';
  resultDiv.textContent = 'Pick a letter!'
}

function answerLines() {
  console.log(randomAnswer.length)
  playSpace.textContent = randomAnswer.length
}

function isValidGuess(guess) {
  return guess && !prevTries.includes(guess); // consider adding guess.length === 1
}

function changeLives() {
  triesCounter--;
  tries.textContent = triesCounter;
  prevTriesSpan.textContent = prevTries.join(', ');
}

// BJ says - Look at while loop  -> while the index of the guess is greater than or equal to zero,
//go through and compare it to the index of the state. when it matches, stop
// While loop -> define your variable outside of the loop - while x = 0 (and it’ll change immediately)
// Could swap your state array with your answer array

// i = 0
// compare randomAnswer.indexOf(guess) to state.indexOf(i)
// do they match?
//   Yes, STOP
//   No, i++ and try again
// Compare again until a match is found

// Once match is found - need to SWITCH the value of randomAnswer.indexOf(guess) with the corresponding state.indexOf(i)
// you could SPLICE

// splice: index of your guess, one element, and your guess itself


// Event Listener aka ~THE GAME~
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const guess = form.guess.value

  if (isValidGuess(guess)) {
    // console.log(randomAnswer.indexOf(guess)) // what we're using to decide if it is right or wrong -1 means wrong

    if (randomAnswer.indexOf(guess) >= 0) {
      correctGuesses.push(guess); // add to the correct guesses array
      // playSpace.textContent = correctGuesses.join(' ');
      state.splice(randomAnswer.indexOf(guess), 1, guess);
      console.log('Correct guesses: '+ correctGuesses) // show the array
      console.log('Index of the correct guess within answer word: ' + randomAnswer.indexOf(guess)) // this is correct, need to use that to add it to the array in the right order
      console.log(state)
      playSpace.textContent = state
    } else if (randomAnswer.indexOf(guess) === -1 && triesCounter > 1) {
      resultDiv.textContent = 'Try another letter!';
      prevTries.push(guess); //add to list of letters tried
      console.log(prevTries);
      changeLives();
    } else if (randomAnswer.indexOf(guess) === -1 && triesCounter === 1) {
      resultDiv.textContent = 'You lose!';
      changeLives();
    }
  } else {
    resultDiv.textContent = 'Input must be a letter and you must not have already guessed it!'
  }

  form.guess.value = '';
});

startGame();
