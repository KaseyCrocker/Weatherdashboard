var inputEl = document.getElementById("city-input");
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-history");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");4
var currentWindEl = document.getElementById("wind-speed");
var currentUVEl = document.getElementById("UV-index");
var historyEl = document.getElementById("history"); 
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory)

var apiKey = "24420c1aa9e66418eaa645b4e80d7c35";

// get weather for city name
var getCurrentWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    // make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
        });
    });
};
// When I search a city, THEN I am presented with current and future conditions for that city and that city is added to the search history
var displayWeather = function(data, cityName) {
    var currentDate = moment().format("MMMM Do, YYYY");
    nameEl.textContent = cityName + " " + currentDate;
};

// City name submit button handler
var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if(cityName) {
        getCurrentWeather(cityName);
        inputEl.value = "";
        localStorage.setItem("cityname", cityName);
        
    } else {
        alert("please enter a City Name");
    }
};

searchEl.addEventListener("click", formSubmitHandler);