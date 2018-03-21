var APIKey = "331f43d81f177bfe67fe00ca71dcd80d";
var longitute = "";
var latitude = "";
var geo = "";
var city ="orlando";
var zipcode="";

//for city, later can add for long&latitude
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&units=imperial&appid="
   + APIKey;


$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {

    console.log(queryURL);

    console.log(response);

    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    console.log("Cloud Cover: " + response.clouds.all + "%");

    $("#windSpeed").text(response.wind.speed);
    $("#humidity").text(response.main.humidity);
    $("#temperature").text(response.main.temp);
    $("#cloudCover").text(response.clouds.all);
    $("#description").text(response.weather[0].description);
    $("#city").text(response.name);

    var src = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png"
    var icon = $("<img>")
    $("#icon").append(icon.attr("src", src));
    

  });