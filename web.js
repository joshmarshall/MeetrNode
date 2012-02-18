/*var express = require("express"),
  app = express.createServer(express.logger()),
  port = process.env.PORT || 3000,
  mongoUri = process.env.MONGOHQ_URL || "mongodb://localhost/_node_test";

app.get("/", function(request, response) {
  response.send("Hello World!");
});

app.listen(port, function() {
  console.log("Listening on " + port);
  console.log("Mongo url: " + mongoUri);
});*/

var
  express = require('express')
  ,app = express.createServer(express.logger())
  ,port = process.evn.PORT || 3000
;

require('./routes')(app, express);

app.listen(port);
