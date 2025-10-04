const { Router } = require("express");
const controller = require("../../modules/aboutUs/about.us.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const AboutUsRoute = Router();
// AboutUsRoute.use(jwtAuth());

AboutUsRoute.route("/")
  .post(upload.any(), controller.createAboutUs)
  .get(controller.getAllAboutUs);

AboutUsRoute.get("/pagination", controller.getAboutUsWithPagination);

AboutUsRoute.route("/:id")
  .get(controller.getSingleAboutUs)
  .put(upload.any(), controller.updateAboutUs)
  .delete(controller.deleteAboutUs);




module.exports = AboutUsRoute;
