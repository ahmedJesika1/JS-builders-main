const { Router } = require("express");
const controller = require("../../modules/experience/experience.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ExperienceRoute = Router();
// ExperienceRoute.use(jwtAuth());

ExperienceRoute.route("/")
  .post(upload.any(), controller.createExperience)
  .get(controller.getAllExperience);

ExperienceRoute.get("/pagination", controller.getExperienceWithPagination);

ExperienceRoute.route("/:id")
  .get(controller.getSingleExperience)
  .put(upload.any(), controller.updateExperience)
  .delete(controller.deleteExperience);




module.exports = ExperienceRoute;
