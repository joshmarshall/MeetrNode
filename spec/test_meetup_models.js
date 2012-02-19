var
  meetup_models = require("../models/meetup.js")
  ,vows = require("vows")
  ,assert = require("assert")
  ,utilities = require("../libs/utilities.js")
;

vows.describe("Models").addBatch({
  "New meetups should ": {

    "should have a name.": function() {
      var meetup = meetup_models.create_meetup({
        name: "Meetup",
        user_id: "tom"
      });
      assert.equal(meetup.name, "Meetup");
      assert.notEqual(meetup.id, undefined);
    }

  },

  "Saving meetups should ": {

    topic: function() {
      var meetup = meetup_models.create_meetup({
        name: "Meetup",
        user_id: "tom"
      });
      var self = this;
      var meetups = {};
      var client = utilities.connect(function() {
        meetup_models.save_meetup(client, meetup, function() {
          meetup_models.get_meetup(client, meetup.id, function(retrieved_meetup) {
            meetups.retrieved_meetup = retrieved_meetup;
            meetup_models.get_meetups_by_user_id(client, "tom",
              function(user_meetups) {
                meetups.user_meetups = user_meetups;
                self.callback(null, meetups);
              }
            );
          });
        });
      });
    },

    "result in a saved meetup.": function(meetups) {
      assert.equal(meetups.retrieved_meetup.name, "Meetup");
    },

    "store the user id.": function(meetups) {
      assert.equal(meetups.retrieved_meetup.user_id, "tom");
    },

    "be grouped by user.": function(meetups) {
      assert.isTrue(meetups.user_meetups.length >= 1);
    }
  }
}).export(module);
