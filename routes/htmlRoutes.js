// eslint-disable-next-line no-unused-vars
var db = require("../models");
var path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Load example page and pass in an example by id
  app.get("/reservations", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservation) {
      var hbsobject = {
        reservations: dbReservation
      };
      res.render("reservation", hbsobject);
    });
  });
  app.get("/menu", function(req, res) {
    db.Menu.findAll({}).then(function(dbMenu) {
      var hbsobject = {
        menu: dbMenu
      };
      res.render("menu", hbsobject);
    });
  });
  app.get("/order", function(req, res) {
    res.render("order");
  });
};
