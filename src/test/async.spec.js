const assert = require("assert");
const { findUserByEmail, findUserById } = require("../async");
describe("the async tests", () => {
  describe("The findUserById function", () => {
    it("should return found user data by id", done => {
      //   const result = await findUserById(1);
      findUserById(1).then(result => {
        assert.equal(result.user.name, "Joey DiPeri");
        done();
      });
    });
    it("should throw error if user not found", done => {
      findUserById(10).catch(error => {
        assert.equal(error.message, "User with id: 10 was not found.");
        done();
      });
    });

    it("should return found user data by id", async () => {
      const result = await findUserById(1);
      assert.equal(result.user.name, "Joey DiPeri");
    });
  });

  describe("The findUserByEmail function", () => {
    it("should return found user data by id", done => {
      //   const result = await findUserById(1);
      findUserByEmail("jdiperi@example.com").then(result => {
        assert.equal(result.user.name, "Joey DiPeri");
        done();
      });
    });

    it("should throw error if user not found", done => {
      findUserByEmail("jd").catch(error => {
        assert.equal(error.message, "User with email: jd was not found.");
        done();
      });
    });
  });
});
