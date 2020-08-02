const axios = require("axios");
const Location = require("../../Models/Location").default;

const client = global.DBclient;

exports.default = (req, res, next) => {
  const { city } = req.query;
  try {
    if (!city) throw new Error();
    else if (!isNaN(city)) throw new Error();
    getDBLocation(city, function (locationData) {

      if (locationData) {
        res.status(200).send(locationData);
      }
      else {
        getData(city, (locationItem) => {
          addLocationToDB(locationItem);
          res.status(200).send(locationItem);
        });
      }
    })
  } catch (e) {
    next(e);
  }
};


function getData(city, callback) {
  let LOCATIONAPIKEY = process.env.LOCATIONAPIKEY;
  let url = `https://eu1.locationiq.com/v1/autocomplete.php?key=${LOCATIONAPIKEY}&q=${city}&format=json`;
  axios.get(url).then(response => {
    callback(new Location(city, response.data));
  });
}


function getDBLocation(city, callback) {
  const SQL = `SELECT * FROM locations WHERE search_query=$1;`;
  const values = [city];
  client.query(SQL, values)
    .then(result => {
      // Check to see if the location was found and return the results
      console.log("result.rowCount",result.rowCount);
      if (result.rowCount > 0) {
        console.log("From DB");
        console.log("result.rows[0]", result.rows[0]);

        let locationData = new Location(city, result.rows);
        callback(locationData);
        // Otherwise get the location information from the Google API
      } else {
        callback(null);
      }
    });
}

function addLocationToDB(locationData) {
  const SQL = `INSERT INTO locations (search_query,display_name,lat,lon, country_code) VALUES ('${locationData.search_query}','${locationData.formatted_query}','${locationData.latitude}','${locationData.longitude}', '${locationData.countryCode}');`;
  console.log("SQL: ", SQL);
  client.query(SQL)
    .then(result => { // eslint-disable-line
      // console.log("addLocationToDB result: ", result);
      // Check to see if the location was found and return the results
    });
}
