module.exports = function(app, express) {
  app.use('/app', express.static('./app'));
  app.use('/assets', express.static('./assets'));
};
