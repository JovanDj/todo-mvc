exports.up = function (knex) {
  return knex.schema.createTable("todos", function (table) {
    table.increments("todo_id");
    table.string("title").notNullable();
    table.string("status").notNullable().defaultsTo("pending");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
