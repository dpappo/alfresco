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
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  });
  const marker = new google.maps.Marker({
    position: { lat: 43.6532, lng: -79.3832 },
    map: map,
  });
  const contentString = `
  <h2 class="title">My Bar</h2><br>
  <p class="description">This is where I like to drink</p><br>
  <p class="phone">555-555-5555</p><br>
  <img src="https://media-cdn.tripadvisor.com/media/photo-s/1a/02/f8/b9/graffiti-spot-bar-g-spot.jpg" class="image"/><br>
  `;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
  // $(".listings").append(infowindow);
  const addMarker = (title, description, phone, imageURL, latLongObject) => {
    const marker = new google.maps.Marker({
      position: latLongObject,
      map: map,
    });
    const contentString = `
    <h2 class="title">${title}</h2><br>
    <p class="description">${description}</p><br>
    <p class="phone">${phone}</p><br>
    <img src="${imageURL}" class="image"/><br>
    `;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  };

  addMarker("second bar", "where I sometimes go", "123412312", "https://threebestrated.ca/images/StLouisBarGrill-RichmondHill-ON.jpeg", {lat: 45.5017, lng: -73.5673});
}

