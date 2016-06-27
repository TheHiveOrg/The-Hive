
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bee_location', function(table) {
    table.increments();
    table.integer('location_id').references('id').inTable('location');
    table.integer('bee_info').references('id').inTable('bee_info');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('bee_location');
};
