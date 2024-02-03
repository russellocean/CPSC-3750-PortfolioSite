let redCount = 0;
let greenCount = 0;
let blueCount = 0;
let colorChangeCount = 0;

document.getElementById("red").addEventListener("click", function () {
  document.body.style.backgroundColor = "red";
  document.getElementById("redCount").textContent = "RED count: " + ++redCount;
});

document.getElementById("green").addEventListener("click", function () {
  document.body.style.backgroundColor = "green";
  document.getElementById("greenCount").textContent =
    "GREEN count: " + ++greenCount;
});

document.getElementById("blue").addEventListener("click", function () {
  document.body.style.backgroundColor = "blue";
  document.getElementById("blueCount").textContent =
    "BLUE count: " + ++blueCount;
});

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("mouseover", function () {
    if (this.style.backgroundColor === "black") {
      this.style.backgroundColor = "white";
      this.style.color = "black";
    } else {
      this.style.backgroundColor = "black";
      this.style.color = "white";
    }
    document.getElementById("colorChangeCount").textContent =
      "Color Change count: " + ++colorChangeCount;
  });
});
