const { Router } = require("express");
const controller = require("../../modules/brochure/brochure.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const BrochureRoute = Router();
// BrochureRoute.use(jwtAuth());

BrochureRoute.route("/")
  .post(upload.any(), controller.createBrochure)
  .get(controller.getAllBrochure);

BrochureRoute.get("/pagination", controller.getBrochureWithPagination);

BrochureRoute.route("/:id")
  .get(controller.getSingleBrochure)
  .put(upload.any(), controller.updateBrochure)
  .delete(controller.deleteBrochure);




module.exports = BrochureRoute;
