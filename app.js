const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(process.argv);
const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
} else {
  geocode(address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return console.log(error); // use return to stop function
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error); // use return to stop function
      }

      console.log(place);
      console.log(forecastData);
    });
  });
}
