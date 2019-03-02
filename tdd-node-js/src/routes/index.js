const { Todo } = require("../database/models/Todo");

module.exports = app => {
  app.get("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id, { raw: true });
    console.log(todo);
    res.send({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed
    });
  });
  app.post("/todos", async (req, res) => {
    const todo = await Todo.create(req.body);
    res.send({ message: "Todo created successfully." });
  });
};
