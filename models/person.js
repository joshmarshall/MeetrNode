var resourceful = require("resourceful");
var utilities = require("../libs/utilities.js");

var _generateUsername = function(name) {
  // attempts to generate a unique username
  return name.toLowerCase().replace(/[^a-z0-9]/gi, ""); 
};

var _updateUsername = function(user) {
  if (!user.username) {
    user.username = _generateUsername(user.name);
  }
  return user;
};

exports.Person = resourceful.define("person", function() {
  
  utilities.enable_uid_for_resource(this);

  this.property("name", String, { required: true });
  this.property("username", String, { required: true });

  // creating default username
  var _originalNew = this.new;
  var _originalCreate = this.create;

  this.new = function(data) {
    _updateUsername(data);
    return _originalNew.apply(this, arguments);
  };

  this.create = function(data) {
    _updateUsername(data);
    return _originalCreate.apply(this, arguments);
  };


});
