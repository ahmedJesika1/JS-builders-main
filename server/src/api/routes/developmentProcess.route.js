const { Router } = require("express");
const controller = require("../../modules/developmentProcess/development.process.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const DevelopmentProcessRoute = Router();
// DevelopmentProcessRoute.use(jwtAuth());

DevelopmentProcessRoute.route("/")
  .post(upload.any(), controller.createDevelopmentProcess)
  .get(controller.getAllDevelopmentProcess);

DevelopmentProcessRoute.get(
  "/pagination",
  controller.getDevelopmentProcessWithPagination
);

DevelopmentProcessRoute.route("/:id")
  .get(controller.getSingleDevelopmentProcess)
  .put(upload.any(), controller.updateDevelopmentProcess)
  .delete(controller.deleteDevelopmentProcess);

module.exports = DevelopmentProcessRoute;