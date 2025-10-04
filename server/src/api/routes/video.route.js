const { Router } = require("express");
const controller = require("../../modules/video/video.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const VideoRoute = Router();
// VideoRoute.use(jwtAuth());

VideoRoute.route("/")
  .post(upload.any(), controller.createVideo)
  .get(controller.getAllVideo);

VideoRoute.get("/pagination", controller.getVideoWithPagination);

VideoRoute.route("/:id")
  .get(controller.getSingleVideo)
  .put(upload.any(), controller.updateVideo)
  .delete(controller.deleteVideo);

module.exports = VideoRoute;
