
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bee_info', function(table) {
    table.increments();
    table.text('genus');
    table.text('species');
    table.text('description');
    table.text('image');
    table.float('lat');
    table.float('lng');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bee_info');
};
