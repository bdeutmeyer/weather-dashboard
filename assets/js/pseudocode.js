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
    //5-day forecast requires latitude and longitude, so figure out how to extract lat and long from our current weather response
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

    //API key: 2f4e60f9bd81d9d1b4be76ba147ad53c