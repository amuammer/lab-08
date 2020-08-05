const express = require("express");
const app = express();

const pg = require("pg");
require("dotenv").config();

const client = new pg.Client(process.env.DATABASE_URL);
global.DBclient = client;

const locationRouter = require("./Routers/location").default;
const weatherRouter = require("./Routers/weather").default;
const trailsRouter = require("./Routers/trails").default;
const moviesRouter = require("./Routers/movies").default;
const yelpRouter = require("./Routers/yelp").default;

// cors origin
app.all("*", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, PUT, PATCH, POST, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// hello World
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World" });
});

// api routers
app.use("/location", locationRouter);
app.use("/weather", weatherRouter);
app.use("/trails", trailsRouter);
app.use("/movies", moviesRouter);
app.use("/yelp", yelpRouter);

// page not found middleware
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Sorry, page not found !" });
})

// error middleware
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).send({ msg: "Sorry, something went wrong !" });
})

const PORT = process.env.PORT || 3000;

client.connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`listening on ${PORT}`)
    );
  }).catch((err) => {
    console.log(err.message);
  });
