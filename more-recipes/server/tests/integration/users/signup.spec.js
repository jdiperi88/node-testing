import supertest from "supertest";
import app from "../../../index";
import { User } from "../../../database/models";

describe("user sign up test", () => {
  test("should register a new user", async () => {
    //arrange
    //get some fake user data
    const fakeUser = {
      name: "joey dip",
      email: "jdip@gmail.com",
      password: "password"
    };
    //action
    const response = await supertest(app)
      .post("/api/v1/users/signup")
      .send(fakeUser);
    //make post request

    //assertion
    //1. the response has the user data
    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe(fakeUser.email);
    expect(response.body.data.user.name).toBe(fakeUser.name);
    expect(response.body.data.access_token).toBeTruthy();
    //2. the database has a user with the credentials we signed up with.
    const userFromDatabase = await User.find({
      where: { email: fakeUser.email }
    });

    expect(userFromDatabase).toBeTruthy();
    User.destroy({ where: {} });
  });

  test("should return validation error for duplicate email", async () => {
    //arrange
    const fakeUser = {
      name: "joey dip",
      email: "jdip@gmail.com",
      password: "password"
    };
    //action
    //make post request
    await User.create(fakeUser);
    const response = await supertest(app)
      .post("/api/v1/users/signup")
      .send(fakeUser);

    expect(response.status).toBe(422);

    expect(response.body.data).toMatchSnapshot();
    User.destroy({ where: {} });
  });
});
