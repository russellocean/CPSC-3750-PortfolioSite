// Russell Welch
// 02/22/2024
// CPSC 3750
// program exam #1
// grade level: A

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const sumPrimesButton = document.getElementById("sumPrimes");
  const sumNonPrimesButton = document.getElementById("sumNonPrimes");
  const numberInput = document.getElementById("numberInput");
  const primesList = document.getElementById("primes");
  const nonPrimesList = document.getElementById("nonPrimes");

  function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false;
    return num > 1;
  }

  function generateLists(n) {
    let primes = [];
    let nonPrimes = [];
    for (let i = 1; i <= n; i++) {
      if (isPrime(i)) {
        primes.push(i);
      } else {
        nonPrimes.push(i);
      }
    }
    displayLists(primes, nonPrimes);
  }

  function displayLists(primes, nonPrimes) {
    primesList.innerHTML = primes.map((prime) => `<li>${prime}</li>`).join("");
    nonPrimesList.innerHTML = nonPrimes
      .map((nonPrime) => `<li>${nonPrime}</li>`)
      .join("");
  }

  function sumArray(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
  }

  startButton.addEventListener("click", function () {
    const number = parseInt(numberInput.value);
    if (!isNaN(number)) {
      generateLists(number);
    }
  });

  sumPrimesButton.addEventListener("click", function () {
    const primes = primesList.querySelectorAll("li");
    const primeNumbers = Array.from(primes).map((prime) =>
      parseInt(prime.textContent)
    );
    alert(`Sum of Prime Numbers: ${sumArray(primeNumbers)}`);
  });

  sumNonPrimesButton.addEventListener("click", function () {
    const nonPrimes = nonPrimesList.querySelectorAll("li");
    const nonPrimeNumbers = Array.from(nonPrimes).map((nonPrime) =>
      parseInt(nonPrime.textContent)
    );
    alert(`Sum of Non-Prime Numbers: ${sumArray(nonPrimeNumbers)}`);
  });

  // Implement color change every 5 seconds
  setInterval(() => {
    document.querySelectorAll("#primeList, #nonPrimeList").forEach((el) => {
      el.style.backgroundColor =
        el.style.backgroundColor === "lightgreen" ? "lightcoral" : "lightgreen";
    });
  }, 5000);
});
