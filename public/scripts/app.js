/* eslint-disable func-style */
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });




//maps!
var mymap = L.map('mapid').setView([43.6532, -79.3832], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHBhcHBvIiwiYSI6ImNrbTEwNmI4dzAxeXMyeGp2c2VyajBwa20ifQ.U6SgB3CiYWT8xwZSv0eYsQ'
}).addTo(mymap);
