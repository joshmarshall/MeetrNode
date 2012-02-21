var vows = require("vows");
var assert = require("assert");
var Meetup = require("../models/meetup.js").Meetup;

vows.describe("Meetup models").addBatch({

  "New meetups ": {
    topic: function() {
      Meetup.create({
        name: "New Meetup",
        user_uid: "tom"
      }, this.callback);
    },

    "should have a name.": function(meetup) {
      assert.equal(meetup.name, "New Meetup");
    },

    "should have a uid by default.": function(meetup) {
      assert.isNotNull(meetup.uid);
      assert.equal(meetup.uid.length, 8);
    },

    "should have activities by default.": function(meetup) {
      assert.isNotNull(meetup.activities);
      assert.equal(meetup.activities.length, 0);
    },

    "should have people by default.": function(meetup) {
      assert.isNotNull(meetup.people);
      assert.equal(meetup.people.length, 0);
    },

    "can have people added to them.": function(meetup) {
      meetup.add_person({uid: "foobar"}); // adding mock person
      assert.equal(meetup.people.length, 1);
      assert.equal(meetup.people[0], "foobar");
    },

    "should only add people once.": function(meetup) {
      meetup.add_person({uid: "foobar"});
      assert.equal(meetup.people.length, 1);
    },

    "can have activities added to them.": function(meetup) {
      meetup.add_activity({uid: "quxbaz"}); // adding mock activity
      assert.equal(meetup.activities.length, 1);
      assert.equal(meetup.activities[0], "quxbaz");
    },

    "should only add activities once.": function(meetup) {
      meetup.add_activity({uid: "quxbaz"});
      assert.equal(meetup.activities.length, 1);
    },

    "should be queryable by user uid": {
      topic: function() {
        Meetup.find({ user_uid: "tom" }, this.callback);
      },

      "(checking results)": function(results) {
        assert.equal(results.length, 1);
      }
    }
  }
}).export(module);
