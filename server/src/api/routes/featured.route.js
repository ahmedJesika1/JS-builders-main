const { Router } = require("express");
const controller = require("../../modules/featured/featured.controller.js");
const { upload } = require("../../middleware/upload/upload.js");

const FeaturedRoute = Router();

// Create and Get all
FeaturedRoute.route("/")
  .post(upload.any(), controller.createFeatured)
  .get(controller.getAllFeatured);

// Pagination
FeaturedRoute.get("/pagination", controller.getFeaturedWithPagination);

// Single item routes
FeaturedRoute.route("/:id")
  .get(controller.getSingleFeatured)
  .put(upload.any(), controller.updateFeatured)
  .delete(controller.deleteFeatured);

module.exports = FeaturedRoute;
