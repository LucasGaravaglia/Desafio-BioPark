const express = require("express");
const routes = express.Router();

const buildingController = require("./controllers/buildingController");
const apartmentController = require("./controllers/apartmentController");

routes
  //Rotas para manter predios
  .get("/building", buildingController.index)
  .post("/building", buildingController.create)
  .put("/building/:id", buildingController.update)
  //Rotas para manter apartamentos
  .get("/apartment/:building_id", apartmentController.index)
  .post("/apartment", apartmentController.create)
  .put("/apartment/:id", apartmentController.update);

module.exports = routes;
