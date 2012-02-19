var assert = require("assert");
var utilities = require("../libs/utilities.js");

var USER_ID_PREFIX = "meetr-user-";
var USERNAME_PREFIX = "meetr-username-";

var _get_user_key = function(user) {
  assert.notEqual(user.id, undefined, "Users must have an id.");
  return USER_ID_PREFIX + user.id;
};

var _get_username_key = function(user) {
  assert.notEqual(user.username, undefined, "Users must have a username.");
  return USERNAME_PREFIX + user.username;
};

exports.create_user = function(data) {
  assert.notEqual(data.name, undefined, "Users must have a name.");
  assert.notEqual(data.username, undefined, "Users must have a username.");
  if (!data.id) {
    data["id"] = utilities.generate_id();
  }
  return data;
};

exports.save_user = function(client, user, callback) {
  var key = _get_user_key(user);
  var username_key = _get_username_key(user);
  client.set(key, JSON.stringify(user), function() {
    client.set(username_key, key, callback);
  });
};

exports.get_user = function(client, user_id, callback) {
  var key = USER_ID_PREFIX + user_id;
  client.get(key, function(error, result) {
    if (error) {
      throw error;
    }
    callback(JSON.parse(result));
  });
};

exports.get_user_by_username = function(client, username, callback) {
  var key = USERNAME_PREFIX + username;
  client.get(key, function(error, result) {
    if (error) {
      throw error;
    }
    client.get(result, function(user_error, user_result) {
      if (error) { throw user_error; }
      callback(JSON.parse(user_result));
    });
  });
};
