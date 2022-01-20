var Geo={};
var object;
var messageLng = document.getElementById('lng');
var messageLat = document.getElementById('lat');
var message = document.getElementById('message');
var weatherLocation = document.getElementById('weatherLocation');

var weatherImages = {
  "clear-day": "img/sunny.png",
  "clear-night": "img/moon.png",
  "rain": "img/rain.png",
  "snow": "img/snow.png",
  "sleet": "img/sleet.png",
  "wind": "img/wind.png",
  "fog": "img/fog.png",
  "cloudy": "img/cloudy.png",
  "partly-cloudy-day": "img/partly-cloudy.png",
  "partly-cloudy-night": "img/night.png",
  "hail": "https://previews.dropbox.com/p/orig/AAJlKVDYi57Xq9L6n4qZrmxZKnwbiDGMd-mp-jS1FcTloMav4RXmP-JuCA79M1ZU16go8oaV2g_u99nXW6mi87WQddIK3YWQSYAv4fv3mYRZYJ7k5YhUF6MvhbfYM6xmxmbO1Xqqp-GWRW-M4DpTsYBz/p.svg?size_mode=5",
  "thunderstorm": "https://previews.dropbox.com/p/orig/AAIuGPz4OcWqECr09-Odi9XYxT4h8AnnT778KgJJijUssgG4Ou-1hKy3Adt5k_J9_e5WtfStvA07zdvG9qJjqpI7c_U5-oxNlhara3kYKMBILWlv5TbWYOpOvmAROTLRVBOuD0bGBqkvnGkpPollPm_E/p.svg?size_mode=5"
}

var humidity;
var weatherIcon;
var pressure;
var uvIndex;
var temperature;
var temperatureIcon;
var windBearing;
var windSpeed;
var weatherSummary;


function error() {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function success(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    messageLng.innerHTML = "<div><strong>Longitude:</strong> " + lng + "</div>";
    messageLat.innerHTML = "<div><strong>Latitude:</strong> " + lat + "</div>";
    message.innerHTML = '';

    displayLocation(lat,lng);
    showWeather(lat,lng);
}   

function displayLocation(latitude,longitude){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address ;
                    var  value = add.split(",");

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    weatherLocation.innerHTML = city + ", " + country;
                }
                else  {
                    weatherLocation.innerHTML = "address not found";
                }
            }
            else {
                weatherLocation.innerHTML = "Geocoder failed due to: " + status;
            }
        }
    );
}

function showWeather(lat, long) {
    var url = 'https://api.darksky.net/forecast/3e2ec23daa87475872ce5a0c9581574a/' + lat + ',' +long + '?format=jsonp&callback=displayWeather';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object);   
 }



function displayWeather(object) {
    console.log(object.currently);
    weatherIcon.src = weatherImages[object.currently.icon];
    temperatureF.innerHTML = farenheitToCelsius(object.currently.temperature) + " C";
    temperatureC.innerHTML =  object.currently.temperature + " F"
    weatherSummary.innerHTML = object.currently.summary;

}


function farenheitToCelsius(k) {
    return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
    return Math.round(h * 100);
}

function degreesToDirection(degrees) {
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    for (i in angles) {

        if(degrees>= low && degrees < high)
            return angles[i];

        low = (low + range) % 360;
        high = (high + range) % 360;
    }
}

function knotsToKilometres(knot) {
    return Math.round(knot * 1.852);
}


window.onload = function() {
    weatherIcon = document.getElementById("current-icon");
    temperatureF = document.getElementById("current-temperature-f");
    temperatureC = document.getElementById("current-temperature-c");
    weatherSummary = document.getElementById("weather-summary");
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success,error);
}
else {
    message.innerHTML = 'Sorry, Geolocation is not supported :(';
}

function classToggle() {
    this.classList.toggle('hide');
    this.classList.toggle('show');
}
document.querySelector('.temp').addEventListener('click', classToggle);

