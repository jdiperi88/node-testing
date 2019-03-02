const server = require("../utils/setup");
const { generateTodo } = require("../utils/generate");
const { Todo } = require("../src/database/models/Todo");

describe("the todo creation process", () => {
  it("can create a todo", async () => {
    const todo = generateTodo();
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
