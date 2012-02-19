var assert = require("assert");
var utilities = require("../libs/utilities.js");

var MEETUP_ID_PREFIX = "meetr-meetup-";
var MEETUP_USER_PREFIX = "meetr-user-meetups-";

var _get_meetup_key = function(meetup) {
  assert.notEqual(meetup.id, undefined, "Meetups must have an id.");
  return MEETUP_ID_PREFIX + meetup.id;
};

var _get_user_meetup_key = function(user_id) {
  return MEETUP_USER_PREFIX + user_id;
};

exports.create_meetup = function(data) {
  assert.notEqual(data.name, undefined, "Meetups must have a name.");
  assert.notEqual(data.user_id, undefined, "Meetups must have a user id.");
  if (!data.id) {
    data["id"] = utilities.generate_id();
  }
  return data;
};

exports.save_meetup = function(client, meetup, callback) {
  var meetup_key = _get_meetup_key(meetup);
  var user_meetup_key = _get_user_meetup_key(meetup.user_id);
  client.set(meetup_key, JSON.stringify(meetup), function() {
    client.rpush(user_meetup_key, meetup_key, callback);
  });
};


exports.get_meetup = function(client, meetup_id, callback) {
  var meetup_key = MEETUP_ID_PREFIX + meetup_id;
  client.get(meetup_key, function(error, result) {
    if (error) {
      throw error;
    }
    callback(JSON.parse(result));
  });
};
