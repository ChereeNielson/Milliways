var db = require("../models");
var axios = require("axios");
require("dotenv").config();
module.exports = function(app) {
  // Get all examples

  app.get("/api/nasa/people", function(req, res) {
    axios
      .get("http://api.open-notify.org/astros.json")
      .then(function(response) {
        res.send(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error);
      });
  });

  app.get("/api/nasa/astroids", function(req, res) {
    var apiKey = process.env.NASA_API;
    axios
      .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=" + apiKey)
      .then(function(response) {
        res.send(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error);
      });
  });

  app.get("/api/reservations", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });
  app.get("/api/nasa/images", function(req, res) {
    var apiKey = process.env.NASA_API;
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=" + apiKey)
      .then(function(response) {
        res.send(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error);
      });
  });
  app.get("/api/menu", function(req, res) {
    db.Menu.findAll({}).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });
  // Create a new example
  app.post("/api/reservations", function(req, res) {
    db.Reservation.create(req.body).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });
  app.post("/api/menu", function(req, res) {
    db.Menu.create(req.body).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });
  app.post("/api/tables", function(req, res) {
    db.Tables.create(req.body).then(function(dbTables) {
      res.json(dbTables);
    });
  });

  // Delete an example by id
  app.delete("/api/reservations/:id", function(req, res) {
    db.Reservation.destroy({ where: { id: req.params.id } }).then(function(
      dbReservation
    ) {
      res.json(dbReservation);
    });
  });
  app.delete("/api/menu/:id", function(req, res) {
    db.Menu.destroy({ where: { id: req.params.id } }).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });
};
