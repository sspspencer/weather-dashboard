let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let historySection = document.getElementById("history-section");
let cardContainer = document.getElementById("card-container");
let currentDescription = document.getElementById("current-description");
let currentData = document.getElementById("current-data");
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
  currentData.innerHTML = "";
  currentDescription.innerHTML = "";
  cardContainer.innerHTML = "";
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
          let weatherImg = document.createElement("img");
          weatherImg.src =
            " http://openweathermap.org/img/wn/" +
            weatherData.current.weather[0].icon +
            "@2x.png";

          let dateString = moment
            .unix(weatherData.current.dt)
            .format("MM/DD/YYYY");

          let weatherInfo = [
            "temp: " + weatherData.current.temp + " °C",
            "wind: " + weatherData.current.wind_speed + " KMH",
            "humidity: " + weatherData.current.humidity + "%",
            "uvi :" + weatherData.current.uvi + "%",
          ];
          let currentDate = document.createElement("h2");
          currentDate.setAttribute("id", "current-date");
          currentDate.textContent = city + " (" + dateString + ") ";
          currentDescription.appendChild(currentDate);

          currentDescription.appendChild(weatherImg);
          for (let i = 0; i < weatherInfo.length; i++) {
            let currentListItem = document.createElement("li");
            currentListItem.setAttribute("id", "current-" + weatherInfo[i]);
            currentListItem.textContent = weatherInfo[i];
            currentData.appendChild(currentListItem);
          }

          for (let i = 0; i < 5; i++) {
            let dailyDateString = moment
              .unix(weatherData.daily[i].dt)
              .format("MM/DD/YYYY");

            let card = document.createElement("div");
            card.setAttribute("class", "card");
            card.setAttribute("id", i);
            let cardList = document.createElement("ul");
            let weatherCardInfo = [
              dailyDateString,
              "temp: " + weatherData.current.temp + " °C",
              "wind: " + weatherData.current.wind_speed + " KMH",
              "humidity: " + weatherData.current.humidity + "%",
              "uvi :" + weatherData.current.uvi + "%",
            ];
            for (let i = 0; i < weatherCardInfo.length; i++) {
              let cardListItem = document.createElement("li");
              cardListItem.textContent = weatherCardInfo[i];
              cardList.appendChild(cardListItem);
            }
            card.appendChild(cardList);
            cardContainer.appendChild(card);
            console.log(dailyDateString);
            console.log(weatherData.daily[i]);
          }
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
