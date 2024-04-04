document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "rYD9QicnvK9kto968XatrajAOyuYGoq8eeUqJcZe";
  const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

  const datePicker = document.getElementById("datePicker");
  const apodImage = document.getElementById("apodImage");
  const apodDescription = document.getElementById("apodDescription");

  async function fetchWithRetry(url, attempts = 3) {
    function onError(err) {
      const isRetryError = err.status === 429; // Too many requests
      if (isRetryError && attempts > 0) {
        console.log(`Retrying... Attempts left: ${attempts}`);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(fetchWithRetry(url, attempts - 1));
          }, 3000); // Wait for 3 seconds before retrying
        });
      }
      return Promise.reject(err);
    }

    return fetch(url)
      .then((response) => {
        if (!response.ok) throw response;
        return response.json();
      })
      .catch(onError);
  }

  // Set the date picker to yesterday's date and fetch the APOD for that day when the page loads
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 2))
    .toISOString()
    .split("T")[0];
  datePicker.value = yesterday;
  fetchWithRetry(apodUrl + "&date=" + yesterday)
    .then((data) => {
      apodImage.src = data.url;
      apodImage.alt = "APOD Image for " + yesterday;
      apodDescription.textContent = data.explanation;
    })
    .catch((error) => console.error("Error fetching APOD:", error));
  datePicker.addEventListener("change", function () {
    fetchWithRetry(apodUrl + "&date=" + datePicker.value)
      .then((data) => {
        apodImage.src = data.url;
        apodImage.alt = "APOD Image for " + datePicker.value;
        apodDescription.textContent = data.explanation;
      })
      .catch((error) => console.error("Error fetching APOD:", error));
  });
});
