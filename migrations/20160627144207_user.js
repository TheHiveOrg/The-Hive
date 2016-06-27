
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    table.increments();
    table.text('first_name');
    table.text('last_name');
    table.text('username');
    table.text('avatar');
    table.text('google_id');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('user');
};
