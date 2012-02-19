var
  user_models = require("../models/user.js")
  ,vows = require("vows")
  ,assert = require("assert")
  ,utilities = require("../libs/utilities.js")
;

vows.describe("Models").addBatch({
  "New users should ": {

    "should have a name.": function() {
      var user = user_models.create_user({name: "Josh", username: "josh"});
      assert.equal(user.name, "Josh");
      assert.notEqual(user.id, undefined);
    }

  },

  "Saving users should ": {

    topic: function() {
      var user = user_models.create_user({name: "Josh", username: "josh"});
      var self = this;
      var client = utilities.connect(function() {
        user_models.save_user(client, user, function() {
          user_models.get_user(client, user.id, function(retrieved_user) {
            user_models.get_user_by_username(client, "josh", function(username_user) {
              self.callback(null, {
                saved: retrieved_user,
                username_user: username_user
              });
            });
          });
        });
      });
    },

    "result in a saved user.": function(users) {
      assert.equal(users.saved.name, "Josh");
    },

    "result in a retrieved user by username." : function(users) {
      assert.equal(users.username_user.username, "josh");
    }

  }

}).export(module);
