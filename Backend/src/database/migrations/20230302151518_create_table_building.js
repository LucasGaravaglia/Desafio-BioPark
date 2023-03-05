exports.up = (knex) => {
  knex.schema.dropTableIfExists("buildings");
  return knex.schema.createTable("buildings", (table) => {
    table.increments("id");
    table.text("name_building").unique().notNullable();
  });
};

exports.down = (knex) => knex.schema.dropTable("buildings");
