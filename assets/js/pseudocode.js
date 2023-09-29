//Search history= simple array of strings

//Fetch weather data from Open Weather API
    //construct API URL using the user's input and api key
    //fetch data from the api using that constructed url
    //parse the json response
    //handle errors (like if the city is not found)
//Display current weather conditions
    //extract relevant data from api response (city name, date, icon for weather, temp, humidity, wind speed)
    //create elements
    //update the current weather container with elements
//Display 5-day forecast
    //extract forecast data from api response
    //loop through forecast data, and for each of 5 days, create html elements to display info
    //append elements to container
//Update search history
    //add searched city to search history array
    //store the search history array in local storage (setItem)
//Display search history
    //loop through search history array and create a clickable list of cities in search history container
    //add event listeners to list of items to allow users to click and view data for a previous search
//Event listener for search history clicks
    //add click event listener to container
    //when a city is clicked, call the fetch function and pass selected city as parameter
//Initial page load
    //load the search history from local storage and display it using perhaps a display search history function

// Current conditions data paths:
    // data.weather.main (basic description)
    // data.weather.icon ?? maybe?
    // data.wind[0].value ? - wind speed
    // data.main.humidity
    // data.main.temp (maybe do a rounding function?)

// Forecast data paths:
    // data.list[i].weather.main
    // data.list[i].weather.icon ??
    // data.list[i].wind[0].value ?
    // data.list[i].main.humidity
    // data.list[i].main.temp

// https://openweathermap.org/img/wn/{icon id}@2x.png

