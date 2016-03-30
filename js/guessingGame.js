/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess = 0;

var allGuesses = [];

var winningNumber = generateWinningNumber();

var guessRemaining = 5;



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random() * 100)
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	if (guessRemaining == 0) {
		$('.message').html('You ran out of guesses. Press Restart to start over!');
	} else {
		playersGuess = parseInt($('#playersGuess').val());
		$('#playersGuess').val('');
		if (allGuesses.indexOf(playersGuess) == -1) {
			checkGuess();
		} else {
			$('.message').show();
			$('.message').html('Hey, you already guessed that number!')
		}
	}

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if (winningNumber == playersGuess) {
		//you win!
		$('#guess-count').hide();
		$('#past-guess').hide();
		$('h5').hide();
		$('.message').html('<h3>You win! Click Restart to play again!</h3>');
		//reset to play again
	} else {
		$('#past-guess').show();
		//try again
		allGuesses.push(playersGuess);
		if (guessRemaining == 5) {
			$('.game').append('<h5>' + allGuesses.join(', ') + '</h5>');
		} else {
			$('h5').html(allGuesses.join(', '));
		}
		guessRemaining--;
		$('#guess-count').html(guessRemaining + " Guesses Remaining");
		$('.message').show();
		$('.message').html('Try again!');
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	guessRemaining = 5;
	allGuesses = [];
	$('#guess-count').html(guessRemaining + " Guesses Remaining");
	$('#guess-count').show();
	$('.message').hide();
	$('#past-guess').hide();
	$('h5').hide();
}


/* **** Event Listeners/Handlers ****  */
