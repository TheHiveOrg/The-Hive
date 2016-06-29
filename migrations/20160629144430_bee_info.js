exports.up = function(knex, Promise) {
  return knex.schema.table('bee_info', function(table) {
    table.integer('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('bee_info', function(table) {
    table.dropColumn('user_id');
  })
};
