const { Router } = require("express");
const controller = require("../../modules/team/team.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const TeamRoute = Router();
// TeamRoute.use(jwtAuth());

TeamRoute.route("/")
  .post(upload.any(), controller.createTeam)
  .get(controller.getAllTeam);

TeamRoute.get("/pagination", controller.getTeamWithPagination);

TeamRoute.route("/:id")
  .get(controller.getSingleTeam)
  .put(upload.any(), controller.updateTeam)
  .delete(controller.deleteTeam);




module.exports = TeamRoute;
