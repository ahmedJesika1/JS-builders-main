const { Router } = require("express");
const controller = require("../../modules/service/service.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ServiceRoute = Router();
// ServiceRoute.use(jwtAuth());

ServiceRoute.route("/")
  .post(upload.any(), controller.createService)
  .get(controller.getAllService);

ServiceRoute.get("/pagination", controller.getServiceWithPagination);

ServiceRoute.route("/:id")
  .get(controller.getSingleService)
  .put(upload.any(), controller.updateService)
  .delete(controller.deleteService);

module.exports = ServiceRoute;
