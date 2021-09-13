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

var cityGlobal = "";
var stateGlobal = "";

// user clicks on search button
$("#search-btn").on("click", function(event) { 
    console.log("here");       
    // get values from text fields
    var city = document.getElementById("city-input").value;
    cityGlobal = city;
    var state = document.getElementById("state-input").value;
    stateGlobal = state;
    console.log(cityGlobal, stateGlobal);               
});

var getWeather = function() {
    var apiKey = "f4574024d0e4cb4ce006c01517d66eb9";
    
    fetch(
        "api.openweathermap.org/data/2.5/weather?q=" + cityGlobal + "," + stateGlobal + "&appid=" + apiKey 
        )
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
        console.log(response.data[0]);
    //   var responseContainerEl = document.querySelector('#response-container');
    //   responseContainerEl.innerHTML = '';
    //   var gifImg = document.createElement('img');
    //   gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
    //   responseContainerEl.appendChild(gifImg);
    });
}

getWeather();

