//////////////////////////////
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=24ca674f66732bbff766b547f73a8a09&query=" +
    latitude +
    "," +
    longitude +
    "&unit=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;
      callback(undefined, {
        temperature: data.temperature,
        feelslike: data.feelslike,
        weather_descriptions: data.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
