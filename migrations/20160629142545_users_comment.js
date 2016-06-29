
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_comment', function(table) {
    table.increments();
    table.integer('users_id').references('id').inTable('users');
    table.integer('comment_id').references('id').inTable('comment');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_comment');
};
