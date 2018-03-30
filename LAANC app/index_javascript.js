 
var APIKey = "331f43d81f177bfe67fe00ca71dcd80d";
var longitude;
var latitude;
var city ="orlando";
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var counter = 0;
var faa;
var myArray = [];
var flightPlan = [];


weatherInitial();

var config = {
"airmap": {
    "api_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsX2lkIjoiY3JlZGVudGlhbHxNbGFvQTdwVVdCMm5kYnU0a21OTU90ZzBSOG80IiwiYXBwbGljYXRpb25faWQiOiJhcHBsaWNhdGlvbnxxT2VEMEc1dDVnTmVkYmlOQTUyNFJUblozWWEiLCJvcmdhbml6YXRpb25faWQiOiJkZXZlbG9wZXJ8YlE0ejlPNkk2OW42Qm9UNDhSZGQ1SWxETVdZRyIsImlhdCI6MTUyMjE5MDQzMn0.rS8sgOCyeLHzuS2bpc2gijeoQbsmdTlv41Ca5YcU8mY"},
    "auth0": {
        "client_id": null,
        "callback_url": null
    },
    "mapbox": {
        "access_token": "pk.eyJ1IjoidG9waGx1Y2siLCJhIjoiY2pmYWFmZ3JtMTVwNjJ5b2JjMnJuaHVhMiJ9.x6hfumkAkmeqKIrbohmCIg"
    }
}
var map = new Airmap.Map(config, {
container: 'map',
center: [37.0902, -95.7129],
zoom: 3,
theme: 'standard',
layers: ['tfrs', 'sua_prohibited', 'airports_commercial', 'sua_restricted']
});

function weatherGeo(){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude + "&lon=" + longitude +"&units=imperial&appid="
+ APIKey;
$("#icon img:last-child").remove();
$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
    $("#windSpeed").text(response.wind.speed);
    $("#humidity").text(response.main.humidity);
    $("#temperature").text(response.main.temp + "°");
    $("#cloudCover").text(response.clouds.all);
    $("#description").text(response.weather[0].description.toUpperCase());
    $("#city").text(response.name);
    $("#visibility").text(response.visibility + " Meters");
    var src = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png"
    var icon = $("<img>")
    $("#icon").append(icon.attr("src", src));
});
}
function weatherInitial(){
    queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&units=imperial&appid="
    + APIKey,
$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
    $("#windSpeed").text(response.wind.speed);
    $("#humidity").text(response.main.humidity);
    $("#temperature").text(response.main.temp + "°");
    $("#cloudCover").text(response.clouds.all);
    $("#description").text(response.weather[0].description.toUpperCase());
    $("#city").text(response.name);
    $("#visibility").text(response.visibility + " Meters");
    var src = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png"
    var icon = $("<img>")
    $("#icon").append(icon.attr("src", src));
});
}
  