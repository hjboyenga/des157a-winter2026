(function () {
	"use strict";
	console.log('reading js');
/* I never wanna look at this JavaScript every again... I actually wanted to put my head through a wall.
 I used some StackOverflow conversations and Claude to find and fix some of the errors. This took a lot of work, I hope you enjoy.*/
	const splashScreen = document.querySelector('#splash-screen');
	const homeScreen = document.querySelector('#home-screen');
	const nameScreen = document.querySelector('#name-screen');
	const gameScreen = document.querySelector('#game-screen');
	const winScreen = document.querySelector('#win-screen');

	const startBtn = document.querySelector('#start-btn');
	const playBtn = document.querySelector('#play-btn');
	const restartBtn = document.querySelector('#restart-btn');

	const name1Input = document.querySelector('#name1');
	const name2Input = document.querySelector('#name2');

	// Scoreboard
	const p1NameLabel = document.querySelector('#p1-name-label');
	const p2NameLabel = document.querySelector('#p2-name-label');
	const p1ScoreEl = document.querySelector('#p1-score');
	const p2ScoreEl = document.querySelector('#p2-score');
	const scorePanel1 = document.querySelector('#score-panel-1');
	const scorePanel2 = document.querySelector('#score-panel-2');
	const turnIndicator = document.querySelector('#turn-indicator');

	// Game area
	const die1El = document.querySelector('#die1');
	const die2El = document.querySelector('#die2');
	const rollResult = document.querySelector('#roll-result');
	const messageBox = document.querySelector('#message-box');
	const rollBtn = document.querySelector('#roll-btn');

	// Runner images
	const runner1El = document.querySelector('#runner1');
	const runner2El = document.querySelector('#runner2');
	const r1LabelEl = document.querySelector('#r1-label');
	const r2LabelEl = document.querySelector('#r2-label');

	// Win screen
	const winTitle = document.querySelector('#win-title');
	const winSub = document.querySelector('#win-sub');

	// Audio elements
	const soundRunning = document.querySelector('#sound-running');
	const soundWinEl = document.querySelector('#sound-win');
	const soundBg = document.querySelector('#sound-bg');

	/*Section 2: Runner Image Files, so they can switch between each file*/
	const runnerImages = {
		player1: {
			still: 'images/blueStandingMan.svg',   
			run:   'images/Blue-Running-Man-1.gif'       
		},
		player2: {
			still: 'images/redStandingMan.svg',  
			run:   'images/Red-Running-Man-1.gif'       
		}
	};

	/*Section 3: Game Date*/
	const gameData = {
		dice: [
			'images/die1.svg',
			'images/die2.svg',
			'images/die3.svg',
			'images/die4.svg',
			'images/die5.svg',
			'images/die6.svg'
		],
		players: ['Player 1', 'Player 2'],
		score:   [0, 0],
		roll1:   0,
		roll2:   0,
		rollSum: 0,
		index:   0,      
		gameEnd: 40      
	};


	/*Section 4: Sound Function*/

	// Play the running sound (resets it first so it always starts at the begining)
	function playRunningSound() {
		soundRunning.currentTime = 0;   // rewind to the beginning
		soundRunning.play();
	}

	// Stop the running sound
	function stopRunningSound() {
		soundRunning.pause();
		soundRunning.currentTime = 0;
	}

	// Play the win sound
	function playBgMusic() {
    soundBg.currentTime = 0;
    soundBg.play();
}

function playWinSound() {
    // Stop background music first
    soundBg.pause();
    soundBg.currentTime = 0;

    soundWinEl.currentTime = 0;
    soundWinEl.play();

    // When the victory theme finishes, switch back to background music
    soundWinEl.addEventListener('ended', function () {
        playBgMusic();
    });
}
	/* 
	   Section 5: Runner GIF / Still Swap
	   showRunnerMoving - swaps the runner's image to the GIF
	   showRunnerStill - swaps it back to the still JPEG
 	*/

	function showRunnerMoving(playerIndex) {
		if (playerIndex === 0) {
			runner1El.src = runnerImages.player1.run;
		
		} else {
			runner2El.src = runnerImages.player2.run;
			
		}
	}

	function showRunnerStill(playerIndex) {
		if (playerIndex === 0) {
			runner1El.src = runnerImages.player1.still;
			
		} else {
			runner2El.src = runnerImages.player2.still;
			
		}
	}
	/* Section 6: Show / Hide screens
	   Removes "active" from all screens, then adds it to one
	 */
	function showScreen(screen) {
		splashScreen.classList.remove('active');
		homeScreen.classList.remove('active');
		nameScreen.classList.remove('active');
		gameScreen.classList.remove('active');
		winScreen.classList.remove('active');
		screen.classList.add('active');
	}
	/*
	   Splash Screen - click anywhere to go to home screen
	   I ended up adding this so that the music could start when you get to the Home Page.
	 */

	splashScreen.addEventListener('click', function () {
		playBgMusic();
		showScreen(homeScreen);
	});
	/* Section 7: Start Button — goes to name entry screen*/

	startBtn.addEventListener('click', function () {
		showScreen(nameScreen);
	});
	
	/* Section 8: Time to Race! — reads names, starts game
	*/

	playBtn.addEventListener('click', function () {

		// Read names from the input fields (default Player 1 & Player 2 if left blank)
		gameData.players[0] = name1Input.value.trim()||'Player 1';
		gameData.players[1] = name2Input.value.trim()||'Player 2';

		// Reset both scores to zero
		gameData.score[0] = 0;
		gameData.score[1] = 0;

		// Randomly pick who goes first (Math.round gives 0 or 1)
		gameData.index = Math.round(Math.random());

		// Reset runner images to the start line
		runner1El.style.left = '10px';
		runner2El.style.left = '10px';
		r1LabelEl.style.left = '10px';
		r2LabelEl.style.left = '10px';

		// Make sure both runners start on the still image
		showRunnerStill(0);
		showRunnerStill(1);

		// Reset dice images
		die1El.src = 'images/die1.svg';
		die2El.src = 'images/die2.svg';

		showScreen(gameScreen);
		setUpTurn();
	});
	
	/*Section 9: Who goes first?
	   Updates the UI to show whose turn it is */

	function setUpTurn() {

		// Update the turn indicator text
		turnIndicator.innerHTML = '&#9654; ' + gameData.players[gameData.index] + "'s Turn"; // &#9654 this renders a small play button

		// Highlight the active player's score
		if (gameData.index === 0) {
			scorePanel1.classList.add('active-panel');
			scorePanel2.classList.remove('active-panel');
		} else {
			scorePanel2.classList.add('active-panel');
			scorePanel1.classList.remove('active-panel');
		}

		// Update name labels
		p1NameLabel.innerHTML = gameData.players[0];
		p2NameLabel.innerHTML = gameData.players[1];

		// Update short track labels
		r1LabelEl.innerHTML = gameData.players[0].slice(0, 4);
		r2LabelEl.innerHTML = gameData.players[1].slice(0, 4);

		// Both runners should be still at the start of a turn
		showRunnerStill(0);
		showRunnerStill(1);

		// Reset dice and message text, enable Roll
		rollResult.innerHTML = 'Roll the dice, ' + gameData.players[gameData.index] + '!';
		messageBox.innerHTML = '';
		rollBtn.disabled = false;
	}


	/*Section  10: Time to Roll */

	rollBtn.addEventListener('click', function () {
		throwDice();
	});


	/* Section 11: Throw the Dice
	   Rolls both dice, checks the result, updates the game*/

	function throwDice() {

	// Disable buttons while the dice spinning
	rollBtn.disabled = true;

	// Roll two dice
	gameData.roll1 = Math.floor(Math.random() * 6) + 1;
	gameData.roll2 = Math.floor(Math.random() * 6) + 1;
	gameData.rollSum = gameData.roll1 + gameData.roll2;

	// Spin animation
	die1El.classList.add('rolling');
	die2El.classList.add('rolling');

	// After animation
	setTimeout(function () {

		die1El.classList.remove('rolling');
		die2El.classList.remove('rolling');

		die1El.src = gameData.dice[gameData.roll1 - 1];
		die2El.src = gameData.dice[gameData.roll2 - 1];

		// Snake eyes
		if (gameData.rollSum === 2) {

			gameData.score[gameData.index] = 0;
			rollResult.innerHTML = 'False Start: Back to the Blocks!';
			messageBox.innerHTML = gameData.players[gameData.index] + "'s score reset to 0!";

			if (gameData.index === 0) {
				runner1El.style.left = '10px';
				r1LabelEl.style.left = '10px';
			} else {
				runner2El.style.left = '10px';
				r2LabelEl.style.left = '10px';
			}

			showCurrentScore();
			gameData.index = gameData.index === 0 ? 1 : 0;
			setTimeout(setUpTurn, 2000);
		// 1-1 Roll 
		} else if (gameData.roll1 === 1 || gameData.roll2 === 1) {

			gameData.index = gameData.index === 0 ? 1 : 0;
			rollResult.innerHTML = 'Cramp! You Rolled a 1! Turn over.';
			messageBox.innerHTML = 'Switching to ' + gameData.players[gameData.index] + '...';
			setTimeout(setUpTurn, 2000);
		// Normal Role Adds Score, moves the Player Forward
		} else {
			gameData.score[gameData.index] += gameData.rollSum;
			rollResult.innerHTML =
				gameData.roll1 + ' + ' + gameData.roll2 + ' = ' + gameData.rollSum + ' pts!';
			messageBox.innerHTML =
				'+' + gameData.rollSum + ' for ' + gameData.players[gameData.index] + '!';

			showCurrentScore();
			showRunnerMoving(gameData.index);
			playRunningSound();
			moveRunner(gameData.index);

			setTimeout(function () {
				showRunnerStill(gameData.index);
				stopRunningSound();

				// Check for a win first; otherwise switch turns
				if (gameData.score[gameData.index] > gameData.gameEnd) {
					checkWinningCondition();
				} else {
					gameData.index = gameData.index === 0 ? 1 : 0;
					setTimeout(setUpTurn, 1000);
				}

			}, 500);
}
	}, 520);
}

	/*Section 12: Old Pass Button 
	 I got rid of it:) */

	/* Section 13: Check for the Piston Cup Champion aka "a Win"*/

	function checkWinningCondition() {
		if (gameData.score[gameData.index] > gameData.gameEnd) {

			// Play the win sound
			playWinSound();

			winTitle.innerHTML = gameData.players[gameData.index] + ' Wins!';
			winSub.innerHTML   = 'Crossed the finish line with ' + gameData.score[gameData.index] + ' points!';

			setTimeout(function () {
				showScreen(winScreen);
			}, 900);

		} else {

			// Game is still going and re-enable Roll and Pass
			rollBtn.disabled = false;
		}
	}


	/*Section 14: Show Current Score: Updates the score numbers above the track*/

	function showCurrentScore() {
		p1ScoreEl.innerHTML = gameData.score[0];
		p2ScoreEl.innerHTML = gameData.score[1];
	}


	/* Section 15: Move the Runner based on their score
	   The GIF/still swap happens in throwDice, but this function only handles the position.*/

	function moveRunner(playerIndex) {

		// Get the track width so we know how far the runner can go.
		const track = document.querySelector('.game-track');
		const trackWidth = track.offsetWidth;

		// The finish line sits at 86% of the track width, I hate math
		const finishPx = trackWidth * 0.94 - 20;
		// Turn the score into a fraction between 0 and 1, again I am a design major cuase I hate math:(
		const fraction = Math.min(gameData.score[playerIndex] / (gameData.gameEnd + 1), 1);

		// Convert fraction to a pixel position (34px = runner width), this was rough to finally get it right.
		const newLeft = 10 + fraction * (finishPx - 10 - 34);

		// Move the correct runner and its label
		if (playerIndex === 0) {
			runner1El.style.left = newLeft + 'px';
			r1LabelEl.style.left = newLeft + 'px';
		} else {
			runner2El.style.left = newLeft + 'px';
			r2LabelEl.style.left = newLeft + 'px';
		}
	}


	/* Section 16: Let's Play Again Button */
	restartBtn.addEventListener('click', function () {
		location.reload();
	});

}());