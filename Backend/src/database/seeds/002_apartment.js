/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("apartments").del();
  await knex("apartments").insert([
    { building_id: 1, number: 1, have_guest: 0, price: 135.69 },
    { building_id: 1, number: 2, have_guest: 0, price: 135.69 },
    { building_id: 1, number: 3, have_guest: 0, price: 135.69 },
    {
      building_id: 1,
      number: 4,
      have_guest: 1,
      name_guest: "Lucas Garavaglia",
      contact_guest: "garavaglia.dev@gmail.com",
      busy_until: "2023/04/23",
      price: 135.69,
    },
    {
      building_id: 2,
      number: 1,
      have_guest: 0,
      price: 135.69,
    },
    {
      building_id: 2,
      number: 2,
      have_guest: 0,
      price: 135.69,
    },
    {
      building_id: 3,
      number: 1,
      have_guest: 0,
      price: 135.69,
    },
    {
      building_id: 3,
      number: 2,
      have_guest: 1,
      name_guest: "Vitor Gabriel Garavaglia",
      contact_guest: "garavaglia.vitor@gmail.com",
      busy_until: "2023/07/23",
      price: 135.69,
    },
  ]);
};
