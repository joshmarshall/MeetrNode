var apieasy = require("api-easy");
var vows = require("vows");
var assert = require("assert");
var Person = require("../models/person.js").Person;
var web = require("../web.js"); // automatically starts server

var suite = apieasy.describe("Meetup handlers tests.");

suite.use("localhost", 3000)
  .setHeader("Content-type", "application/json")
  .followRedirect(false)

  // get tests
  .get("/users/josh/meetups")
    .expect(200, {meetups:[]})

  .post("/users/josh/meetups", {name: "New Meetup"})
    .expect(200)
    .expect("should return new meetup uid.", function (err, response, body) {
      var result = JSON.parse(body);
      assert.isNotNull(result.uid);
      assert.equal(result.name, "New Meetup");
    })

  .next()

  .get("/users/josh/meetups")
    .expect(200)
    .expect("should have a new meetup in list.", function(err, response, body) {
      var result = JSON.parse(body);
      assert.equal(result.meetups.length, 1);
    })

.export(module);

