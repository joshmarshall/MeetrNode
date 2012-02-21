var Meetup = require("../models/meetup.js").Meetup;
var Person = require("../models/person.js").Person;


var _findMeetupsForUser = function(user, response) {
  Meetup.find({ user_uid: user.uid }, function(error, results) {
    if (error) {
      console.log(error);
    }
    response.json({
      meetups: results
    });
  });

};

var _findOrCreateUserByUsername = function(username, callback) {
  Person.find({ username: username }, function(error, results) {
    if (results.length === 0) {
      // we'll create a default user for prototyping purposes...
      Person.create({
        name: username,
        username: username
      }, callback);
    } else {
      // user already exists
      callback(null, results[0]);
    }
  });
};

module.exports = function(app){

  app.get('/meetups', function(req, res){
    // db lookup
    res.json({
      meetups: []
    });
  });

  app.post('/meetups', function(req, res){
    // validate request

    // store data

    // respond
    res.json({
      meetups: []
    });
  });



  app.get("/users/:username/meetups", function(request, response) {
    _findOrCreateUserByUsername(request.params.username, function(error, user) {
      if (error) { throw error; }
      _findMeetupsForUser(user, response);
    });
  });

  app.post("/users/:username/meetups", function(request, response) {
    _findOrCreateUserByUsername(request.params.username, function(error, user) {
      var body = request.body;
      body.user_uid = user.uid;
      Meetup.create(body, function(create_meetup_error, meetup) {
        if (create_meetup_error) { throw create_meetup_error; }
        response.json({uid: meetup.uid, name: meetup.name});
      });
    });
  });
};

