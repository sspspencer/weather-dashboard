let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");

let city = "montreal";
// get city from the search input
searchBtn.addEventListener("click", function () {
  console.log(searchInput.value);
  city = searchInput.value;
  searchInput.value = "";
});

// get Geo location and weather data for that city
