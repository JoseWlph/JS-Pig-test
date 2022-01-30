'use strict';

//Selecting elements
const elPlayer0 = document.querySelector('.player--0');
const elPlayer1 = document.querySelector('.player--1');
const elScore0 = document.getElementById('score--0');
const elScore1 = document.getElementById('score--1');
const elDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const elCurrent0 = document.getElementById('current--0');
const elCurrent1 = document.getElementById('current--1');

//Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  elScore0.textContent = 0;
  elScore1.textContent = 0;
  elDice.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  elPlayer0.classList.toggle('player--active');
  elPlayer1.classList.toggle('player--active');
};

//Dice roll function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //show dice
    elDice.classList.remove('hidden');
    elDice.src = `dice-${dice}.png`;

    //Checked for rolled 1: Switch player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player score >=100 && finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      elDice.classList.add('hidden');
    }
    //switch to next player
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
