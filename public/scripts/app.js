$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));

//maps!
let map;
function initMap() {
  gMap = new google.maps.Map(document.getElementById('map'));

  navigator.geolocation.getCurrentPosition(function(position) {
    // Center on user's current location if geolocation prompt allowed
    var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    gMap.setCenter(initialLocation);
    gMap.setZoom(13);
  }, function(positionError) {
    // User denied geolocation prompt - default to Toronto
    gMap.setCenter(new google.maps.LatLng(43.6532, -79.3832));
    gMap.setZoom(5);
  });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
  });
}
