exports.up = function(knex, Promise) {
  return knex.schema.createTable('quiz', function(tbl) {
    tbl.increments()

    tbl
      .string('name')
      .notNullable()
      .unique('name')

    tbl
      .string('type')
      .notNullable()

    tbl
      .boolean('completed')
      .defaultTo(false)

    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quiz')
};