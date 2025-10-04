const { Router } = require("express");
const controller = require("../../modules/event/event.controller.js");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const EventRoute = Router();
// EventRoute.use(jwtAuth());

EventRoute.route("/")
  .post(upload.any(), controller.createEvent)
  .get(controller.getAllEvent);

EventRoute.get("/pagination", controller.getEventWithPagination);

EventRoute.route("/:id")
  .get(controller.getSingleEvent)
  .put(upload.any(), controller.updateEvent)
  .delete(controller.deleteEvent);




module.exports = EventRoute;
