/*jshint esversion: 6 */

(function() {

  // HTML Elements //
  const form = document.forms[0];
  const tries = document.getElementById('tries');
  const prevTriesSpan = document.getElementById('letters-guessed');
  const feedbackDiv = document.getElementById('feedback');
  const hintArea = document.getElementById('hint');
  const playSpace = document.getElementById('play-space');
  const modal = document.querySelector('.modal');
  const close = document.querySelector('.close');
  const playAgain = document.querySelector('.play-again');

  // Event Listener //
  hintArea.addEventListener('click', function() {
    hintArea.textContent = 'Hint: ' + hint;
  });

  // Game Data //
  const answer = ['mermaid', 'bigfoot', 'unicorn', 'dragon', 'centaur', 'wizard', 'werewolf', 'pegasus', 'troll', 'yeti'];
  const hints = ['She lives under the sea', 'Inhabits forests, especially in the Pacific Northwest', 'If this were a tech company, it would be worth more than $1 billion', 'Fire-breathing', 'Half man...', '✨✨✨', 'Check the moon', 'Also a classic Nike running shoes style', 'Can also be found in the comments section', 'Winter is his favorite season'];
  let guesses, guessesLeft, prevTries, hint, pickNum;

  // Game Logic //

  //Pick an answer and corresponding hint from the array
  function chooseAnswer() {
    pickNum = Math.floor(Math.random() * answer.length);
    randomAnswer = answer[pickNum].split('');
    hint = hints[pickNum];
    state = [...randomAnswer].fill(' _ '); // this displays w/ commas
    displayState = [...randomAnswer].fill(' _ ').join(''); // this makes it display nicely
    feedbackDiv.textContent = '';
    // console.log(randomAnswer);
    // console.log(state);
  }

  // Remove chosen answer from the array of answers so player doesn't get repeats during the game, then display a game over message
  function removeAnswer() {
    answer.splice(pickNum, 1);
    if (answer.length === 0) {
      alert("WOW! You beat the whole game. Nicely done.");
      // Need to add some kind of congratulations message here as a modal. With play again option
    }
  }

  // Used to ensure guess is a unique letter
  function isValidGuess(guess) {
    return guess && guess.length === 1 && guess.match(/[a-z]/) && !prevTries.includes(guess);
  }

  // Updates the guesses left counter and adds incorrect letter to list of letters guessed
  changeLives = function() {
    guessesLeft--;
    tries.textContent = guessesLeft;
    prevTriesSpan.textContent = prevTries.join(', ');
  };

  // Check if player has won the round, if so display the win modal
  function checkWin(state) {
    if (state.includes(' _ ')) {
      return false;
    } else {
      var timeoutID = setTimeout(showModal, 800);
      close.addEventListener('click', hideModal);
      playAgain.addEventListener('click', hideModalPlay);
    }
  }

  // Win modal things
  showModal = function() {
    modal.classList.remove('hidden');
  };

  hideModal = function() {
    modal.classList.add('hidden');
  };

  hideModalPlay = function() {
    modal.classList.add('hidden');
    startGame();
  };

  // Used to return to the beginning and start new round
  function startGame() {
    chooseAnswer();
    removeAnswer();
    guessesLeft = 5;
    prevTries = [];
    hintArea.innerHTML = `<button>Hint, please!</button>`;
    playSpace.textContent = displayState;
    tries.textContent = guessesLeft;
    prevTriesSpan.textContent = '';
  }

  // The Game
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const guess = form.guess.value;
    if (isValidGuess(guess)) {
      if (randomAnswer.indexOf(guess) >= 0) {
        for (let i = 0; i < randomAnswer.length; i++) {
          if (randomAnswer[i] === guess) {
            state[i] = guess;
          }
        }
        // console.log(state);
        playSpace.textContent = state.join(' ');
        checkWin(state);
      } else if (randomAnswer.indexOf(guess) === -1 && guessesLeft > 1) {
        feedbackDiv.textContent = 'That\'s not quite right. Try a different letter!';
        prevTries.push(guess);
        // The feedback will only display for a few seconds
        setTimeout(function() {
          feedbackDiv.textContent = '';
        }, 3000);
        changeLives();
      } else if (randomAnswer.indexOf(guess) === -1 && guessesLeft === 1) {
        changeLives();
        // Displays feedback and then automatically restarts the game
        feedbackDiv.innerHTML = `<h1>Oh no, you lost!</h1>`;
        setTimeout(function() {
          startGame();
        }, 4000);
      }
    } else {
      feedbackDiv.textContent = 'Uh oh! Please guess something else. Your guess must be a single lowercase letter that you have not previously tried.';
    }
    form.guess.value = '';
  });

  startGame();

})();
