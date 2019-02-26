var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });

  // Create a new example
  app.post("/api/reservations", function(req, res) {
    db.Reservation.create(req.body).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Reservation.destroy({ where: { id: req.params.id } }).then(function(
      dbReservation
    ) {
      res.json(dbReservation);
    });
  });
};
