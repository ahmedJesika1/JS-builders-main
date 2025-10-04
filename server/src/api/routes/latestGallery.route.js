const { Router } = require("express");
const controller = require("../../modules/latestGallery/latest.gallery.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const LatestGalleryRoute = Router();
// LatestGalleryRoute.use(jwtAuth());

LatestGalleryRoute.route("/")
  .post(upload.any(), controller.createLatestGallery)
  .get(controller.getAllLatestGallery);

LatestGalleryRoute.get(
  "/pagination",
  controller.getLatestGalleryWithPagination
);

LatestGalleryRoute.route("/:id")
  .get(controller.getSingleLatestGallery)
  .put(upload.any(), controller.updateLatestGallery)
  .delete(controller.deleteLatestGallery);

module.exports = LatestGalleryRoute;
