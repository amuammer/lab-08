const express = require("express");
const router = express();

const weatherController = require("../Controllers/weather");

router.get("/", weatherController.getWeather);

exports.default = router;
