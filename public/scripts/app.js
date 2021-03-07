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
// const onSignIn = function(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   var id_token = googleUser.getAuthResponse().id_token;
//   console.log(id_token);
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

//maps!
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  });
};


// /**
//  * The Sign-In client object.
//  */
// var auth2;

// /**
//  * Initializes the Sign-In client.
//  */
// var initClient = function() {
//     gapi.load('auth2', function(){
//         /**
//          * Retrieve the singleton for the GoogleAuth library and set up the
//          * client.
//          */
//         auth2 = gapi.auth2.init({
//             client_id: 'CLIENT_ID.apps.googleusercontent.com'
//         });

//         // Attach the click handler to the sign-in button
//         auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
//     });
// };

// /**
//  * Handle successful sign-ins.
//  */
// var onSuccess = function(user) {
//     console.log('Signed in as ' + user.getBasicProfile().getName());
//  };

// /**
//  * Handle sign-in failures.
//  */
// var onFailure = function(error) {
//     console.log(error);
// };