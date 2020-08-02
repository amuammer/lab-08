exports.default = function (city, data) {
  this.search_query = city;
  this.formatted_query = data[0].display_name;
  this.latitude = data[0].lat;
  this.longitude = data[0].lon;
  this.countryCode = data[0].address ? data[0].address.country_code : data[0].country_code; // api or db
}
