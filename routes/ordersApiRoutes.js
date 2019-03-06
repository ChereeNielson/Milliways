var db = require("../models");

module.exports = function(app) {
  // Get all examples

  // POST route for saving a new order
  app.post("/api/orders", function(req, res) {
    db.Orders.create(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  });

  // GET route for getting all of the posts
  app.get("/api/orders", function(req, res) {
    db.Orders.findAll({
      include: [db.Tables]
    }).then(function(dbOrders) {
      res.json(dbOrders);
    });
  });

  app.get("/api/orders/:id", function(req, res) {
    db.Orders.findAll({
      where: {
        TableId: req.params.id
      },
      include: [db.Tables]
    }).then(function(dbOrders) {
      res.json(dbOrders);
    });
  });
};
