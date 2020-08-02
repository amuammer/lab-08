const axios = require("axios");
const Movie = require("../../Models/Movie").default;

exports.default = (req, res) => {
  let region_code = req.query.countryCode;

  getMoviesFromAPI(region_code, (returnedData) => {
    res.status(200).send(returnedData);
  });

}

function getMoviesFromAPI(region_code, callback) {
  Movie.all = [];
  const APIKEY = process.env.MOVIE_API_KEY;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&region=${region_code}`;
  axios.get(url).then(data => {
    const returnedData = data.data.results.map(item => {
      //here
      return new Movie(item);
    });
    // after map => return returnedData
    callback(returnedData);
  });
}
