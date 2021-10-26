const express = require("express");
const app = express();
const { Model } = require("objection");
const knex = require("knex");
const knexFile = require("./knexfile");

Model.knex(knex(knexFile));

class Todo extends Model {
  static get tableName() {
    return "todos";
  }

  static get idColumn() {
    return "todoId";
  }
}

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  const todos = await Todo.query();

  res.render("index", { todos });
});

app.get("/create", (req, res, next) => {
  res.render("create");
});

app.post("/", async (req, res, next) => {
  const { title, status = "pending" } = req.body;
  const todo = await Todo.query().insertAndFetch({ title, status });
  res.redirect(`/${todo.todoId}`);
});

app.post("/:todoId/delete", async (req, res, next) => {
  const { todoId } = req.params;
  await Todo.query().delete().where("todoId", todoId);
  res.redirect("/");
});

app.get("/:todoId/update", async (req, res, next) => {
  const { todoId } = req.params;
  const todo = await Todo.query().findOne({ todoId });

  res.render("update", { todo });
});

app.post("/:todoId/update", async (req, res, next) => {
  const { todoId } = req.params;
  const { title, status } = req.body;

  await Todo.query().findOne({ todoId }).patch({ title, status });
  res.redirect("/");
});

app.get("/:todoId", async (req, res, next) => {
  const { todoId } = req.params;
  const todo = await Todo.query().findOne({ todoId });

  res.render("todo", { todo });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
