const faker = require("fakeer");

module.exports = {
  generateUser: () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }),
  generateFakeRecipe: () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(4),
    timeToCook: faker.random.number(),
    ingredients: [faker.lorem.sentence(), faker.lorem.sentence()],
    procedure: [faker.lorem.sentence(), faker.lorem.sentence()]
  })
};
