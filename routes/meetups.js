module.exports = function(app){

  app.get('/meetups', function(req, res){
    // db lookup
    res.json({
      meetups: []
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

