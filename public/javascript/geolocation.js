// var myOptions = {
//   zoom: 8,
//   mapTypeId: google.maps.MapTypeId.ROADMAP
// };
// var map = new google.maps.Map(document.getElementById("map"), myOptions);
// if(navigator.geolocation) {
//   browserSupportFlag = true;
//   navigator.geolocation.getCurrentPosition(function(position) {
//     position.coords.latitude
//     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//     map.setCenter(initialLocation);
//   }, function() {
//     handleNoGeolocation(browserSupportFlag);
//   });
// }
// // Browser doesn't support Geolocation
// else {
//   browserSupportFlag = false;
//   handleNoGeolocation(browserSupportFlag);
// }
//
// function handleNoGeolocation(errorFlag) {
//   if (errorFlag == true) {
//     alert("Geolocation service failed.");
//     initialLocation = newyork;
//   } else {
//     alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
//     initialLocation = siberia;
//   }
//   map.setCenter(initialLocation);
// }
