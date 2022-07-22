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
var cityStoredList = [];


var apiKey = "24420c1aa9e66418eaa645b4e80d7c35";

// get weather for city name
var getCurrentWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

    // make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            var cityName = data.name;
            displayWeather(data, cityName)
            storeCity(cityName);
        });
    });
};
// When I search a city, THEN I am presented with current and future conditions for that city and that city is added to the search history
var displayWeather = function(data, cityName) {
    var currentDate = moment().format("MMMM Do, YYYY");
    nameEl.textContent = cityName + " " + currentDate;

};

var displayForecast = function (cityName) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?q=" + cityName + "&exclude=minutely,houry,alerts&appid=" + apiKey + "&units=imperial";

    fetch(forecastURL)
    .then(response => response.json())
    .then(response => console.log(response));
};

// Store last searched city name.
var storeCity = function(saveName) {
    cityStoredList = JSON.parse(localStorage.getItem("cityList"));
    if (cityStoredList.indexOf(saveName) == -1) {
        cityStoredList.push(saveName);
        createBtn(saveName);
    }
    localStorage.setItem("cityList", JSON.stringify(cityStoredList));
    console.log(cityStoredList);
};

// call saved city names
function init() {
    if(JSON.parse(localStorage.getItem("cityList")) !== null) {
        cityStoredList= JSON.parse(localStorage.getItem("cityList"));
    } else {
        localStorage.setItem("cityList", json.stringify([]));
    }
}

// City name submit button handler
var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();

    if(cityName) {
        getCurrentWeather(cityName);
        inputEl.value = "";
    } else {
        alert("please enter a City Name");
    }
};

searchEl.addEventListener("click", formSubmitHandler);
init();