const { Router } = require("express");
const controller = require("../../modules/contact/contact.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ContactRoute = Router();
// ContactRoute.use(jwtAuth());

ContactRoute.route("/")
  .post(upload.any(), controller.createContact)
  .get(controller.getAllContact);

ContactRoute.get("/pagination", controller.getContactWithPagination);

ContactRoute.route("/:id")
  .get(controller.getSingleContact)
  .put(upload.any(), controller.updateContact)
  .delete(controller.deleteContact);




module.exports = ContactRoute;
