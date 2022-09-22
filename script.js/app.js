let weather = {
    apiKey: "4a36cbb2c458c2e6868882f21a9e11b2",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".card_weather-city").innerText = name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".card_weather-descr").innerText = description;
        document.querySelector(".card_weather-temp").innerText = temp + "°C";
        document.querySelector(".card_weather-humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".card_weather-wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".card_weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1700x1000/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".card_search-bar").value);
    },
};

// let geocode = {
//     reverseGeocode: function (latitude, longitude) {
//         var api_key = '49c53b9549714f0ea00df0d66d807dce';
//         var api_url = 'https://api.opencagedata.com/geocode/v1/json'

//         var request_url = api_url
//             + '?'
//             + 'key=' + api_key
//             + '&q=' + encodeURIComponent(latitude + ',' + longitude)
//             + '&pretty=1'
//             + '&no_annotations=1';

//         var request = new XMLHttpRequest();
//         request.open('GET', request_url, true);

//         request.onload = function () {

//             if (request.status === 200) {

//                 var data = JSON.parse(request.responseText);
//                 weather.fetchWeather(data.results[0].components.city);
//             } else if (request.status <= 500) {

//                 console.log("unable to geocode! Response code: " + request.status);
//                 var data = JSON.parse(request.responseText);
//                 console.log('error msg: ' + data.status.message);
//             } else {
//                 console.log("server error");
//             }
//         };

//         request.onerror = function () {

//             console.log("unable to connect to server");
//         };

//         request.send();
//     },
//     getLocation: function() {
//         function success (data) {
//             geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
//         }
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, console.error);
//         }
//         else {
//             weather.fetchWeather("Dubai");
//         }
//     }
// }

document.querySelector(".card_search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".card_search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// geocode.getLocation();