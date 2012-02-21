var
  utilities = require("../libs/utilities.js")
  ,vows = require("vows")
  ,assert = require("assert")
;

vows.describe("Meetr utilities").addBatch({
  /*
   * commenting out since we're moving away from redis
  "DB connections ": {

    topic: function() {
      utilities.connect(this.callback);
    },

    "should connect." : function() {
      // no asserts, just testing the connection
    }
  },*/

  "Random id generator ": {
    "should generate random ids." : function() {
      var id = utilities.generate_id();
      assert.equal(id.length, 8);
    }
  },

  "UID wrapper": {

    topic: function() {

      // Mock resource
      var TestResource = function () {};
      TestResource.new = function(data) {
        // by default does nothing
        return data;
      };

      TestResource.create = function(data) {
        // by default does nothing
        return data;
      };

      TestResource.property = function(name, type, parameters) {
        this._properties[name] = {type: type, params: parameters};
      };

      TestResource._properties = {};
      utilities.enable_uid_for_resource(TestResource);
      return TestResource;

    },

    "should wrap new / create functions on resources.": function(resource) {
      var data = resource.new({});
      assert.isNotNull(data.uid);
      assert.equal(data.uid.length, 8);

      data = resource.create({});
      assert.isNotNull(data.uid);
      assert.equal(data.uid.length, 8);
    },

    "should automatically add uid to properties.": function(resource) {
      assert.isNotNull(resource._properties.uid);
      assert.equal(resource._properties.uid.type, String);
      assert.equal(resource._properties.uid.params.required, true);
    }
  }


}).export(module);
