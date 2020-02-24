//VARIABLES
var words = [  "aang", "spongebob", "catdog", "patrick", "cosmo", "drake_and_josh", "mr_crabs"]


var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];
var wins = 0;
var losses = 0;
var guessesRemaining = 9;



//GAME START FUNCTION

function Game() {
    
    randomWord = words[Math.floor(Math.random() * words.length)];

    lettersOfWord = randomWord.split("");
   
    blanks = lettersOfWord.length;

    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

   
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//RESET FUNCTION

function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}


//If/Else statement to check if word is right or wrong
function checkLetters(letter) {
    var letterInWord = false;
    //checking to see if letters = word
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letters dont correlate 
    if (letterInWord) {       
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //pushes wrong letters in box along with guesses remaining 
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}


//FINAL COMPLETE FUNCTION


//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if they win, adds win to wins box and resets game 
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if they lose, adds loss to losses box and resets game 
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //displaya the current word and guesses remaining 
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//call start game function
Game()

//looks at the keyup and puts the letters on screen as well as stores as lowercase 
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //checks if letters correlate with the word 
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //consoles the guesses 
    console.log(guesses);

    //shows the incorrect letters on the screen 
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}