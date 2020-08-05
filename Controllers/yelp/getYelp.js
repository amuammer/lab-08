const axios = require("axios");
const Yelp = require("../../Models/Yelp").default;

exports.default = async (req, res, next) => { // eslint-disable-line
  const lat = req.query.latitude;
  const lon = req.query.longitude;
  const page = req.query.page;
  res.send(await getYelp(lat, lon, page));
}

function getYelp(lat, lon, page) {
  const APIKEY = process.env.YELP_API_KEY;
  const limit=5;
  const offset = (page - 1) * limit;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lon}&limit=${limit}&offset=${offset}`;
  const data = axios.get(url, {
    headers: {
      Authorization: `Bearer ${APIKEY}`
    }
  })
    .then((result) => {
      return result.data.businesses.map((yelpItem) => {
        return new Yelp(yelpItem);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
