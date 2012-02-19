var apieasy = require("api-easy");
var vows = require("vows");

var suite = apieasy.describe("People handlers tests.");

suite.use("localhost", 3000)
  .setHeader("Content-type", "application/json")
  .followRedirect(false)
  
  // get tests
  .get("/people")
    .expect(200, {people: []})

  // post tests
  .post("/people", {uid: 1, name: "Name"})
    .expect(200, {people: []})
.export(module);

