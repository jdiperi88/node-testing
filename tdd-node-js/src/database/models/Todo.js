const Sequelize = require("sequelize");
const dbName = "todos_db";

const db = new Sequelize({
  database: dbName,
  dialect: "postgres",
  define: {
    underscored: true
  }
});

const Todo = db.define("todo", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  completed: Sequelize.BOOLEAN
});

db.sync();

module.exports = {
  Todo
};
