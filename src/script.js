function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let day = ["Thu", "Fri", "Sat"];
  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
          <div class="weather-forecast-date">Thu</div>
              <img
                  src="http://openweathermap.org/img/wn/03d@2x.png"
                  alt=""
                  width="50px"
              />
          <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">18°</span>
              <span class="weather-forecast-temperature-min">12°</span>
          </div>
       </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let weather = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let displayCityName = document.querySelector("h1");
  let displayWeather = document.querySelector(".largeTemp");
  let mainIcon = document.querySelector("#mainIcon");

  displayCityName.innerHTML = `${cityName}`;
  displayWeather.innerHTML = `${weather}`;

  celsius = response.data.main.temp;

  document.querySelector("h5").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "1b5c1d1caa03aacc229826f51a319b3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;
  searchCity(city);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let displayWeather = document.querySelector(".largeTemp");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  displayWeather.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let displayWeather = document.querySelector(".largeTemp");
  displayWeather.innerHTML = Math.round(celsius);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

function searchlocation(position) {
  let apiKey = "1b5c1d1caa03aacc229826f51a319b3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchlocation);
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentTime = new Date();
let h2 = document.querySelector("h2");
let date = currentTime.getDate();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let year = currentTime.getFullYear();
let day = days[currentTime.getDay()];
let month = months[currentTime.getMonth()];
if (minutes < 10) {
  minutes = "0" + minutes;
}
h2.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

searchCity("Cardiff");
displayForecast();
