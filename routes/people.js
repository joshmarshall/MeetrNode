module.exports = function(app){

  app.get('/people', function(req, res){
    res.json({
      people: []
    });
  });

  app.post('/people', function(req, res){
    // validate request

    // store data
    res.write({
      people: []
    });
  });
};
