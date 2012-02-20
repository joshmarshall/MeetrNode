var vows = require("vows");
var assert = require("assert");
var Activity = require("../models/activity.js").Activity;

vows.describe("Activity models").addBatch({
  "New activities ": {

    topic: function() {
      Activity.create({
        name: "Testing",
        meetup_uid: "foobar"
      }, this.callback);
    },

    "should have a name.": function(activity) {
      assert.equal(activity.name, "Testing");
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
