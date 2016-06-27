
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
    table.increments();
    table.text('title');
    table.text('description');
    table.integer('bee_id').references('id').inTable('bee_info');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
