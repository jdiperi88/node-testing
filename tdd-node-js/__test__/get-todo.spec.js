const { generateTodo } = require("../utils/generate");
const server = require("../utils/setup");
const { Todo } = require("../src/database/models/Todo");

describe("get single todo", () => {
  it("can get single todo", async () => {
    const todo = generateTodo();
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
