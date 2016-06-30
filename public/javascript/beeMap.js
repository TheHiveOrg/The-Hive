var map;
var markers = [];
var filterButton = $("input[type='button']");
function clearOverlays() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}
function addPins(data){
    var infowindow = new google.maps.InfoWindow();
    var beeData = [];
    data.forEach(function(data) {
        beeData.push(data);
    });

for(var i = 0; i < beeData.length; i++){
  console.log(beeData[i]);
      var image = '<h5>'+ beeData[i].species + '</h5>' + '<img src="' + beeData[i].image +'" width="100" height="100" />' + '<a href="/friendProfile/' + beeData[i].id +'"><p>' + beeData[i].first_name +' '+ beeData[i].last_name + '</p></a>'
      var marker = new google.maps.Marker({
          position: {lat: beeData[i].lat, lng: beeData[i].lng} ,
          map: map,
          title: image
      });
      markers.push(marker);
      google.maps.event.addListener(marker, 'click',function() {
          infowindow.setContent(this.title);
          infowindow.open(map, this);
    });
  }
}
function initMap() {

  $.get("http://localhost:3000/userData", function(data) {
    addPins(data);
  })

  $.get("https://the-hive-g25.herokuapp.com/userData", function(data) {
    addPins(data)
  });

  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.0902, lng: -95.7129},
      zoom: 9
});



function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
    marks.push(marker);
    map.panTo(position);
  }
}


if(navigator.geolocation) {

  browserSupportFlag = true;
  navigator.geolocation.getCurrentPosition(function(position) {
    initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    map.setCenter(initialLocation);
  }, function() {
    handleNoGeolocation(browserSupportFlag);
  });
}
// Browser doesn't support Geolocation
else {
  browserSupportFlag = false;
  handleNoGeolocation(browserSupportFlag);
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag === true) {
    alert("Geolocation service failed.");
    initialLocation = newyork;
  } else {
    alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
    initialLocation = siberia;
  }
  map.setCenter(initialLocation);
}

$(document).ready(function() {
$("input[type='button']").click(function() {
    switch(this.id) {
<<<<<<< HEAD
      case 'all': var Data = $.get("https://localhost:3000/userData");
=======
      case 'all': var Data = $.get("http://localhost:3000/userData");
>>>>>>> bd7c02904ac27ac08c726b6090d7fb3e2af55c7c
      break;
      case 'user': var Data = $.get("http://localhost:3000/mapData");
      break;
    }
    Data.then(function(data) {
      clearOverlays();
      addPins(data);
    });
  });


});
