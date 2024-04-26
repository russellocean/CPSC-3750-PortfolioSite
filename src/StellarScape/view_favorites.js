document.addEventListener("DOMContentLoaded", function () {
  const favoritesList = document.getElementById("favoritesList");

  function fetchFavorites() {
    fetch("fetch_favorites.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          displayFavorites(data.favorites);
        } else {
          console.error("Error loading favorites:", data.error);
          favoritesList.innerHTML = `<p>Error loading favorites: ${data.error}</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        favoritesList.innerHTML = `<p>Error loading favorites: ${error.toString()}</p>`;
      });
  }

  function displayFavorites(favorites) {
    favoritesList.innerHTML = ""; // Clear previous results
    favorites.forEach((favorite) => {
      const item = document.createElement("div");
      item.className = "favorite-item";
      item.innerHTML = `
                <p>${favorite.title}</p>
                <img src="${favorite.image_url}" alt="${favorite.title}" style="max-width:200px;height:auto;">
                <button onclick="removeFavorite(${favorite.item_id})">Remove</button>
            `;
      favoritesList.appendChild(item);
    });
  }

  fetchFavorites();
});
