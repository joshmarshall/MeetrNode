module.exports = function(app){

  app.get('/people', function(req, res){
    res.json({
      people: []
    });
  });

  app.post('/people', function(req, res){
    // validate request
    var
      body = req.body
      ,name = body.name
    ;

    // sendgrid
    if (body.email) {

    }
    // twillio
    else if (body.telephone) {
    }
    // app user
    else if (body.uid) {
    }

    // store data
    res.send(JSON.stringify({
      people: []
    }));
  });
};
