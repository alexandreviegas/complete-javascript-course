/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice0, lastDice1, winningScore;
var dice0DOM = document.getElementById('dice-0');
var dice1DOM = document.getElementById('dice-1');
var winningScoreInputDOM = document.getElementById('winning-score-input');

reset();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        var dice0 = Math.floor(Math.random() * 6) + 1;
        roundScore += dice0;
        dice0DOM.style.display = 'block';
        dice0DOM.src = 'dice-' + dice0 + '.png';

        var dice1 = Math.floor(Math.random() * 6) + 1;
        roundScore += dice1;
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';

        document.getElementById('current-' + activePlayer ).textContent = roundScore;
        if (dice0 === 1 || dice1 === 1) {
            changePlayer();
        }else if ((dice0 === 6 && lastDice0 === 6) || (dice1 === 6 && lastDice1 === 6) || (dice0 === 6 && dice1 === 6)) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer ).textContent = scores[activePlayer];
            changePlayer();
        }
        document.getElementById('current-' + activePlayer ).textContent = roundScore;

        lastDice0 = dice0;
        lastDice1 = dice0;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer ).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer ).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            winningScoreInputDOM.disabled = true;
            gamePlaying = false;
        }else {
            changePlayer();
        }
    }
});

winningScoreInputDOM.addEventListener('blur', function(){
    setWinningScore(this.value);
});

function changePlayer() {
    roundScore = 0;
    dice0DOM.style.display = 'none';
    dice1DOM.style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('current-' + activePlayer ).textContent = roundScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    lastDice0 = 0;
    lastDice1 = 0;

}

function setWinningScore(value) {
    winningScore = value;
    winningScoreInputDOM.value = winningScore;
}

function reset() {
    scores = [0, 0];
    roundScore = 0;
    lastDice0 = 0;
    lastDice1 = 0;
    activePlayer = 0;
    gamePlaying = true;
    setWinningScore(100);
    winningScoreInputDOM.disabled = false;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    dice0DOM.style.display = 'none';
    dice1DOM.style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', reset);