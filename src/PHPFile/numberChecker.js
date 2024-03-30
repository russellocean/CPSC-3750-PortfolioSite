function displayNumbers(category) {
  fetch("numberChecker.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "action=display&category=" + category,
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("output").innerHTML = data;
    });
}

function resetApplication() {
  fetch("numberChecker.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "action=reset",
  }).then(() => {
    document.getElementById("output").innerHTML =
      "Application reset. Please refresh the page.";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    formData.append("action", "check");
    fetch("numberChecker.php", {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("output").innerHTML = data;
      })
      .catch((error) => console.error("Error:", error));
  });

  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => {
    if (button.textContent !== "RESET") {
      button.addEventListener("click", function () {
        const category = this.textContent.toLowerCase();
        displayNumbers(category);
      });
    }
  });
});
