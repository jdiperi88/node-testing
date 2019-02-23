const assert = require("assert");
const { parse, stringify } = require("../query");

describe("The query package", function() {
  describe("The Parse Function", function() {
    it("should return an objet of all query params when a query string is passed to it.", function() {
      const query = "?by=joseph-diperi";
      const actual = parse(query);
      const expectation = {
        by: "joseph-diperi"
      };

      assert.deepEqual(actual, expectation);
    });
  });
  describe("The Stringify Function", function() {
    it("should return a query string when an object is passed into it", function() {
      const query = {
        by: "joseph-diperi"
      };
      const actual = stringify(query);
      const expectation = "by=joseph-diperi";

      assert.equal(actual, expectation);
    });
  });
});
