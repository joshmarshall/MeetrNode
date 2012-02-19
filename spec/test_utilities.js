var
  utilities = require("../libs/utilities.js")
  ,vows = require("vows")
  ,assert = require("assert")
;

vows.describe("Meetr utilities").addBatch({
  "DB connections ": {

    topic: function() {
      utilities.connect(this.callback);
    },

    "should connect." : function() {
      // no asserts, just testing the connection
    }
  },

  "Random id generator ": {
    "should generate random ids." : function() {
      var id = utilities.generate_id();
      assert.equal(id.length, 8);
    }
  }


}).export(module);





