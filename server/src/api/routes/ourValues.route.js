const { Router } = require("express");
const controller = require("../../modules/ourValues/our.values.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const OurValuesRoute = Router();
// OurValuesRoute.use(jwtAuth());

OurValuesRoute.route("/")
  .post(upload.any(), controller.createOurValues)
  .get(controller.getAllOurValues);

OurValuesRoute.get("/pagination", controller.getOurValuesWithPagination);

OurValuesRoute.route("/:id")
  .get(controller.getSingleOurValues)
  .put(upload.any(), controller.updateOurValues)
  .delete(controller.deleteOurValues);




module.exports = OurValuesRoute;
