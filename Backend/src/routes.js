const express = require("express");
const knex = require("./database");
const routes = express.Router();

const buildingController = require("./controllers/buildingController");

routes.get("/building", buildingController.index);

module.exports = routes;
