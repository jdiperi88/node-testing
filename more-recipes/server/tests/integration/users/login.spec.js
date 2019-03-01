import supertest from "supertest";
import app from "../../../index";
import { User } from "../../../database/models";
import bcrypt from "bcrypt";

describe("The user login", () => {
  test("the user can login and get a jwt", async () => {
    const fakeUser = {
      name: "joey dip",
      email: "jdip@gmail.com",
      password: bcrypt.hashSync("password", 1)
    };
    //action
    await User.create(fakeUser);
    const response = await supertest(app)
      .post("/api/v1/users/signin")
      .send({
        email: fakeUser.email,
        password: "password"
      });

    expect(response.status).toBe(200);
    expect(response.body.data.access_token).toBeTruthy();
    expect(response.body.data.user.email).toBe(fakeUser.email);
    //make post request
    User.destroy({ where: {} });
  });
});
