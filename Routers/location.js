const express = require("express");
const router = express();

const locationController = require("../Controllers/location");

router.get("/", locationController.getLocation);

exports.default = router;
