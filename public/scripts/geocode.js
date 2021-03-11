const geocodeToList = function (geocodeResult) {
  let insertString = ""
  for (let i = 0; i < geocodeResult.length; i++) {
    insertString += `<li data-lat="${geocodeResult[i].geometry.coordinates[1]}"
    data-long="${geocodeResult[i].geometry.coordinates[0]}"
    data-title="${geocodeResult[i].text}"
    data-label="${geocodeResult[i].place_name}"

    class="mytarget ${i}">

    ${geocodeResult[i].place_name}
    <button type="button" class="btn btn-success btn-sm">Select</button>

    </li>`
  }

  return insertString;
}




const geocodeAPI = (address, callback) => {
  const APIKey = 'pk.eyJ1IjoiZHBhcHBvIiwiYSI6ImNrbTEwNmI4dzAxeXMyeGp2c2VyajBwa20ifQ.U6SgB3CiYWT8xwZSv0eYsQ';
  const query = address;
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=CA&access_token=${APIKey}`;
  return $.ajax({
    url: endpoint,
    dataType: 'json',

    success: function (data) {
      console.log('features:', data.features);
      callback(data.features);
    }
  })
}

$(document).ready(function () {

  $("#addressinput").on("input", $.debounce(300, function (evt) {


    $(".address-insert").empty();
    geocodeAPI($("#addressinput").val(), function (data) {
      const allListings = geocodeToList(data);
      $(".address-insert").append(allListings)

      $(".mytarget").click(function () {
        $("#titleinput").val($(this).attr("data-title"))
        $("#lat").val($(this).attr("data-lat"))
        $("#long").val($(this).attr("data-long"))
        $("#addressinput").val($(this).attr("data-label"))
        $(".address-insert").empty();

      })
    })
  }))
});

