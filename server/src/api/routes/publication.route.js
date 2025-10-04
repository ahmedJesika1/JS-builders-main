const { Router } = require("express");
const controller = require("../../modules/publication/publication.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const PublicationRoute = Router();
// PublicationRoute.use(jwtAuth());

PublicationRoute.route("/")
  .post(upload.any(), controller.createPublication)
  .get(controller.getAllPublication);

PublicationRoute.get("/pagination", controller.getPublicationWithPagination);

PublicationRoute.route("/:id")
  .get(controller.getSinglePublication)
  .put(upload.any(), controller.updatePublication)
  .delete(controller.deletePublication);




module.exports = PublicationRoute;
