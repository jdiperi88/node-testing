const faker = require("faker");
const server = require("../utils/setup");
const { Todo } = require("../src/database/models/Todo");

describe("the todo creation process", () => {
  it("can create a todo", async () => {
    const todo = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(3),
      completed: false
    };

    const res = await server.post("/todos").send(todo);

    expect(res.body.message).toBe("Todo created successfully.");

    const todoFromDatabase = await Todo.find({
      raw: true,
      where: { title: todo.title }
    });

    expect(todoFromDatabase.title).toBe(todo.title);
    expect(todoFromDatabase.description).toBe(todo.description);
  });
});
