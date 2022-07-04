let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let historySection = document.getElementById("history-section");
let city = "Montreal";
// get city from the search input
searchBtn.addEventListener("click", function () {
  console.log(searchInput.value);
  city = searchInput.value;
  searchHistory(searchInput.value);
  searchInput.value = "";
  getWeatherData(city);
});

// get Geo location and weather data for that city
function getWeatherData(city) {
  var geo =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=5c6c115c7b130c3b486979eb5cffa2cc";
  fetch(geo)
    .then(function (geoResponse) {
      return geoResponse.json();
    })
    .then(function (geoData) {
      var weather =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        geoData[0].lat +
        "&lon=" +
        geoData[0].lon +
        "&units=metric&appid=5c6c115c7b130c3b486979eb5cffa2cc";
      fetch(weather)
        .then(function (weatherResponse) {
          return weatherResponse.json();
        })
        .then(function (weatherData) {
          console.log(weatherData);
        });
    });
}

// search history
function searchHistory(value) {
  if (value !== "") {
    let historyItem = document.createElement("button");
    historyItem.className = "history-btn";
    historyItem.textContent = value;
    historySection.appendChild(historyItem);
  }
}
historySection.addEventListener("click", function (event) {
  if (event.target.nodeName === "BUTTON") {
    console.log(event.target.textContent);
    getWeatherData(event.target.textContent);
  }
});

getWeatherData(city);
