const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const LatestGalleryService = require("./latest.gallery.service.js");

class LatestGalleryController {
  createLatestGallery = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      // isActive: req?.body?.isActive,
    };
    const latestGalleryResult = await LatestGalleryService.createLatestGallery(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "LatestGallery Created successfully",
      latestGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllLatestGallery = catchError(async (req, res) => {
    const latestGalleryResult =
      await LatestGalleryService.getAllLatestGallery();
    const resDoc = responseHandler(
      200,
      "Get All LatestGallerys",
      latestGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getLatestGalleryWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const latestGallery =
      await LatestGalleryService.getLatestGalleryWithPagination(payload);
    const resDoc = responseHandler(
      200,
      "LatestGallerys get successfully",
      latestGallery
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleLatestGallery = catchError(async (req, res) => {
    const id = req.params.id;
    const latestGalleryResult =
      await LatestGalleryService.getSingleLatestGallery(id);
    const resDoc = responseHandler(
      201,
      "Single LatestGallery successfully",
      latestGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateLatestGallery = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      isActive: req?.body?.isActive,
    };
    const latestGalleryResult = await LatestGalleryService.updateLatestGallery(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "LatestGallery Update successfully",
      latestGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateLatestGalleryStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const latestGalleryResult =
      await LatestGalleryService.updateLatestGalleryStatus(id, status);
    const resDoc = responseHandler(
      201,
      "LatestGallery Status Update successfully",
      latestGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteLatestGallery = catchError(async (req, res) => {
    const id = req.params.id;

    const latestGalleryResult = await LatestGalleryService.deleteLatestGallery(
      id
    );
    const resDoc = responseHandler(
      200,
      "LatestGallery Deleted successfully",
      latestGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new LatestGalleryController();
