function formatDate(timestamp) {
  let date = new Date(timestamp);
  //let dateplaceholder = document.querySelector("#today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
  return `${hours}:${minutes}`;
}

function celsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemperature");
  currentTemperature.innerHTML = "";
}
function fahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemperature");
  currentTemperature.innerHTML = "";
}

let celsiusButton = document.querySelector(".degrees");
celsiusButton.addEventListener("click", celsius);
let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", fahrenheit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#today");

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed);
  document.querySelector("#discription").innerHTML =
    response.data.weather[0].main;
  temperatureElement.innerHTML = `${temperature}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
  forecastElement.innerHTML += `
   <div class="col-2"> 
   ${formatHours(forecast.dt * 1000)}
 <img 
    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    />
  <div class="weather-forecast-temperature">
  <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
</div>
</div>`;
  }
}

function searchCity(city) {
  let apiKey = "70b8d9569b173cc4fcd6655f362ece86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
  let apiKey = "70b8d9569b173cc4fcd6655f362ece86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${position.coords.latitude}&appid=${position.coords.longitude}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  searchCity(city.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("degrees");
  fahrenheitLink.classList.add("degrees");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
 event.preventDefault();
 celsiusLink.classList.add("degrees");
 fahrenheitLink.classList.remove("degrees");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Athens");
