// Fetch and display mission manifests for all rovers including Curiosity, Opportunity, and Spirit
const rovers = ["curiosity", "opportunity", "spirit"];
const apiKey = "rYD9QicnvK9kto968XatrajAOyuYGoq8eeUqJcZe";

rovers.forEach((rover) => {
  fetch(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const roverData = data.photo_manifest;
      // Dynamically update stats.html with this data
      const statsSection = document.getElementById("stats");
      statsSection.innerHTML += `<div class="rover-stats">
        <h2>${roverData.name}</h2>
        <p>Landing Date: ${roverData.landing_date}</p>
        <p>Launch Date: ${roverData.launch_date}</p>
        <p>Status: ${roverData.status}</p>
        <p>Max Sol: ${roverData.max_sol}</p>
        <p>Max Date: ${roverData.max_date}</p>
        <p>Total Photos: ${roverData.total_photos}</p>
      </div>`;
    })
    .catch((error) =>
      console.error(`Failed to fetch data for ${rover}:`, error)
    );
});
