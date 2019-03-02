const faker = require("faker");
module.exports = {
  generateTodo: () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(3),
    completed: false
  })
};
