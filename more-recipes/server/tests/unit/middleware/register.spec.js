import middleware from "../../../middleware";

const { registerUserValidator } = middleware;

test("the registerUserValidator calls the next if the validation is successful", async () => {
  const req = {
    body: {
      name: "joey diperi",
      email: "example@example.com",
      password: "joeyexample"
    }
  };

  const res = { sendFialureResponse() {} };

  //jest.fn() is used to mock a function call
  const next = jest.fn();

  await registerUserValidator(req, res, next);

  expect(next).toHaveBeenCalled();
});

test("the registerUserValidator calls the sendFailureResponse function if the validation fails", async () => {
  const req = {
    body: {
      name: "joey",
      password: "pass"
    }
  };

  const res = {
    sendFailureResponse: jest.fn()
  };

  const next = jest.fn();

  await registerUserValidator(req, res, next);

  expect(res.sendFailureResponse).toHaveBeenCalledWith(
    {
      errors: [
        "The name must be longer than 5 characters.",
        "The password must be longer than 5 characters.",
        "The email is required."
      ]
    },
    422
  );
  expect(next).toHaveBeenCalledTimes(0);
});
