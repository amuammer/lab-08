const axios = require("axios");
const Weather = require("../../Models/Weather").default;

exports.default = (req, res, next) => {
  let city = req.query.search_query;

  try {
    if (!city) throw new Error();
    else if (!isNaN(city)) throw new Error();

    getWeather(city, (returnedData) => {
      res.status(200).send(returnedData);
    });

  } catch(e) {
    next(e);
  }
}

function getWeather(city, callback) {
  Weather.all = [];

  let WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER_API_KEY}`;

  axios.get(url).then(data => {
    const returnedData = data.data.data.map(item => {
      return new Weather(city, item);
    });
    // after map => return returnedData
    callback(returnedData);
  });
}
