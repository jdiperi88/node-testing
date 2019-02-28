import validators from "../../validators";
import { User } from "../../database/models";
const { RegisterUserValidator } = validators;

describe("The RegisterUserValidator Class", () => {
  describe("The validateName Function", () => {
    test("The validateName function adds a required error to the errors array if name is not provided.", () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      //ARRANGE
      const validator = new RegisterUserValidator({
        email: "jdiperi88@gmail.com"
      });
      //ACTION
      validator.validateName();
      const errors = validator.errors;
      //ASSERT
      expect(errors).toEqual(["The name is required."]);
    });

    test("adds an error if name is less than 5 characters", () => {
      //ARRANGE
      const validator = new RegisterUserValidator({
        name: "joey"
      });
      //ACTION
      validator.validateName();
      //assert
      expect(validator.errors).toEqual([
        "The name must be longer than 5 characters."
      ]);
    });
  });

  describe("The validatePassword Function", () => {
    test("The validatePassword function adds a required error to the errors array if Password is not provided.", () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      //ARRANGE
      const validator = new RegisterUserValidator({
        email: "jdiperi88@gmail.com"
      });
      //ACTION
      validator.validatePassword();
      const errors = validator.errors;
      //ASSERT
      expect(errors).toEqual(["The password is required."]);
    });

    test("adds an error if password is less than 5 characters", () => {
      //ARRANGE
      const validator = new RegisterUserValidator({
        password: "joey"
      });
      //ACTION
      validator.validatePassword();
      //assert
      expect(validator.errors).toEqual([
        "The password must be longer than 5 characters."
      ]);
    });
  });

  describe("The validate email function test", () => {
    test("adds a required error to the errors array if email is not provided.", async () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      //ARRANGE
      const validator = new RegisterUserValidator({
        name: "jdiperi88@gmail.com"
      });
      //ACTION
      await validator.validateEmail();
      const errors = validator.errors;
      //ASSERT
      expect(errors).toEqual(["The email is required."]);
    });

    test("adds an email taken error if user already exists with that email", async () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      await User.destroy({ where: {} });
      //ARRANGE
      await User.create({
        name: "Joey",
        email: "example@example.com",
        password: "password"
      });
      const validator = new RegisterUserValidator({
        email: "example@example.com"
      });
      //ACTION
      await validator.validateEmail();
      const errors = validator.errors;
      //ASSERT
      expect(errors).toEqual(["A user with this email already exists."]);
    });
  });

  describe("The isValid Function", () => {
    test("returns true if validation passes", async () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      await User.destroy({ where: {} });
      //ARRANGE
      const validator = new RegisterUserValidator({
        name: "Joey DiPeri",
        email: "jdiperi88@gmail.com",
        password: "password"
      });
      //ACTION
      let result = await validator.isValid();

      //ASSERT
      expect(result).toBe(true);
    });

    test("returns false if validation fails", async () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      await User.destroy({ where: {} });
      //ARRANGE
      const validator = new RegisterUserValidator({
        name: "Joey",
        email: "jdiperi88@gmail.com",
        password: "password"
      });
      //ACTION
      let result = await validator.isValid();

      //ASSERT
      expect(result).toBe(false);
    });

    test("the validateName, validateEmail, validatePassword functions are called in the isValid function", async () => {
      // ARRANGE ACTION ASSERTION 3 STEP CYCLE
      await User.destroy({ where: {} });
      //ARRANGE
      const validator = new RegisterUserValidator({
        name: "Joey",
        email: "jdiperi88gmail.com",
        password: "pass"
      });
      //JEST SPY FUNCTION
      jest.spyOn(validator, "validateName");
      jest.spyOn(validator, "validateEmail");
      jest.spyOn(validator, "validatePassword");
      //ACTION
      let result = await validator.isValid();

      //ASSERT
      expect(validator.validateName).toHaveBeenCalled();
      expect(validator.validateEmail).toHaveBeenCalled();
      expect(validator.validatePassword).toHaveBeenCalled();
    });
  });
});
