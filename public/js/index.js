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
  // need to display something that shows how long the answer is
  correctGuesses = [];
  // hintArea.textContent = hints[i]
  tries.textContent = triesCounter;
  prevTriesSpan.textContent = '';
  resultDiv.textContent = 'Pick a letter!'
}

// function renderPrevTries() {
//   prevTriesSpan.textContent = prevTries.join(', ');
// }

function isValidGuess(guess) {
  return guess && !prevTries.includes(guess);
}

function changeTriesCounter() {
  triesCounter--;
  tries.textContent = triesCounter;
  prevTriesSpan.textContent = prevTries.join(', ');

}

// Event Listener aka ~THE GAME~
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const guess = form.guess.value

  if (isValidGuess(guess)) {
    console.log(randomAnswer.indexOf(guess))

    if (randomAnswer.indexOf(guess) >= 0) {
      // somehow add letter guessed to playSpace display area in corresponding position...
      correctGuesses.push(guess); // add to the correct guesses array
      playSpace.textContent = correctGuesses
      console.log(correctGuesses) // show the array
    } else if (randomAnswer.indexOf(guess) === -1 && triesCounter > 1) {
      resultDiv.textContent = 'Try another letter!';
      prevTries.push(guess); //add to list of letters tried
      console.log(prevTries);
      changeTriesCounter();
      // renderPrevTries(); // show on page
    } else if (randomAnswer.indexOf(guess) === -1 && triesCounter === 1) {
      resultDiv.textContent = 'You lose!';
      changeTriesCounter();
    }
  } else {
    resultDiv.textContent = 'Input must be a letter and you must not have already guessed it!'
  }

  form.guess.value = '';
});

startGame();
