
var words = [  "aang", "spongebob", "catdog", "patrick", "cosmo", "drake_and_josh", "mr_crabs"]

//variables for counting the wins/losses and guesses left
var wins = 0;
var losses = 0;
var guessesRemaining = 9;
//variable for randomly picking word from the array 
var randomWord = "";
//variable to store the letters of the word 
var lettersOfWord = []
var blanks = 0;
//puts the letters in the correct blanks
var blanksAndCorrect = [];
//puts the incorrect letters in these blanks
var wrongGuess = [];



function Game() {
    //function for choosing a random word from the array above
    randomWord = words[Math.floor(Math.random() * words.length)];
        //splits the words in the array using the .split function
            lettersOfWord = randomWord.split("");
            //tells the code to use enough blanks for the randomly generated word  
            blanks = lettersOfWord.length;
    //logic for blanks 
    for (var i = 0; i < blanks; i++) {
        //pushes the correct letters 
        blanksAndCorrect.push("_");
    }
    //joins the correct letters to the correct letters blank 
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

   
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}

//looks at the keyup and puts the letters on screen as well as stores as lowercase 
document.onkeyup = function (event) {
    //The keyCode property returns the Unicode character code of the key that triggered the onkeypress event, or the Unicode key code of the key that triggered the onkeydown or onkeyup event.
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //checks if letters correlate with the word 
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //consoles the guesses 
    console.log(guesses);

    //shows the incorrect letters on the screen 
    document.getElementById("wrongletters").innerHTML = "  " + wrongGuess.join(" ");
}

//if/else statement to check if word is right or wrong
function checkLetters(letter) {
    var letterInWord = false;
    //checking to see if letters = word
    for (var i = 0; i < blanks; i++) {
        //if the random word = the letters put then it is true or correct 
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


//Resets game 

function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}


//check to see if player won/lost and the guesses left 
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guessesleft:" + guessesRemaining)

    //if they win, adds win to wins box and resets game 
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        reset()
        //display wins on screen
        document.getElementById("wins").innerHTML = " " + wins;

        //if they lose, adds loss to losses box and resets game 
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("losses").innerHTML = " " + losses;
    }
    //displaya the current word and guesses remaining 
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesleft").innerHTML = " " + guessesRemaining;
}

