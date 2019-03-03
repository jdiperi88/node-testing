const { Todo } = require("../database/models/Todo");

module.exports = app => {
  app.get("/todos/new", (req, res) => {
    res.render("create");
  });

  app.post("/todos", async (req, res) => {
    const todo = await Todo.create(req.body);

    res.redirect(`/todos/${todo.id}`);
  });

  app.get("/todos/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id, { raw: true });
      // res.send({
      //   id: todo.id,
      //   title: todo.title,
      //   description: todo.description,
      //   completed: todo.completed
      // });
      res.render("show", todo);
    } catch (err) {
      return res.status(404).json({ message: "Todo not found." });
    }
  });
  app.post("/todos", async (req, res) => {
    const todo = await Todo.create(req.body);
    res.send({ message: "Todo created successfully." });
  });
};
