var resourceful = require("resourceful");
var utilities = require("../libs/utilities.js");

var _hasValue = function(list, value) {
  var i = 0;
  for (i; i<list.length; i++) {
    if (list[i] === value) {
      return true;
    }
  }
  return false;
};


exports.Meetup = resourceful.define("meetup", function() {

  utilities.enable_uid_for_resource(this); // adds UID
  this.property("name", String, { required: true });
  this.property("user_uid", String, { required: true });
  this.property("activities", Array, { required: true });
  this.property("people", Array, { required: true });

  this.prototype.add_person = function(person, callback) {
    if (!_hasValue(this.people, person.uid)) {
      this.people.push(person.uid);
    }
    this.save(callback);
  };

  this.prototype.add_activity = function(activity, callback) {
    if (!_hasValue(this.activities, activity.uid)) {
      this.activities.push(activity.uid);
    }
    this.save(callback);
  };

});
