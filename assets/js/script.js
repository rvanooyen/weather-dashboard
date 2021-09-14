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
                var tempEl = document.createElement("p");
                var windEl = document.createElement("p");
                var humidityEl = document.createElement("p");
                var uvIndexEl = document.createElement("P");
                var iconEl = document.createElement("i");

                // sets forecast elements
                cityEl.setAttribute("id", "city-element");
                cityEl.setAttribute("class", "city-element");
                cityEl.textContent = city + "(" + moment().format("l") + ")" + response.current.weather[0].icon + ".png";                
                iconEl.setAttribute("class", response.current.weather[0]);                                
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
                $("#city-element").append(iconEl);
                $("#today-forecast").append(cityEl);                
                $("#today-forecast").append(tempEl);
                $("#today-forecast").append(windEl);
                $("#today-forecast").append(humidityEl);
                $("#today-forecast").append(uvIndexEl);

                // appends five day forecast to dashboard
                for (i = 0; i < 5; i++) {

                };                
            })           
        });     
};