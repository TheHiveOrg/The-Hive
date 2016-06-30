var map;
var markers = [];

function addPins(data){
  var infowindow = new google.maps.InfoWindow();
    var beeData = [];
    data.forEach(function(data) {
        beeData.push(data);
    })

    for(var i = 0; i < beeData.length; i++){
      var image = '<h5>'+ beeData[i].species + '</h5>' + '<img src="' + beeData[i].image +'" width="100" height="100" />'
      var marker = new google.maps.Marker({
          position: {lat: beeData[i].lat, lng: beeData[i].lng} ,
          map: map,
          title: image
      });
      markers.push(marker);
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.title);
          infowindow.open(map, this);
    });
  }
}

function initMap() {
  var filterButton = $("input[type='button']");

  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.0902, lng: -95.7129},
      zoom: 4
});

function clearOverlays() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
    marks.push(marker);
    map.panTo(position);
}

$(filterButton).click(function() {
    switch(this.id) {
      case 'all': var Data = $.get("http://localhost:3000/beeseed");
      break;
      case 'user': var Data = $.get("http://localhost:3000/mapData");
      break;
    }
    Data.then(function(data) {
      clearOverlays()
      addPins(data)
    })
  });
}

$.get("http://localhost:3000/beeseed", function(data) {
  addPins(data)
});
