
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(table) {
    table.increments();
    table.float('longitude');
    table.float('latitude');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
