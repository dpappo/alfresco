// A $( document ).ready() block.

const geocodeToList = function(geocodeResult) {
  let insertString = ""
  //console.log("geocodeResult: ", geocodeResult)
  for (let i = 0; i < geocodeResult.length; i++) {
    insertString += `<li data-lat="${geocodeResult[i].latitude}" 
    data-long="${geocodeResult[i].longitude}" 
    data-title="${geocodeResult[i].name}" 
    data-label="${geocodeResult[i].label}" 
    
    class="mytarget ${i}">
    
    ${geocodeResult[i].label} 
    <button type="button" class="btn btn-success btn-sm">Select</button>
    
    </li>`
  }

  return insertString;
}


const geocodeAPI = (address, callback) => {
  const APIKey = "acecc6c6b153f98979acfc86867bc5a2";
  const query = address;
  const endpoint = `http://api.positionstack.com/v1/forward?access_key=${APIKey}&callback=FUNCTION_NAME&query=${query}&limit=5&country=CA`;
  console.log(endpoint);
  return $.ajax({
    url: endpoint,
    dataType: 'json',
            
    success: function(data) {
      callback(data.data)
  }
})
}

$( document ).ready(function() {

$("#addressinput").on("input", $.debounce(300, function(evt) {
  
  
  $(".address-insert").empty();
  geocodeAPI($("#addressinput").val(), function(data) {
    const allListings = geocodeToList(data);
    $(".address-insert").append(allListings)
  
  $(".mytarget").click(function(){
    $("#titleinput").val($(this).attr("data-title"))
    $("#lat").val($(this).attr("data-lat"))
    $("#long").val($(this).attr("data-long"))
    $("#addressinput").val($(this).attr("data-label"))
    $(".address-insert").empty();

  })
  })






}))






});

