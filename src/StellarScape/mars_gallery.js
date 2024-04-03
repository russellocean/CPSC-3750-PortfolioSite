document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "rYD9QicnvK9kto968XatrajAOyuYGoq8eeUqJcZe";
  const searchForm = document.getElementById("searchForm");
  const photoResults = document.getElementById("photoResults");
  const pagination = document.getElementById("pagination");
  let currentPage = 1;

  function fetchAndDisplayPhotos() {
    const sol = document.getElementById("sol").value;
    const roverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${currentPage}&api_key=${apiKey}`;
    console.log("Fetching Mars Rover Photos:", roverPhotosUrl);
    fetch(roverPhotosUrl)
      .then((response) => response.json())
      .then((data) => {
        displayPhotos(data.photos);
        setupPagination(data.photos.length);
        console.log("Mars Rover Photos fetched successfully:", data);
      })
      .catch((error) =>
        console.error("Error fetching Mars Rover Photos:", error)
      );
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    fetchAndDisplayPhotos();
  });

  function displayPhotos(photos) {
    photoResults.innerHTML = ""; // Clear previous results
    if (photos.length === 0) {
      photoResults.innerHTML =
        "<p>Looks like Curiosity is playing hide and seek! No photos found for this Martian Sol. Try another day!</p>";
    } else {
      photos.forEach((photo) => {
        const imgElement = document.createElement("img");
        imgElement.src = photo.img_src;
        imgElement.alt = "Mars Rover Photo";
        photoResults.appendChild(imgElement);
      });
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
          fetchAndDisplayPhotos();
        }
      };
      pagination.appendChild(prevButton);

      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.onclick = () => {
        currentPage++;
        fetchAndDisplayPhotos();
      };
      pagination.appendChild(nextButton);
    }
  }
});
