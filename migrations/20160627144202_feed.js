
exports.up = function(knex, Promise) {
  return knex.schema.createTable('feed', function(table) {
    table.increments();
    table.integer('post_id').references('id').inTable('post');
    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('feed');
};
