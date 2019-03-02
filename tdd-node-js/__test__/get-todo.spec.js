const faker = require("faker");
const server = require("../utils/setup");
const { Todo } = require("../src/database/models/Todo");

describe("get single todo", () => {
  it("can get single todo", async () => {
    const todo = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(3),
      completed: false
    };
    const databaseTodo = await Todo.create(todo);
    const res = await server.get(`/todos/${databaseTodo.id}`);
    // console.log(res);

    expect(res.body).toEqual({
      id: databaseTodo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed
    });
  });
});
