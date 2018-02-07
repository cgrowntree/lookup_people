
exports.up = function(knex, Promise) {
  // migrate forward
  return Promise.all([
    knex.schema.createTable("milestones", function (table) {
      table.increments("id");
      table.string("description");
      table.date("date_achieved");
    })
  ]);
};

exports.down = function(knex, Promise) {
  // migrate backward
  return Promise.all([
    knex.schema.dropTable("milestones")
  ]);
};
