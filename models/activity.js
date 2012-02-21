var resourceful = require("resourceful");
var utilities = require("../libs/utilities.js");

exports.Activity = resourceful.define("activity", function() {

  utilities.enable_uid_for_resource(this); // adds UID
  this.property("name", String, { required: true });
  this.property("meetup_uid", String, { required: true });
  this.property("votes", Object, { required: true });

  this.prototype.vote = function(user_uid, vote_up) {
    var vote_value = !(!vote_up); // catches undefined as false too
    this.votes[user_uid] = vote_value;
    this.save();
  };
});
