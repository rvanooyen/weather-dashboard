// Weather Dashboard
// user clicks on search button
// saves a copy of the search location 
// displays the current weather and five day forecast for the location

$("#search-btn").on("click", function(event) {           
    // get values from text fields
    var city = document.getElementById("city-input").value;    
    getWeather(city);    
});

var getWeather = function(city) {
    var apiKey = "&appid=" + "f4574024d0e4cb4ce006c01517d66eb9";
    var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q="    
    
    fetch(urlWeather + city + apiKey)
        .then(function(response) {
            return response.json();           
        })
        .then(function(response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&units=imperial" + apiKey)
            .then(function(response) {
                return response.json();                
            })
            .then(function(response) {
                console.log(response);               

                // creates forecast elements
                var cityEl = document.createElement("p");
                var imgEl = document.createElement("img");
                var tempEl = document.createElement("p");
                var windEl = document.createElement("p");
                var humidityEl = document.createElement("p");
                var uvIndexEl = document.createElement("P");
                var iconEl = document.createElement("i");

                // sets forecast elements
                cityEl.setAttribute("id", "city-element");
                cityEl.setAttribute("class", "city-element");
                cityEl.textContent = city + "(" + moment().format("l") + ")";
                imgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");                                                
                tempEl.setAttribute("id", "city-temp");
                tempEl.textContent = "Temp: " + response.current.temp + " F";
                windEl.setAttribute("id", "city-wind");
                windEl.textContent = "Wind: " + response.current.wind_speed + " MPH";
                humidityEl.setAttribute("id", "city-humiditiy");
                humidityEl.textContent = "Humidity: " + response.current.humidity + "%";
                uvIndexEl.setAttribute("id", "city-uvIndex");
                uvIndexEl.setAttribute("class", "uv-element");
                uvIndexEl.textContent = "UV Index: " + response.current.uvi;

                // appends current weather to dashboard
                cityEl.append(imgEl);
                $("#city-element").append(iconEl);
                $("#today-forecast").append(cityEl);                
                $("#today-forecast").append(tempEl);
                $("#today-forecast").append(windEl);
                $("#today-forecast").append(humidityEl);
                $("#today-forecast").append(uvIndexEl);

                // local variables
                var startDate = moment();                                    
                var newDate = startDate;
                var displayDate = "";                

                // appends five day forecast to dashboard
                for (i = 0; i < 5; i++) {
                    var cardEl = document.createElement("div");
                    var cardDateEl = document.createElement("p");
                    var cardTempEl = document.createElement("p");
                    var cardWindEl = document.createElement("p");
                    var cardHumidityEl = document.createElement("p");
                    var cardImgEl = document.createElement("img");                    
                    
                    // increments the date by one day each iteration
                    newDate = newDate.add(1, "day");
                    displayDate = moment(newDate).format("l");

                    // sets forecast elements
                    cardEl.setAttribute("id", "card-element");
                    cardEl.setAttribute("class", "card col-sm-2");
                    cardDateEl.setAttribute("id", "card-date");
                    cardDateEl.textContent = displayDate;                    
                    cardImgEl.setAttribute("src", "http://openweathermap.org/img/wn/" + response.daily[i++].weather[0].icon + "@2x.png");                                                
                    cardTempEl.setAttribute("id", "card-temp");
                    cardTempEl.textContent = "Temp: " + response.daily[i++].temp.day + " F";
                    cardWindEl.setAttribute("id", "card-wind");
                    cardWindEl.textContent = "Wind: " + response.daily[i++].wind_speed + " MPH";
                    cardHumidityEl.setAttribute("id", "card-humiditiy");
                    cardHumidityEl.textContent = "Humidity: " + response.daily[i++].humidity + "%";

                    // appends cards to five day forecast
                    cardEl.append(cardDateEl);
                    cardEl.append(cardImgEl);
                    cardEl.append(cardTempEl);
                    cardEl.append(cardWindEl);
                    cardEl.append(cardHumidityEl);
                    $("#five-day-forecast").append(cardEl);
                };                
            })           
        });     
};