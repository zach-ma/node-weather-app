const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiemFjaG1hIiwiYSI6ImNrcW1yYjJsZDBtZ2Qybm1tMTE4bDdkNjMifQ.-EaXqhH_ZeFZtAsSqahNKw&limit=1";

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = body.features[0];
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        place: data.place_name,
      });
    }
  });
};

module.exports = geocode;
