const { Router } = require("express");
const controller = require("../../modules/client/client.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const ClientRouter = Router();
// TeamRoute.use(jwtAuth());

ClientRouter.route("/")
  .post(upload.any(), controller.createClient)
  .get(controller.getAllClient);

ClientRouter.get("/pagination", controller.getClientWithPagination);

ClientRouter.route("/:id")
  .get(controller.getSingleClient)
  .put(upload.any(), controller.updateClient)
  .delete(controller.deleteClient);




module.exports = ClientRouter;
