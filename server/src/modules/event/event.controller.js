const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const EventService = require("./event.service.js");

class EventController {
  createEvent = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      date: req?.body?.date,
      time: req?.body?.time,
      location: req?.body?.location,
      link: req?.body?.link,
      // isActive: req?.body?.isActive,
    };
    const eventResult = await EventService.createEvent(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Event Created successfully",
      eventResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllEvent = catchError(async (req, res) => {
    const eventResult = await EventService.getAllEvent();
    const resDoc = responseHandler(200, "Get All Events", eventResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getEventWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const event = await EventService.getEventWithPagination(payload);
    const resDoc = responseHandler(200, "Events get successfully", event);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleEvent = catchError(async (req, res) => {
    const id = req.params.id;
    const eventResult = await EventService.getSingleEvent(id);
    const resDoc = responseHandler(
      201,
      "Single Event successfully",
      eventResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateEvent = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      date: req?.body?.date,
      time: req?.body?.time,
      location: req?.body?.location,
      link: req?.body?.link,
      isActive: req?.body?.isActive,
    };
    const eventResult = await EventService.updateEvent(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Event Update successfully",
      eventResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateEventStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const eventResult = await EventService.updateEventStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Event Status Update successfully",
      eventResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteEvent = catchError(async (req, res) => {
    const id = req.params.id;

    const eventResult = await EventService.deleteEvent(id);
    const resDoc = responseHandler(
      200,
      "Event Deleted successfully",
      eventResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new EventController();
