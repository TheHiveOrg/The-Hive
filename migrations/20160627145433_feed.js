
exports.up = function(knex, Promise) {
  return knex.schema.table('feed', function(table) {
    table.integer('user_id').references('id').inTable('user');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('feed', function(table) {
    table.dropColumn('user_id');
  })
};
