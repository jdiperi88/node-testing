let { add } = require("../index.js");
let assert = require("assert");
describe("the add function tests", function() {
  it("should return 11 for arguments 5 and 6", function() {
    const actual = add(5, 6);
    const expectation = 11;
    expect(actual).toBe(expectation);
  });

  it("should throw an error if arugments are not passed in", function() {
    expect(() => {
      add(4);
    }).toThrow();
  });
});
