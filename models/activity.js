var resourceful = require("resourceful");
var utilities = require("../libs/utilities.js");

exports.Activity = resourceful.define("activity", function() {

  this.property("name", String, { required: true });
  this.property("meetup_uid", String, { required: true });
  this.property("uid", String, { required: true });
  this.property("votes", Object, { required: true });

  var _originalNew = this.new;
  var _originalCreate = this.create;

  // seems a bit silly to have to overwrite both create and new
  // to set default values on properties...
  // I'm curious whether there's a standard overwrite for this
  // in resourceful.

  var _updateProperties = function(properties) {
    if (!properties.uid) {
      properties.uid = utilities.generate_id();
    }
    if (!properties.votes) {
      properties.votes = {};
    }
    return properties;
  };

  this.new = function(properties) {
    console.log("'New' is being called.");
    _updateProperties(properties);
    return _originalNew.apply(this, arguments);
  };

  this.create = function(properties) {
    console.log("'Create' is being called.");
    _updateProperties(properties);
    return _originalCreate.apply(this, arguments);
  };

  this.prototype.vote = function(user_uid, vote_up) {
    var vote_value = !(!vote_up); // catches undefined as false too
    this.votes[user_uid] = vote_value;
    this.save();
  };
});
