const express = require("express");
const router = express();

const yelpController = require("../Controllers/yelp");

router.get("/", yelpController.getYelp);

exports.default = router;
