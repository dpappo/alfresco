const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

const APIKey = "acecc6c6b153f98979acfc86867bc5a2";
const query = process.argv[2];
const endpoint = `http://api.positionstack.com/v1/forward?access_key=${APIKey}&callback=FUNCTION_NAME&query=${query}`;

$.ajax({
  url: endpoint,
  contentType: "application/json",
  dataType: 'json',
  success: function(data) {
    const lat = (data.data[0].latitude);
    const long = (data.data[0].longitude);
    const coords = [lat, long];
    console.log(coords);
  }
});
