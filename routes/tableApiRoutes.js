var db = require("../models");
module.exports = function(app) {
  app.get("/api/tables/:id", function(req, res) {
    db.Tables.findAll({
      where: {
        // eslint-disable-next-line camelcase
        table_number: req.params.id
      },
      include: [db.Orders]
    }).then(function(dbTables) {
      res.json(dbTables);
    });
  });

  app.post("/api/tables", function(req, res) {
    db.Tables.create(req.body).then(function(dbTables) {
      res.json(dbTables);
    });
  });
};
