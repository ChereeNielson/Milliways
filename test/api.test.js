var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/reservations", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all reservations", function(done) {
    // Add some reservations to the db to test with
    db.Reservation.bulkCreate([
      { name: "First Example", email: "test@test.com", phone: "8014447777" },
      { name: "example2", email: "test2@test2.com", phone: "8015567777" }
    ]).then(function() {
      // Request the route that returns all reservations
      request.get("/api/reservations").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            name: "First Example",
            email: "test@test.com",
            phone: "8014447777"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            name: "example2",
            email: "test2@test2.com",
            phone: "8015567777"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
