const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibXNhbWFrZSIsImEiOiJjazl1MmtjdTUxazFiM2RxY3kwY3FlZTczIn0.D6EfajqM6b_kl4fKfUL0aQ&limit=1`;
  request({ url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback("Unable to access geocode service", undefined);
    } else if (body.error || body.features.length === 0) {
      callback(
        "You must provide an address to get the weather forecast",
        undefined
      );
    } else {

      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;