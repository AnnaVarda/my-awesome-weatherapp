let now = new Date();

let dateplaceholder = document.querySelector("p");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
dateplaceholder.innerHTML = `${day}, ${hours}:${minutes}`;

//function displayCity(event) {
//event.preventDefault();
//let textInput = document.querySelector("#search-text-input");
//let h1 = document.querySelector("h1");
//h1.innerHTML = `${textInput.value}`;
//}
//let form = document.querySelector("#search-form");
//form.addEventListener("submit", displayCity);

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

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#discription").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  temperatureElement.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "70b8d9569b173cc4fcd6655f362ece86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "70b8d9569b173cc4fcd6655f362ece86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

searchCity("Athens");
