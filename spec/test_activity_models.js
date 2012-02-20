var resourceful = require("resourceful");
var utilities = require("../libs/utilities.js");
var vows = require("vows");
var assert = require("assert");

// putting the model in the test for now.

var Activity = resourceful.define("activity", function() {
  this.property("name", String, { required: true });
  this.property("uid", String, { required: true });
  this.property("meetup_uid", String, { required: true });
  this.property("votes", Object, { required: true });

  var _originalNew = this.new;

  this.new = function(properties) {
    console.log("'New' is being called.");
    if (!properties.uid) {
      properties.uid = utilities.generate_id();
    }
    if (!properties.votes) {
      properties.votes = {};
    }
    return _originalNew.apply(this, [properties]);
  };

  this.prototype.vote = function(user_uid, vote_up) {
    var vote_value = !(!vote_up); // undefined and falsy values are false
    this.votes[user_uid] = vote_value;
    this.save();
  };
});

vows.describe("Activity models").addBatch({
  "New activities ": {

    topic: function() {
      var activity = Activity.new({
        name: "Testing"
      });
      this.callback(null, activity);
    },

    "should have a name.": function(activity) {
      assert.equal(activity.name, "Testing");
      assert.equal(activity.uid.length, 8);
    },

    "should have a uid by default.": function(activity) {
      assert.equal(typeof(activity.uid), "string");
      assert.equal(activity.uid.length, 8);
    },

    "should have empty votes by default.": function(activity) {
      assert.equal(typeof(activity.votes), "object");
    }
  }
}).export(module);
