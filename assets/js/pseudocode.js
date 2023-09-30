//Initial page load
    //load the search history from local storage and display it using perhaps a display search history function

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
    
        //list-item flex-row justify-space-between align-center