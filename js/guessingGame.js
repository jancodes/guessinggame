/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess = 0;

var allGuesses = [];

var winningNumber = generateWinningNumber();

var guessRemaining = 5;

var hintused = false;

var won = false;



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return getRandomNumber(1, 100);
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max-min) + min);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	if (guessRemaining == 0) {
		$('.message').html('You ran out of guesses. Press Restart to start over!');
	} else if (!isNaN(playersGuess = parseInt($('#playersGuess').val())) && playersGuess >= 1 && playersGuess <= 100) {
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
	var condition = Math.abs(playersGuess - winningNumber);
	if (condition > 10) {
		condition = "Getting Colder!";
	} else if (condition <= 5) {
		condition = "Super hot!";
	} else {
		condition = "Getting warmer!";
	}
	if (playersGuess > winningNumber) {
		return "Guess lower! " + condition;
	} else {
		return "Guess higher! " + condition;
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if (winningNumber == playersGuess) {
		//you win!
		$('#guess-count').hide();
		$('#past-guess').hide();
		$('h5').hide();
		if (hintused) {
			won = true;
			$('.message').html('<h3>You win, but you used an hint! Try winning without it!</h3>');
			$('.game').addClass('won');
		} else {
			won = true;
			$('.message').html('<h3>You win! Click Restart to play again!</h3>');
			$('.game').addClass('won');
		}
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
		if (guessRemaining > 0) {
			$('.message').html('Try again! ' + lowerOrHigher());
		} else {
			won = false;
			$('.game').addClass('lost');
			$('.message').html('Wrong guess, press Restart to play again!');
			$('#hint').hide();
		}
		if (guessRemaining == 1) {
			$('#hint').show();
		}
	}
}

function randomNumber() {
	var randomArray = [];
	randomArray.push(getRandomNumber(1, 100));
	randomArray.push(getRandomNumber(1, 100));
	randomArray.push(getRandomNumber(1, 100));
	return randomArray;
}
function shuffle(array) {
	var counter = array.length 
	while (counter > 0) {
		randomIndex = Math.floor(Math.random() * array.length)
		counter--

		var temp = array[counter];
		array[counter] = array[randomIndex];
		array[randomIndex] = temp;	
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	$('#hide').hide();
	hintused = true;
	var hint1, hint2, hint3 = randomNumber();
	var randomArray = randomNumber();
	randomArray.push(winningNumber);
	shuffle(randomArray);
	$('.message').html('One of these are the winning numbers: ' + randomArray.join(', '));
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	if (won) {
		$('.game').removeClass('won');
	} else {
		$('.game').removeClass('lost');
	}
	winningNumber = generateWinningNumber();
	guessRemaining = 5;
	allGuesses = [];
	$('#guess-count').html(guessRemaining + " Guesses Remaining");
	$('#guess-count').show();
	$('.message').hide();
	$('#past-guess').hide();
	$('h5').hide();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	$('#hint').on("click", provideHint);
});

$(document).keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
		playersGuessSubmission();
	};
});
