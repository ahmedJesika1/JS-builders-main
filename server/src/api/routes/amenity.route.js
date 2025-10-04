const { Router } = require("express");
const controller = require("../../modules/amenity/amenity.controller.js");
const { upload } = require("../../middleware/upload/upload.js");

const AmenityRoute = Router();

AmenityRoute.route("/")
  .post(upload.any(), controller.createAmenity)
  .get(controller.getAllAmenities);

AmenityRoute.get("/pagination", controller.getAmenityWithPagination);

AmenityRoute.route("/:id")
  .get(controller.getSingleAmenity)
  .put(upload.any(), controller.updateAmenity)
  .delete(controller.deleteAmenity);

module.exports = AmenityRoute;
