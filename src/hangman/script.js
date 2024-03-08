let cheatModeCheckbox = document.getElementById("cheatMode");
let wordToGuessElement = document.getElementById("wordToGuess");
let lettersDiv = document.getElementById("letters");
let currentWord = "";
let totalStrikes = 0;
let maxStrikes = 12;

function startGame() {
  totalStrikes = 0;
  // Remove any existing event listeners to prevent duplication
  cheatModeCheckbox.removeEventListener("click", toggleCheatMode);
  // Fetch a new word from the server
  fetch("getWord.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.word) {
        currentWord = data.word;
        cheatModeCheckbox.addEventListener("click", toggleCheatMode);
        setupGame();
      } else {
        console.error("Error fetching word:", data.error);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function toggleCheatMode() {
  // Check if the checkbox is checked to show the word
  if (cheatModeCheckbox.checked) {
    alert(`The word is: ${currentWord}`);
  }
}
function setupGame() {
  wordToGuessElement.innerHTML = "_ ".repeat(currentWord.length).trim();
  generateLetterButtons();
}

function generateLetterButtons() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  lettersDiv.innerHTML = ""; // Clear previous buttons
  letters.split("").forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => guessLetter(letter);
    lettersDiv.appendChild(button);
  });
}

function guessLetter(letter) {
  // Convert the letter to lowercase
  letter = letter.toLowerCase();

  // Iterate over the correct word
  // If the guessed letter is found, replace the underscore with the letter
  let found = false;
  const textContentArray = wordToGuessElement.textContent.split("");
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i].toLowerCase() === letter) {
      // Replace the underscore with the correct letter
      textContentArray[i * 2] = currentWord[i];
      found = true;
    }
  }

  // Update the word to guess element with the new text content
  wordToGuessElement.textContent = textContentArray.join("");

  if (!textContentArray.includes("_")) {
    alert("You win!");
    document.getElementById("hangman").style.objectPosition = `0 0`;
    document.getElementById("hangman").style.objectFit = "none";
    startGame();
  }

  // If the letter was not found, increment the total strikes
  if (!found) {
    // Increment the total strikes only if the letter was not found
    totalStrikes++;
    // Adjusting sprite position calculation for the hangman image
    const spriteWidth = 75;
    const spriteHeight = 85;
    const column = totalStrikes % 3;
    const row = Math.floor(totalStrikes / 3);

    // Update the hangman image to reflect the current state using the spritesheet
    document.getElementById("hangman").style.objectPosition = `-${
      column * spriteWidth
    }px -${row * spriteHeight}px`;
    document.getElementById("hangman").style.objectFit = "none";

    // Check if the game is over
    if (totalStrikes === maxStrikes) {
      alert("Game over!");
      document.getElementById("hangman").style.objectPosition = `0 0`;
      document.getElementById("hangman").style.objectFit = "none";
      startGame();
    }
  }
}

// Initially start the game
startGame();
