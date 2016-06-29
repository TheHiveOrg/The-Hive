
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments();
    table.text('message');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
