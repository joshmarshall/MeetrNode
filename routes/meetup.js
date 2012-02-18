module.exports = function(app){

  app.get('/meetup/:id', function(req, res){
    User.find_one(req.params.id, function(err, user) {
      if (err) {
        next(err);
      }
      res.json(user);
    });
  });

  app.post('/meetups', function(req, res){
    // validate request
    var
      body = req.body
      ,name = body.name
    ;

    // store data

    // respond
    res.json({
      meetups: []
    });
  });
};

