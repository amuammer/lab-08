const axios = require("axios");
const Location = require("../../Models/Location").default;

exports.default = (req, res, next) => {
  const { city } = req.query;
  try {
    if (!city) throw new Error();
    else if (!isNaN(city)) throw new Error();
    Location.findByName(city, function (result) {
      if (result) {
        let locationData = new Location(city, result.rows);
        res.status(200).send(locationData);
      } else {
        getAPIData(city, (apiData) => {
          const newLocation = new Location(city, apiData.data);
          newLocation.save(() => {
            res.status(200).send(newLocation);
          });
        });
      }
    })
  } catch (e) {
    next(e);
  }
};


function getAPIData(city, callback) {
  let LOCATIONAPIKEY = process.env.LOCATIONAPIKEY;
  let url = `https://eu1.locationiq.com/v1/autocomplete.php?key=${LOCATIONAPIKEY}&q=${city}&format=json`;
  axios.get(url).then(response => {
    callback(response);
  });
}
