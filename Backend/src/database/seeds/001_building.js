/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("building").del();
  await knex("building").insert([
    { name_building: "Predio Sul" },
    { name_building: "Predio Norte" },
    { name_building: "Predio Central" },
  ]);
};
