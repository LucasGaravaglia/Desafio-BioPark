exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("buildings").del();
  await knex("buildings").insert([
    { name_building: "Predio Sul" },
    { name_building: "Predio Norte" },
    { name_building: "Predio Central" },
  ]);
};
