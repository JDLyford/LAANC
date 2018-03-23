
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1Exght0S1PthGRMHG64arxtytH1HeGik",
  authDomain: "laanc-1800.firebaseapp.com",
  databaseURL: "https://laanc-1800.firebaseio.com",
  projectId: "laanc-1800",
  storageBucket: "",
  messagingSenderId: "811344206487"
};
firebase.initializeApp(config);

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
  


    $("#windSpeed").text(response.wind.speed);
    $("#humidity").text(response.main.humidity);
    $("#temperature").text(response.main.temp);
    $("#cloudCover").text(response.clouds.all);
    $("#description").text(response.weather[0].description);
    $("#city").text(response.name);
    $("#visibility").text(response.visibility + "Meters");


    var src = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png"
    var icon = $("<img>")
    $("#icon").append(icon.attr("src", src));
  });

    // creating the submit button and the event listener as an onclick function
    // storing the user input data as variables

    $("#submit").on("click", function(event){
      var onSiteDate = $("#onSiteDate").val().trim();
      var onSiteTime = $("#onSiteTime").val().trim();
      var pilot = $("#pilot").val().trim();
      var crew = $("#crew").val().trim();
      var airCraft = $("#airCraft").val().trim();
      var internalNotes = $("#internalNotes").val().trim();
      console.log(onSiteDate);
    })

    $("#main-div").on("click", function(event){
      var uasURL ="http://uas-faa.opendata.arcgis.com/datasets/6269fe78dc9848d28c6a17065dd56aaf_0.geojson";
      
      $.ajax({
        url: uasURL,
        method: "GET"
      }).then(function(response){
        var airportId = response.features[0].properties.AIRPORTID;
        console.log(response);
        console.log(response.features[0].properties.AIRPORTID);
        console.log(response.features[0].properties.CEILING);

      })

    })


    

 