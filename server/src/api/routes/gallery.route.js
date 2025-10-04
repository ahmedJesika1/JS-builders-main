const { Router } = require("express");
const controller = require("../../modules/gallery/gallery.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const GalleryRoute = Router();
// GalleryRoute.use(jwtAuth());

GalleryRoute.route("/")
  .post(upload.any(), controller.createGallery)
  .get(controller.getAllGallery);

GalleryRoute.get("/pagination", controller.getGalleryWithPagination);

GalleryRoute.route("/:id")
  .get(controller.getSingleGallery)
  .put(upload.any(), controller.updateGallery)
  .delete(controller.deleteGallery);




module.exports = GalleryRoute;
