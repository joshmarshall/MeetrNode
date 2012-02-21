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
  ,port = process.env.PORT || 3000
;



app.configure(function(){
  app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(express.router);
});

require('./routes')(app, express);

console.log ('listening on', port);
app.listen(port);
