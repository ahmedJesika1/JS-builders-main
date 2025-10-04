const { Router } = require("express");
const controller = require("../../modules/profile/profile.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ProfileRoute = Router();
// ProfileRoute.use(jwtAuth());

ProfileRoute.route("/")
  .post(upload.any(), controller.createProfile)
  .get(controller.getAllProfile);

ProfileRoute.get("/pagination", controller.getProfileWithPagination);

ProfileRoute.route("/:id")
  .get(controller.getSingleProfile)
  .put(upload.any(), controller.updateProfile)
  .delete(controller.deleteProfile);




module.exports = ProfileRoute;
