import middleware from "../../../middleware";
import { User } from "../../../database/models";
import jwt from "jsonwebtoken";
const { auth } = middleware;
import faker from "faker";
describe("The auth middleware", () => {
  test("should call next if user is authenticated", async () => {
    const user = await User.create({
      name: "Joey Dip",
      email: faker.internet.email(),
      password: "password"
    });
    const req = {
      body: { access_token: jwt.sign({ email: user.email }, "secret") }
    };

    const res = {};

    const next = jest.fn();

    await auth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.authUser).toBeDefined();
    expect(req.authUserObj).toBeDefined();
    await User.destroy({ where: {} });
  });

  test("should call sendFailureResponse function if user is not authenticated", async () => {
    const req = {
      body: {},
      query: {},
      headers: {}
    };

    const res = {
      sendFailureResponse: jest.fn()
    };

    const next = jest.fn();

    await auth(req, res, next);

    expect(res.sendFailureResponse).toHaveBeenCalledWith(
      {
        message: "Unauthenticated."
      },
      401
    );
  });

  test("should throw an error if user is not found", async () => {
    const req = {
      body: { access_token: jwt.sign({ email: "notfound" }, "secret") }
    };

    const res = {
      sendFailureResponse: jest.fn()
    };

    const next = jest.fn();

    await auth(req, res, next);
    expect(res.sendFailureResponse).toHaveBeenCalledWith(
      {
        message: "Unauthenticated."
      },
      401
    );
  });
});
