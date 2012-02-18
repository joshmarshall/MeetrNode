module.exports = function(app){

  app.get('/people', function(req, res){
    res.write({
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
