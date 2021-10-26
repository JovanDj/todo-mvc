// Update with your config settings.
const { knexSnakeCaseMappers } = require("objection");

module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
  connection: {
    filename: "todos.sqlite",
  },
  ...knexSnakeCaseMappers(),
};
