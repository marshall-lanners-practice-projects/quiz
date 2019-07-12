exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function(tbl) {
    tbl.increments()

    tbl
      .string('question')
      .notNullable()

    tbl
      .string('answer')
      .notNullable()

    tbl
      .integer('quiz_id')
      .references('id')
      .inTable('quiz')
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
};