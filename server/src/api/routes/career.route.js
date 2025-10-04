const { Router } = require("express");
const controller = require("../../modules/career/career.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const CareerRoute = Router();
// CareerRoute.use(jwtAuth());

CareerRoute.route("/")
  .post(upload.any(), controller.createCareer)
  .get(controller.getAllCareer);

CareerRoute.get("/pagination", controller.getCareerWithPagination);

CareerRoute.route("/:id")
  .get(controller.getSingleCareer)
  .put(upload.any(), controller.updateCareer)
  .delete(controller.deleteCareer);




module.exports = CareerRoute;
