var searchSectionEl = document.getElementById('search');
var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search-input');
// var submitBtn = document.getElementById('submit-button'); -- probably unnecessary...unless needed for styling, delete id in html too
var searchHistoryEl = document.getElementById('search-history');
var searchHistory = JSON.parse(localStorage.getItem('city')) || [];
var currentWeatherEl = document.getElementById('current-weather');
var currentWeatherHeading = document.getElementById('current-weather-heading');
var currentWeatherData = document.getElementById('current-weather-data');
var forecastEl = document.getElementById('5day-forecast');
var forecastHeading = document.getElementById('forecast-heading');

var renderDate = function() {
    var currentDate = document.getElementById('date');
    var now = dayjs().format('MMM DD, YYYY');
    currentDate.textContent = now;

}

var searchFormHandler = function(event) {
    event.preventDefault();
    var city = searchInputEl.value.trim();
    if (city) {
        fetchCoordinates(city);
        renderHistory(city);
        searchInputEl.value = '';
        searchHistory.push(city);
        localStorage.setItem('city', JSON.stringify(searchHistory));
        } else {
            alert('City not found');
        }
    }

var fetchCoordinates = function(cityName) {
    var geocodeURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=2f4e60f9bd81d9d1b4be76ba147ad53c';

    fetch(geocodeURL)
        .then(function (response) {
            if (response.ok) {
            response.json()
            .then(function (data) {
                fetchCurrentData(data[0].lat, data[0].lon);
                fetchForecastData(data[0].lat, data[0].lon);
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
}

var fetchCurrentData = function(lat, lon) {
    var currentURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2f4e60f9bd81d9d1b4be76ba147ad53c';

    fetch(currentURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json()
                .then(function (data) {
                    console.log(data);
                    renderCurrent(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}

var fetchForecastData = function(lat, lon) {
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +  '&lon=' + lon + '&units=imperial&appid=2f4e60f9bd81d9d1b4be76ba147ad53c';

    fetch(forecastURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json()
                .then(function (data) {
                    console.log(data.list);
                    renderForecast(data.list);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}

var renderCurrent = function(data) {
    currentWeatherHeading.textContent = 'Current conditions in ' + data.name;
    if (currentWeatherData.hasChildNodes()) {
        currentWeatherData.innerHTML = null;
    } 
    var currentCondition = document.createElement('li');
    var currentConditionIcon = document.createElement('img');
    var currentTemp = document.createElement('li');
    var currentHumidity = document.createElement('li');
    var currentWind = document.createElement('li');
    
    currentCondition.textContent = data.weather[0].main + ' '
    currentCondition.setAttribute('style', 'display: inline; font-size: 135%; font-weight: bolder')
    currentConditionIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
    console.log(data.weather[0].icon);
    currentTemp.textContent = 'Temperature: ' + data.main.temp + '˚ F';
    currentHumidity.textContent = 'Humidity: ' + data.main.humidity + 
    '%';
    currentWind.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';

    currentWeatherData.append(currentCondition, currentConditionIcon, currentTemp, currentHumidity, currentWind);
}




var renderForecast = function(data) {
    forecastHeading.textContent = '5-day forecast for ' + data.name;
    if (forecastEl.hasChildNodes()) {
        forecastEl.innerHTML = null;
    } 
    // var day1Forecast = document.createElement('div');
    // var day2Forecast = document.createElement('div');
    // var day3Forecast = document.createElement('div');
    // var day4Forecast = document.createElement('div');
    // var day5Forecast = document.createElement('div');
    
    var tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    var forecastDate = data[0].dt_txt;
    var matchDate = function() {
        for (i = 0; i < 6; i++) {
            if (forecastDate.startsWith(tomorrow)) {
                console.log(data[i].dt_txt);
            }
        }
        //     var tomorrowIndex = function() {

        //     } 
        //     var dataIndex = data[i].findIndex(tomorrowIndex);
        //     // break;
        //        console.log(dataIndex);
        // }
        // for (i = 0; i < 6; i++) {

        // }


    }
matchDate();
}
//     var tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
//     console.log(tomorrow);

//     day1Forecast.textContent = dayjs(data);
//     currentCondition.textContent = data.weather[0].main + ' '
//     currentCondition.setAttribute('style', 'display: inline; font-size: 135%; font-weight: bolder')
//     currentConditionIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
//     console.log(data.weather[0].icon);
//     currentTemp.textContent = 'Temperature: ' + data.main.temp + '˚ F';
//     currentHumidity.textContent = 'Humidity: ' + data.main.humidity + 
//     '%';
//     currentWind.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';

//     forecastEl.append(day1Forecast, day2Forecast, day3Forecast, day4Forecast, day5Forecast);
// }

var renderHistory = function(city) {
    var pastCityEl = document.createElement('button');
    pastCityEl.textContent = city;
    searchHistoryEl.appendChild(pastCityEl);
}

searchFormEl.addEventListener('submit', searchFormHandler);
searchHistoryEl.addEventListener('click', function(event) {
    var isItAButton = event.target.nodeName === 'BUTTON';
    if (!isItAButton) {
      return;
    } else {
        fetchCoordinates(event.target.textContent);
    }
    
})

renderDate();
//Example api path: data[i].lat OR data[i].lon
//Forecast response: data.list[i].
//Forecast list - new index every 3 hours. To get highs and lows, maybe 3 pm or 6 pm for highs, 3 am for lows? Match date? Take wind and humidity and stuff from that?