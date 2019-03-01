import supertest from "supertest";
import app from "../../../index";
import { User } from "../../../database/models";
import { generateUser } from "../../utils/generate";

describe("The user login", () => {
  test("the user can login and get a jwt", async () => {
    const { user, access_token, fakeUser } = await generateUser();

    //action
    const response = await supertest(app)
      .post("/api/v1/users/signin")
      .send({
        email: fakeUser.email,
        password: fakeUser.password
      });

    expect(response.status).toBe(200);
    expect(response.body.data.access_token).toBeTruthy();
    expect(response.body.data.user.email).toBe(user.email);
    //make post request
    User.destroy({ where: {} });
  });
});
