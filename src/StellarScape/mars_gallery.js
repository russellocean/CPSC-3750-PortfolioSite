document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "rYD9QicnvK9kto968XatrajAOyuYGoq8eeUqJcZe";
  const searchForm = document.getElementById("searchForm");
  const photoResults = document.getElementById("photoResults");
  const pagination = document.getElementById("pagination");
  const roverSelect = document.getElementById("rover");
  let currentPage = 1;
  let currentRover = roverSelect.value;
  let currentSol = 0;

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

  function fetchRoverData(rover) {
    const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;
    fetchWithRetry(url)
      .then((data) => {
        const roverData = data.photo_manifest;
        // Display rover information on the page
        const roverInfo = document.getElementById("roverInfo");
        roverInfo.innerHTML = `
          <h3>${roverData.name}</h3>
          <p>Landing Date: ${roverData.landing_date}</p>
          <p>Launch Date: ${roverData.launch_date}</p>
          <p>Status: ${roverData.status}</p>
          <p>Max Sol: ${roverData.max_sol}</p>
          <p>Max Date: ${roverData.max_date}</p>
          <p>Total Photos: ${roverData.total_photos}</p>
        `;
      })
      .catch((error) =>
        console.error(`Error fetching data for ${rover}:`, error)
      );
  }

  function fetchAndDisplayPhotos(rover, sol) {
    const roverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${currentPage}&api_key=${apiKey}`;
    console.log("Fetching Mars Rover Photos:", roverPhotosUrl);
    fetchWithRetry(roverPhotosUrl)
      .then((data) => {
        displayPhotos(data);
        setupPagination(data.photos.length);
        console.log("Mars Rover Photos fetched successfully:", data);
      })
      .catch((error) =>
        console.error("Error fetching Mars Rover Photos:", error)
      );
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    currentRover = roverSelect.value;
    currentSol = document.getElementById("sol").value;
    fetchAndDisplayPhotos(currentRover, currentSol);
    fetchRoverData(currentRover);
  });

  function displayPhotos(data) {
    photoResults.innerHTML = ""; // Clear previous results
    if (data.photos.length === 0) {
      photoResults.innerHTML =
        "<p>Looks like Curiosity is playing hide and seek! No photos found for this Martian Sol. Try another day!</p>";
    } else {
      const photosContainer = document.createElement("div");
      photosContainer.style.display = "flex";
      photosContainer.style.flexWrap = "wrap";
      photosContainer.style.justifyContent = "space-around";
      data.photos.forEach((photo) => {
        const photoContainer = document.createElement("div");
        photoContainer.style.display = "flex";
        photoContainer.style.flexDirection = "column";
        photoContainer.style.alignItems = "center";
        photoContainer.style.margin = "10px";

        const imgElement = document.createElement("img");
        imgElement.src = photo.img_src;
        imgElement.alt = "Mars Rover Photo";
        imgElement.style.maxWidth = "200px";
        imgElement.style.height = "auto";

        const cameraInfo = document.createElement("p");
        cameraInfo.textContent = `Camera: ${photo.camera.full_name}`;
        cameraInfo.style.maxWidth = "200px";
        cameraInfo.style.textAlign = "center";

        photoContainer.appendChild(imgElement);
        photoContainer.appendChild(cameraInfo);
        photosContainer.appendChild(photoContainer);
      });
      photoResults.appendChild(photosContainer);
    }
  }
  function setupPagination(photoCount) {
    pagination.innerHTML = ""; // Clear previous pagination
    if (photoCount === 25) {
      // Assuming 25 is the max number of photos per page
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous";
      prevButton.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          fetchAndDisplayPhotos(currentRover, currentSol);
        }
      };
      pagination.appendChild(prevButton);

      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.onclick = () => {
        currentPage++;
        fetchAndDisplayPhotos(currentRover, currentSol);
      };
      pagination.appendChild(nextButton);
    }
  }

  // Initial fetch for Curiosity rover Sol 0
  fetchAndDisplayPhotos("curiosity", 0);
  fetchRoverData("curiosity");
});
