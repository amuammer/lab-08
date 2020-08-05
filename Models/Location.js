const client = global.DBclient;

function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data[0].display_name;
  this.latitude = data[0].lat;
  this.longitude = data[0].lon;
  this.countryCode = data[0].address ? data[0].address.country_code : data[0].country_code; // api or db
}

Location.findByName = function (city, callback) {
  const sql = `SELECT * FROM locations WHERE search_query=$1;`;
  const values = [city];
  client.query(sql, values)
    .then(result => {
      // Check to see if the location was found and return the results
      console.log("result.rowCount",result.rowCount);
      if (result.rowCount > 0) {
        console.log("From DB");
        console.log("result.rows[0]", result.rows[0]);
        callback(result);
        // Otherwise get the location information from the Google API
      } else {
        callback(null);
      }
    });
}

Location.prototype.save = function (callback){
  console.log("this", this);
  const sql = "INSERT INTO locations (search_query,display_name,lat,lon, country_code) VALUES ($1, $2, $3, $4, $5);";
  console.log("SQL: ", sql);
  client.query(sql, [this.search_query, this.formatted_query, this.latitude, this.longitude, this.countryCode])
    .then(result => { // eslint-disable-line
      callback(result);
    });
}

exports.default = Location;
