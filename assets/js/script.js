// var createTable = function() {
//     for (i = 0; i < hoursArr.length; i++) {       
//         var rowEl = document.createElement("div");
//         var labelEl = document.createElement("div");
//         var colEl = document.createElement("div");
//         var buttonEl = document.createElement("button");
//         rowEl.setAttribute("id", "rowHeading");
//         rowEl.setAttribute("class", "row");
//         labelEl.setAttribute("id", "labelTitle");
//         labelEl.setAttribute("class", "col-sm-2 hour");
//         labelEl.setAttribute("p", hoursArr[i]);
//         colEl.setAttribute("id", "colTitle");
//         var textInputEl = document.createElement("textarea");
//         textInputEl.setAttribute("style", "dispaly:none");
//         colEl.append(textInputEl);        

//         // apply new class if task is past present or future
//         if (moment().hour() > hoursArr[i]) {
//             colEl.setAttribute("class", "col-sm-8 past");
//         } else if (moment().hour() === hoursArr[i]) {
//             colEl.setAttribute("class", "col-sm-8 present");
//         } else {
//             colEl.setAttribute("class", "col-sm-8 future");
//         }
//         if (hoursArr[i] < 12) {
//             labelEl.textContent = moment().hour(hoursArr[i]).format("h") + ":00 AM";
//         } else {
//             labelEl.textContent = moment().hour(hoursArr[i]).format("h") + ":00 PM";
//         }               
//         buttonEl.setAttribute("id", "saveButton");
//         buttonEl.setAttribute("class", "btn col-sm-2");
//         // buttonEl.setAttribute();
//         rowEl.appendChild(labelEl);
//         rowEl.appendChild(colEl);
//         rowEl.appendChild(buttonEl);        
//         $("#hours-container").append(rowEl);        
//     }
// };

// user clicks on search button
$("#search-btn").on("click", function(event) {           
    // get values from text fields
    var city = document.getElementById("city-input").value;    
    var data = getWeather(city);    
});

var getWeather = function(city) {
    var apiKey = "&appid=" + "f4574024d0e4cb4ce006c01517d66eb9";
    var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q="
    // var urlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + apiKey
    
    fetch(urlWeather + city + apiKey)
        .then(function(response) {
            return response.json();           
        })
        .then(function(response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            // getOneCall(lat, lon);
            // fetch(urlOneCall(lat, lon)
            // .then(function(response) {
            //     return response.json();                
            // })
            // .then(function(response) {
                console.log(response);
                console.log(response.main.humidity);
                console.log(response.main.temp);
                console.log(response.name); 
                console.log(response.wind.speed);
            // })           
        });

    
    //     var responseContainerEl = document.querySelector('#response-container');
    //     responseContainerEl.innerHTML = '';
    //     var gifImg = document.createElement('img');
    //     gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
    //     responseContainerEl.appendChild(gifImg);
    //   });
  // }    
};

var getOneCall = function(lat, lon) {
    fetch(urlOneCall)
            .then(function(response) {
                return response.json();                
            })
            .then(function(response) {
                console.log(response);
                console.log(response.main.humidity);
                console.log(response.main.temp);
                console.log(response.name); 
                console.log(response.wind.speed);
    });
};