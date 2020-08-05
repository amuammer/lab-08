const axios = require("axios");
const Trails = require("../../Models/Trails").default;

exports.default = (req, res) => {
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;

  getTrails(latitude, longitude).then(returnedData => {
    res.send(returnedData);
  }).catch((err) => {
    console.log(err.message);
  });
}

function getTrails(lat, lon) {
  let HIKING_API_KEY = process.env.HIKING_API_KEY;
  let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=1000&key=${HIKING_API_KEY}`;

  return axios.get(url).then(data => {
    return data.data.trails.map(data => {
      return new Trails(data);
    });
  });
}
