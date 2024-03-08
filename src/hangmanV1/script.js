const words = ['javascript', 'hangman', 'web', 'programming', 'game'];
const selectedWord = words[Math.floor(Math.random() * words.length)];
let attemptsLeft = 10;
let guessedLetters = Array(selectedWord.length).fill('_');
let gameEnded = false;

document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;

function updateWordDisplay() {
  document.getElementById('wordToGuess').innerText = guessedLetters.join(' ');
}

function guessLetter() {
  if (gameEnded) return;
  const input = document.getElementById('guessInput');
  const guess = input.value.toLowerCase();
  input.value = ''; // Clear input after guess

  if (guess && !gameEnded) {
    if (selectedWord.includes(guess)) {
      selectedWord.split('').forEach((letter, index) => {
        if (letter === guess) {
          guessedLetters[index] = guess;
        }
      });

      updateWordDisplay();

      if (!guessedLetters.includes('_')) {
        document.getElementById('status').innerText = 'Congratulations! You won!';
        gameEnded = true;
      }
    } else {
      attemptsLeft--;
      document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;
			if (attemptsLeft == 9)
				document.getElementById('gallows01').innerText = "draw next part";
			if (attemptsLeft == 8)
				document.getElementById('gallows02').innerText = "draw next part";
			if (attemptsLeft == 7)
				document.getElementById('gallows03').innerText = "draw next part";

      if (attemptsLeft == 0) {
        document.getElementById('status').innerText = 'Game Over! You lost.';
        gameEnded = true;
      }
    }
  }
}

updateWordDisplay();
