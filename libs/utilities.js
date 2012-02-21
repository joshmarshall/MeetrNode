var redis = require("redis");
var url = require("url");

exports.connect = function(callback) {

  var redisUri = ("redis://localhost/0" || process.env.REDISTOGO_URI);
  var parsed = url.parse(redisUri);
  var host = parsed.hostname;
  var port = Number(parsed.port) || 6379;
  var auth = {};
  if (parsed.auth) {
    var authParts = parsed.auth.split(":");
    auth.user = authParts[0];
    if (authParts.length > 1) {
      auth.password = authParts[1];
    }
  }

  var client = redis.createClient(port, host);
  client.auth(auth.password, function() {
    console.log("Authorized redis client.");
  });
  client.on("error", function(error) {
    console.log("Error with client: ");
    throw error;
  });
  client.on("ready", function() {
    callback();
  });
  return client;
};

exports.generate_id = function() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var length = 8;
  var string = "";
  while (string.length < length) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string;
};


var _addUID = function(data) {
  // just generates an id and adds it to the data.
  if (!data.uid) {
    data.uid = exports.generate_id();
  }
};


exports.enable_uid_for_resource = function(resource) {
  // updates a resource to accept / set UIDs

  // seems a bit silly to have to overwrite both create and new
  // to set default values on properties...
  // I'm curious whether there's a standard overwrite for this
  // in resourceful.

  var _originalNew = resource.new;
  var _originalCreate = resource.create;

  resource.new = function(data) {
    _addUID(data);
    return _originalNew.apply(this, arguments);
  };

  resource.create = function(data) {
    _addUID(data);
    return _originalCreate.apply(this, arguments);
  };

  resource.property("uid", String, { required: true });
  return resource;
};
