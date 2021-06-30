// use this one first to input it into one call
var apiGEO = "https://api.openweathermap.org/geo/1.0/direct?q=";
var apiLimit = "&limit=1";
var apiKeyGeo = "&appid=768aa7a7e0d2b88c9f37ace597e736b1";

var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?";
var apiOneKey = "&appid=854c21eb3279749a4ac5a753549618a4";
var searchResults = document.getElementById("search").value;
var lat;
var lon;

document.getElementById("btn").addEventListener("click", myFuntion);



// function buttonListener(event) {
//     if (event.target.matches()) {
//         searchResults = document.getElementById("search").value;
//         var btn = document.createElement("button");
//         btn.setAttribute("class", "buttonPrevious");

//         btn.textContent = searchResults;
//         var list = document.getElementById("pervious-results");
//         list.append(btn);
//     } else {
//         //user clicked on a history button
//         searchResults = list
//     }
// }




function myFuntion() {
    searchResults = document.getElementById("search").value;
    var btn = document.createElement("button");
    btn.textContent = searchResults;
    var list = document.getElementById("pervious-results");
    list.append(btn);

    /// try and set up an if statement to get the value of the button again.



    // if () {
    //     searchResults = document.getElementById("search").value;
    //     var btn = document.createElement("button");
    //     btn.textContent = searchResults;
    //     var list = document.getElementById("pervious-results");
    //     list.append(btn);
    // } else {
    //     //user clicked on a history button
    //     searchResults = list
    // }









    fetch(apiGEO + searchResults + apiLimit + apiKeyGeo)
        .then(function(userResponse) {
            return userResponse.json();
        })
        .then(function(userResponse) {
            lat = userResponse[0].lat;
            lon = userResponse[0].lon;
        })
        .then(function() {
            fetch(
                    apiOneCall +
                    "lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&units=imperial" +
                    apiOneKey
                )
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    console.log(response);
                    var temp = response.current.temp;

                    var uvIn = response.current.uvi;
                    var humin = response.current.humidity;
                    var wind = response.current.wind_speed;
                    var responseContainerEl = document.querySelector("#main-location");
                    responseContainerEl.innerHTML = "";
                    var tempP = document.createElement("li");
                    var uvP = document.createElement("li");
                    var huminP = document.createElement("li");
                    var windP = document.createElement("li");
                    var city = document.createElement("h1");
                    city.textContent = searchResults;
                    responseContainerEl.appendChild(city);
                    huminP.textContent = "Humidity: " + humin;
                    tempP.textContent = "Temp: " + temp;
                    uvP.textContent = "UV Index: " + uvIn;
                    windP.textContent = "Wind Speed: " + wind;
                    responseContainerEl.appendChild(huminP);
                    responseContainerEl.appendChild(tempP);
                    responseContainerEl.appendChild(uvP);
                    responseContainerEl.appendChild(windP);

                    var cards = document.querySelector(".card-group");
                    console.log(cards)
                    for (var i = 1; i < 6; i++) {
                        var divCard = document.createElement("div");
                        divCard.setAttribute("class", "card");
                        var divCardBody = document.createElement("div");
                        divCardBody.setAttribute("class", "card-body");
                        var h5CardTitle = document.createElement("h5");
                        h5CardTitle.setAttribute("class", "card-text");
                        h5CardTitle.textContent = moment.unix(response.daily[i].dt).format("dddd");

                        var ulCardText = document.createElement("ul");
                        ulCardText.setAttribute("class", "card-text");

                        var liTemp = document.createElement("li");
                        liTemp.textContent = "Temp: " + response.daily[i].temp.day;
                        var liWind = document.createElement("li");
                        liWind.textContent = "Wind Speed: " + response.daily[i].wind_speed;
                        var liHumidity = document.createElement("li");
                        liHumidity.textContent = "Humidity: " + response.daily[i].humidity;
                        var liUv = document.createElement("li");
                        liUv.textContent = "UV Index: " + response.daily[i].uvi;
                        ulCardText.append(liTemp);
                        ulCardText.append(liWind);
                        ulCardText.append(liHumidity);
                        ulCardText.append(liUv);
                        divCardBody.append(h5CardTitle);
                        divCardBody.append(ulCardText);
                        divCard.append(divCardBody);
                        cards.append(divCard);


                        // add a clear so that it doesnt get messy



                    }

                });
        });
}