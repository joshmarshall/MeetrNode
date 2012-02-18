module.exports = function(app){

  app.post('/activity', function(req, res){
    res.write({
      activity: []
    });
  });
};
