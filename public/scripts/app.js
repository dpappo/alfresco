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


//log out
// const signOut = function() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });

//get user info
const onSignIn = function(googleUser) {
  alert("ran")
  var profile = googleUser.getBasicProfile();
  console.log(profile);
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

//maps!
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  });
};
