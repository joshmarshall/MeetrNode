var fs = require('fs');

module.exports = function(app, express){
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file.substr(-3) != '.js' || file == 'index.js') return;
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app, express);
  });

  app.get('/', function(req, res) {
    res.write('Hello there!');
  });
};
