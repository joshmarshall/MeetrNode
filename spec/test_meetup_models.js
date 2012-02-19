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
      var client = utilities.connect(function() {
        meetup_models.save_meetup(client, meetup, function() {
          meetup_models.get_meetup(client, meetup.id, function(retrieved_meetup) {
            self.callback(null, retrieved_meetup);
          });
        });
      });
    },

    "result in a saved meetup.": function(meetup) {
      assert.equal(meetup.name, "Meetup");
    },

    "have the proper user id.": function(meetup) {
      assert.equal(meetup.user_id, "tom");
    }
  }
}).export(module);
