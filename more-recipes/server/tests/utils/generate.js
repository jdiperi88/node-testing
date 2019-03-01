import faker from "faker";
import { User } from "../../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

export const generateUser = async () => {
  const fakeUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
  const user = await User.create({
    ...fakeUser,
    password: bcrypt.hashSync(fakeUser.password, 1)
  });

  const access_token = jwt.sign({ email: user.email }, config.JWT_SECRET);

  return { user, access_token, fakeUser };
};

export const generateRecipe = async () => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    timeToCook: "50min",
    imageUrl: faker.internet.url(),
    ingredients: JSON.stringify([faker.lorem.sentence()]),
    procedure: JSON.stringify([faker.lorem.sentence()])
  };
};
