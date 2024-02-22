document.addEventListener("DOMContentLoaded", function () {
  const viewingArea = document.getElementById("viewingArea");
  const makeButton = document.getElementById("makeButton");
  const colorSelect = document.getElementById("colorSelect");
  const moveButton = document.getElementById("moveButton");
  let totalClicked = 0;
  let moving = false;
  let buttons = [];

  makeButton.addEventListener("click", function () {
    const color = colorSelect.value;
    const button = document.createElement("button");
    button.textContent = Math.floor(Math.random() * 99) + 1;
    button.style.backgroundColor = color;
    button.className = "dynamicButton";
    positionButton(button);
    button.addEventListener("click", function () {
      this.style.backgroundColor = colorSelect.value;
      totalClicked += parseInt(this.textContent);
      document.getElementById("totalClicked").textContent =
        "Total: " + totalClicked;
    });
    viewingArea.appendChild(button);
    buttons.push(button);
  });

  moveButton.addEventListener("click", function () {
    if (moving) {
      this.textContent = "Move";
      moving = false;
    } else {
      this.textContent = "Pause";
      moving = true;
      moveButtons();
    }
  });

  function positionButton(button) {
    const maxX = viewingArea.offsetWidth - button.offsetWidth;
    const maxY = viewingArea.offsetHeight - button.offsetHeight;
    button.style.left = Math.floor(Math.random() * maxX) + "px";
    button.style.top = Math.floor(Math.random() * maxY) + "px";
  }

  function moveButtons() {
    if (!moving) return;
    buttons.forEach((button) => {
      let direction = Math.random() < 0.5 ? -1 : 1;
      let axis = Math.random() < 0.5 ? "X" : "Y";
      moveButtonInDirection(button, axis, direction);
    });
    setTimeout(moveButtons, 100);
  }

  function moveButtonInDirection(button, axis, direction) {
    let newPos, maxPos;
    if (axis === "X") {
      newPos = parseInt(button.style.left, 10) + 10 * direction;
      maxPos = viewingArea.offsetWidth - button.offsetWidth;
      // Check if the new position is outside the viewing area and adjust
      if (newPos < 0) {
        newPos = 0; // Adjust to the start if it goes too far left
        direction *= -1;
      } else if (newPos > maxPos) {
        newPos = maxPos; // Adjust to the maximum right position
        direction *= -1;
      }
      button.style.left = newPos + "px";
    } else {
      newPos = parseInt(button.style.top, 10) + 10 * direction;
      maxPos = viewingArea.offsetHeight - button.offsetHeight;
      // Check if the new position is outside the viewing area and adjust
      if (newPos < 0) {
        newPos = 0; // Adjust to the top if it goes too far up
        direction *= -1;
      } else if (newPos > maxPos) {
        newPos = maxPos; // Adjust to the maximum bottom position
        direction *= -1;
      }
      button.style.top = newPos + "px";
    }
  }
});
