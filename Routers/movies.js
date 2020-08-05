const express = require("express");
const router = express();

const moviesController = require("../Controllers/movies");

router.get("/", moviesController.getMovie);

exports.default = router;
