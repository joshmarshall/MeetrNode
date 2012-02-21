var vows = require("vows");
var assert = require("assert");
var Person = require("../models/person.js").Person;

vows.describe("Person models").addBatch({

  "New people": {
    topic: function() {
      Person.create({
        name: "Tom Wilkerson"
      }, this.callback);
    },

    "should have a name": function(person) {
      assert.equal(person.name, "Tom Wilkerson");
    },

    "should have a uid": function(person) {
      assert.equal(person.uid.length, 8);
    },

    "should have a username": function(person) {
      assert.equal(person.username, "tomwilkerson"); // generating a default

    },

    "should be able to specify a username": {
      topic: function() {
        Person.create({
          name: "Wilbur",
          username: "wilbur"
        }, this.callback);
      },

      "(checking)": function(person) {
        assert.equal(person.username, "wilbur");
      }
    }
  }
}).export(module);

