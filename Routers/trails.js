const express = require("express");
const router = express();

const trailsController = require("../Controllers/trails");

router.get("/", trailsController.getTrails);

exports.default = router;
