var
  utilities = require("../libs/meetr_utilities.js")
  ,vows = require("vows")
  ,assert = require("assert")
;

vows.describe("Meetr utilities").addBatch({
  "Mongoose connections ": {
    topic: function () { 
      return utilities.connect("mongodb://localhost/_meetr_dev");
    },

    "should connect." : function(connection) {
      assert.isTrue(connection);
    }
  }

}).export(module);




