document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "rYD9QicnvK9kto968XatrajAOyuYGoq8eeUqJcZe";
  const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

  const datePicker = document.getElementById("datePicker");
  const apodImage = document.getElementById("apodImage");
  const apodDescription = document.getElementById("apodDescription");

  // Set the date picker to yesterday's date and fetch the APOD for that day when the page loads
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 2))
    .toISOString()
    .split("T")[0];
  datePicker.value = yesterday;
  fetch(apodUrl + "&date=" + yesterday)
    .then((response) => response.json())
    .then((data) => {
      apodImage.src = data.url;
      apodImage.alt = "APOD Image for " + yesterday;
      apodDescription.textContent = data.explanation;
    })
    .catch((error) => console.error("Error fetching APOD:", error));
  datePicker.addEventListener("change", function () {
    fetch(apodUrl + "&date=" + datePicker.value)
      .then((response) => response.json())
      .then((data) => {
        apodImage.src = data.url;
        apodImage.alt = "APOD Image for " + datePicker.value;
        apodDescription.textContent = data.explanation;
      })
      .catch((error) => console.error("Error fetching APOD:", error));
  });
});
