var searchSectionEl = document.getElementById('search');
var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search-input');
// var submitBtn = document.getElementById('submit-button'); -- probably unnecessary...unless needed for styling, delete id in html too
var searchHistoryEl = document.getElementById('search-history');
var searchHistory = JSON.parse(localStorage.getItem('city')) || [];
var currentWeatherEl = document.getElementById('current-weather');
var forecastEl = document.getElementById('5day-forecast');
var apiKey = '2f4e60f9bd81d9d1b4be76ba147ad53c';
var baseURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
var geocodeURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'

var searchFormHandler = function(event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
    if (city) {
        fetchData(city);
        searchInputEl.value = '';
    
    searchHistory.push(city);
    localStorage.setItem('city', JSON.stringify(searchHistory));
    } else {
        alert('City not found');
    }
}

var fetchData = function(cityName) {
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid={API key}'

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayRepos(data, user);
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })


}

searchFormEl.addEventListener('submit', searchFormHandler);

//Example api call: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
//Example api path: data[i].lat OR data[i].lon
// 