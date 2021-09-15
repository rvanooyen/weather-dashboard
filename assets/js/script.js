// Weather Dashboard
// user clicks on search button
// saves a copy of the search location 
// displays the current weather and five day forecast for the 

var citiesArr = [];

var clearWeather = function() {
    var weatherAreaEl = document.getElementById("weather-area");
    weatherAreaEl.innerHTML = "";
}

$("#search-btn").on("click", function(event) {
    // clears weather area
    clearWeather();
    
    // get values from text fields
    var city = document.getElementById("city-input").value;
        
    getWeather(city);    
});

var saveCity = function(city) {
    citiesArr.push(city);
    for (i = 0; i < citiesArr.length; i++) {
        localStorage.setItem("string", citiesArr[0]);
    }
};

var getWeather = function(city) {
    var apiKey = "&appid=" + "f4574024d0e4cb4ce006c01517d66eb9";
    var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";        
    
    fetch(urlWeather + city + apiKey)
        .then(function(response) {
            if (response.ok) {
                saveCity(city);
                return response.json();
            } else {
                alert("Error: " + response.statusText);
            }                       
        })
        .then(function(response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&units=imperial" + apiKey)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Error: " + response.statusText);
                }                                
            })
            .then(function(response) {
                console.log(response);               

                // creates forecast elements
                var todayForecastEl = document.createElement("div");
                var cityEl = document.createElement("p");
                var imgEl = document.createElement("img");
                var tempEl = document.createElement("p");
                var windEl = document.createElement("p");
                var humidityEl = document.createElement("p");
                var uvIndexEl = document.createElement("P");
                var fiveDayEl = document.createElement("div");
                var fiveDayTitleEl = document.createElement("h3");
                var cardDivEl = document.createElement("div");                                

                // sets forecast elements
                todayForecastEl.setAttribute("id", "today-forecast");
                cityEl.setAttribute("id", "city-element");
                cityEl.setAttribute("class", "city-element");
                cityEl.textContent = city + "(" + moment().format("l") + ")";
                imgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + ".png");                                                
                tempEl.setAttribute("id", "city-temp");
                tempEl.textContent = "Temp: " + response.daily[0].temp.day + " \u00B0F";
                windEl.setAttribute("id", "city-wind");
                windEl.textContent = "Wind: " + response.daily[0].wind_speed + " MPH";
                humidityEl.setAttribute("id", "city-humiditiy");
                humidityEl.textContent = "Humidity: " + response.daily[0].humidity + "%";
                uvIndexEl.setAttribute("id", "city-uvIndex");
                uvIndexEl.setAttribute("class", "uv-element");
                uvIndexEl.textContent = "UV Index: " + response.daily[0].uvi;
                cardDivEl.setAttribute("id", "card-div-element");
                cardDivEl.setAttribute("class", "d-flex flex-row justify-content-around");
                fiveDayEl.setAttribute("id", "five-day-forecast");
                fiveDayTitleEl.setAttribute("class", "cards title");
                fiveDayTitleEl.textContent = "5-Day Forecast";

                // appends current weather to dashboard
                cityEl.append(imgEl);                
                todayForecastEl.append(cityEl);
                todayForecastEl.append(imgEl);                
                todayForecastEl.append(tempEl);
                todayForecastEl.append(windEl);
                todayForecastEl.append(humidityEl);
                todayForecastEl.append(uvIndexEl);
                $("#weather-area").append(todayForecastEl);
                $("#weather-area").append(fiveDayTitleEl);

                // local variables
                var startDate = moment();                                                    
                var newDate = startDate;
                var displayDate = "";                                

                // appends five day forecast to dashboard
                for (i = 1; i < 6; i++) {                    
                    var cardEl = document.createElement("div");
                    var cardDateEl = document.createElement("p");
                    var cardTempEl = document.createElement("p");
                    var cardWindEl = document.createElement("p");
                    var cardHumidityEl = document.createElement("p");
                    var cardImgDiv = document.createElement("div");
                    var cardImgEl = document.createElement("img");                                      
                    
                    // increments the date by one day each iteration
                    newDate = newDate.add(1, "day");                    
                    displayDate = moment(newDate).format("l");

                    // sets forecast elements                    
                    cardEl.setAttribute("id", "card-element");
                    cardEl.setAttribute("class", "pt-0 pl-0 pb-0 pr-1 d-flex flex-wrap card col-sm-2");
                    cardDateEl.setAttribute("id", "card-date");
                    cardDateEl.textContent = displayDate;                    
                    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png");                                                
                    cardTempEl.setAttribute("id", "card-temp");
                    cardTempEl.textContent = "Temp: " + response.daily[i].temp.day + " \u00B0F";
                    cardWindEl.setAttribute("id", "card-wind");
                    cardWindEl.textContent = "Wind: " + response.daily[i].wind_speed + " MPH";
                    cardHumidityEl.setAttribute("id", "card-humiditiy");
                    cardHumidityEl.textContent = "Humidity: " + response.daily[i].humidity + "%";

                    // appends cards to five day forecast
                    cardEl.append(cardDateEl);
                    cardImgDiv.append(cardImgEl);
                    cardEl.append(cardImgDiv);
                    cardEl.append(cardTempEl);
                    cardEl.append(cardWindEl);
                    cardEl.append(cardHumidityEl);
                    cardDivEl.append(cardEl);
                    fiveDayEl.append(cardDivEl);
                };                
                $("#weather-area").append(fiveDayEl);                
            })           
        });     
};