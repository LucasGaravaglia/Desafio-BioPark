exports.up = (knex) => {
  return knex.schema.createTable("apartments", (table) => {
    table.increments("id");
    table.integer("number");
    table
      .integer("building_id")
      .references("buildings.id")
      .notNullable()
      .onDelete("CASCADE");
    table.integer("have_guest").default(0);
    table.text("name_guest").default("");
    table.text("contact_guest").default("");
    table.double("price").default(0.0);
    table.text("busy_until").default(knex.fn.now().toString());
  });
};

exports.down = (knex) => knex.schema.dropTable("apartments");
