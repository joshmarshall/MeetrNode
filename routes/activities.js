module.exports = function(app){

  app.get('/activity', function(req, res){
    res.json({
      activity: []
    });
  });
};
