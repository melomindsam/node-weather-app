const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=096b7ccaf97a33483b723f10986e3fb8&query=${latitude},${longitude}&units=m`;

  request({ url, json:true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (
      body.error ||
      body.current.weather_descriptions.length === [0]
    ) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        precipitation:body.current.precip,
        time: body.current.observation_time,
        humidity:body.current.humidity
      });
    }
  });
};


module.exports = forecast;
