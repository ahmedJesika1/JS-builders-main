const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const VideoService = require("./video.service.js");

class VideoController {
  createVideo = withTransaction(async (req, res, next, session) => {
    const payload = {
      url: req?.body?.url,
      // isActive: req?.body?.isActive,
    };
    const videoResult = await VideoService.createVideo(payload, session);
    const resDoc = responseHandler(
      201,
      "Video Created successfully",
      videoResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllVideo = catchError(async (req, res) => {
    const { type } = req.query;

    const videoResult = await VideoService.getAllVideo(type);
    const resDoc = responseHandler(200, "Get All Videos", videoResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getVideoWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const video = await VideoService.getVideoWithPagination(payload);
    const resDoc = responseHandler(200, "Videos get successfully", video);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleVideo = catchError(async (req, res) => {
    const id = req.params.id;
    const videoResult = await VideoService.getSingleVideo(id);
    const resDoc = responseHandler(
      201,
      "Single Video successfully",
      videoResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateVideo = catchError(async (req, res) => {
    const id = req.params.id;

    const payload = {
      url: req?.body?.url,
      isActive: req?.body?.isActive,
    };
    const videoResult = await VideoService.updateVideo(id, payload);
    const resDoc = responseHandler(
      201,
      "Video Update successfully",
      videoResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateVideoStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const videoResult = await VideoService.updateVideoStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Video Status Update successfully",
      videoResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteVideo = catchError(async (req, res) => {
    const id = req.params.id;

    const videoResult = await VideoService.deleteVideo(id);
    const resDoc = responseHandler(
      200,
      "Video Deleted successfully",
      videoResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new VideoController();
