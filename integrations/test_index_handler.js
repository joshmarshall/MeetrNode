var apieasy = require("api-easy");
var vows = require("vows");
var web = require("../web.js"); // automatically starts server

var suite = apieasy.describe("Index handler tests.");

suite.use("localhost", 3000)
  .setHeader("Content-type", "application/json")
  .followRedirect(false)
  .get("/")
    .expect(200, {message: "Hello there!"})
.export(module);
