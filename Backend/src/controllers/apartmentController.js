const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    const { building_id } = req.params;
    try {
      const query = knex("apartments");

      if (building_id) query.where({ building_id });

      const results = await query;
      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const {
      building_id,
      number,
      have_guest,
      name_guest,
      contact_guest,
      busy_until,
      price,
    } = req.body;
    try {
      await knex("apartments").insert({
        building_id,
        number,
        have_guest,
        name_guest,
        contact_guest,
        busy_until,
        price,
      });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { have_guest, name_guest, contact_guest, busy_until } = req.body;
    const { id } = req.params;
    try {
      await knex("apartments")
        .update({
          have_guest,
          name_guest,
          contact_guest,
          busy_until,
        })
        .where({ id });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
