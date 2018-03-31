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
var database = firebase.database();

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

var reset = function (){
  labelIndex = 0;
  counter = 0;
  myArray=[];
  flightPlan = [];
 }


weatherInitial();
var infoWindow = new google.maps.InfoWindow;
// creating google map

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 28.43,
      lng: -81.31
    },
    zoom: 12
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos1 = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos1);
      map.setCenter(pos1);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function initialize() {
    var mapOptions = {
            zoom: 9,
            center: new google.maps.LatLng(28.9285745, 77.09149350000007),   
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

    var map = new google.maps.Map(document.getElementById('location-canvas'),
                                    mapOptions);
                              
    var marker = new google.maps.Marker({
                    map: map, 
                    draggable: false, 
                    position: new google.maps.LatLng(28.9285745, 77.09149350000007)
        });
 }
                        
 google.maps.event.addDomListener(window, 'resize', initialize);
 google.maps.event.addDomListener(window, 'load', initialize);

  // create event listener for when map is clicked
  google.maps.event.addListener(map, 'click' ,function(event) {
    addMarker(event.latLng, map);
    
    longitude = event.latLng.lng();
    latitude = event.latLng.lat();
    faa = new Object();
    faa.longitude = longitude;
    faa.latitude = latitude;
    myArray.push(faa);
    weatherGeo();

    var uasURL ="http://uas-faa.opendata.arcgis.com/datasets/6269fe78dc9848d28c6a17065dd56aaf_0.geojson";

    // call the UAS database
    $.ajax({
      url: uasURL,
      method: "GET"
    }).then(function(response){
      // run a for loop to see if clicked location is in one of the squares on the UAS database
      for (i = 0; i < response.features.length; i++) {
        if (longitude > response.features[i].geometry.coordinates[0][0][0] && longitude < response.features[i].geometry.coordinates[0][2][0] && latitude < response.features[i].geometry.coordinates[0][1][1] && latitude > response.features[i].geometry.coordinates[0][0][1]) {
          var airportId = response.features[i].properties.AIRPORTID;
          var ceiling = response.features[i].properties.CEILING;
          console.log("found it");
        }
      }
      // if it's not
      if (airportId === undefined && ceiling === undefined) {
        console.log("not in UAS grid");
        var airportId = "No Airport";
        var ceiling = "N/A";
      }
      // append relevant airport information to the table
      $("#body").append("<tr><td>" + airportId + "</td><td>" + ceiling + "</td><td><input id='" + counter + "' type='text' class='form-control'</td><td> ? </td>");

      counter++;

    })
  });
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

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
    // creating the submit button and the event listener as an onclick function
    // storing the user input data as variables

$("#submit").on("click", function(event){
  for (i = 0; i < labelIndex; i++) {
    var requestedHeight = $("#" + i).val().trim();
    myArray[i].altitude = requestedHeight;
  }
  var onSiteDate = $("#onSiteDate").val().trim();
  var onSiteStartTime = $("#onSiteStartTime").val().trim();
  var onSiteEndTime = $("#onSiteEndTime").val().trim();
  var pilot = $("#pilot").val().trim();
  var crew = $("#crew").val().trim();
  var airCraft = $("#airCraft").val().trim();
  var internalNotes = $("#internalNotes").val().trim();

  if (myArray === "" || onSiteDate === "" || onSiteStartTime === "" || onSiteEndTime === "" || pilot === "" || crew === "" || airCraft === "" || internalNotes === "") {
    $("#body").append("<tr id='errorText'> <td colspan='4'> Please fill out all forms before submitting</td></tr>");
  } else {
    database.ref().push({
      onSiteDate: onSiteDate,
      onSiteStartTime: onSiteStartTime,
      onSiteEndTime: onSiteEndTime,
      pilot: pilot,
      crew: crew,
      airCraft: airCraft,
      internalNotes: internalNotes,
      faaData: myArray,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });
  
    for (i = 0; i < myArray.length; i++) {
      flightPlan[i] = {lat: myArray[i].latitude, lng: myArray[i].longitude};
    };
    flightPlan[myArray.length] = {lat: myArray[0].latitude, lng: myArray[0].longitude}
  
    // Construct the polygon.
    var shape = new google.maps.Polygon({
      paths: flightPlan,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    
    shape.setMap(map);
  
    $("#body").empty();
    $("#onSiteDate").val("");
    $("#onSiteStartTime").val("");
    $("#onSiteEndTime").val("");
    $("#pilot").val("");
    $("#crew").val("");
    $("#airCraft").val("");
    $("#internalNotes").val("");
    reset();
  };

  

});
$("#clear").on("click", function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 28.43,
      lng: -81.31
    },
    zoom: 12
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos1 = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos1);
      map.setCenter(pos1);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function initialize() {
    var mapOptions = {
            zoom: 9,
            center: new google.maps.LatLng(28.9285745, 77.09149350000007),   
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

    var map = new google.maps.Map(document.getElementById('location-canvas'),
                                    mapOptions);
                              
    var marker = new google.maps.Marker({
                    map: map, 
                    draggable: false, 
                    position: new google.maps.LatLng(28.9285745, 77.09149350000007)
        });
 }
                        
 google.maps.event.addDomListener(window, 'resize', initialize);
 google.maps.event.addDomListener(window, 'load', initialize);

  // create event listener for when map is clicked
  google.maps.event.addListener(map, 'click' ,function(event) {
    addMarker(event.latLng, map);
    
    longitude = event.latLng.lng();
    latitude = event.latLng.lat();
    faa = new Object();
    faa.longitude = longitude;
    faa.latitude = latitude;
    myArray.push(faa);
    weatherGeo();

    var uasURL ="http://uas-faa.opendata.arcgis.com/datasets/6269fe78dc9848d28c6a17065dd56aaf_0.geojson";

    // call the UAS database
    $.ajax({
      url: uasURL,
      method: "GET"
    }).then(function(response){
      // run a for loop to see if clicked location is in one of the squares on the UAS database
      for (i = 0; i < response.features.length; i++) {
        if (longitude > response.features[i].geometry.coordinates[0][0][0] && longitude < response.features[i].geometry.coordinates[0][2][0] && latitude < response.features[i].geometry.coordinates[0][1][1] && latitude > response.features[i].geometry.coordinates[0][0][1]) {
          var airportId = response.features[i].properties.AIRPORTID;
          var ceiling = response.features[i].properties.CEILING;
          console.log("found it");
        }
      }
      // if it's not
      if (airportId === undefined && ceiling === undefined) {
        console.log("not in UAS grid");
        var airportId = "No Airport";
        var ceiling = "N/A";
      }
      // append relevant airport information to the table
      $("#body").append("<tr><td>" + airportId + "</td><td>" + ceiling + "</td><td><input id='" + counter + "' type='text' class='form-control'</td><td> ? </td>");

      counter++;

    })
  });
})

