let { add } = require("./index");
let assert = require("assert");
describe("the add function tests", function() {
  it("should return 11 for arguments 5 and 6", function() {
    const actual = add(5, 6);
    const expectation = 11;
    assert.equal(actual, expectation);
  });

  it("should throw an error if arugments are not passed in", function() {
    assert.throws(() => {
      add(2);
    });
  });
});
