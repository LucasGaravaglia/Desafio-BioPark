const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("buildings");
    return res.json(results);
  },
  async create(req, res) {
    const { name_building } = req.body;
    try {
      const results = await knex("buildings").where({ name_building });
      if (results) {
        await knex("buildings").insert({ name_building });
        const id = await knex("buildings").where({ name_building });
        return res.status(201).send({ id: id[0].id });
      } else {
        return res.status(404).send("Ja existe esse predio.");
      }
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  async update(req, res) {
    const { name_building } = req.body;
    const { id } = req.params;
    try {
      await knex("buildings").update({ name_building }).where({ id });
      return res.status(201).send();
    } catch (error) {
      return res.status(404).send(error);
    }
  },
};
