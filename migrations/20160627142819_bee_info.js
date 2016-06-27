
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bee_info', function(table) {
    table.increments();
    table.text('name');
    table.text('description');
    table.text('image');
    table.text('species');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bee_info');
};
