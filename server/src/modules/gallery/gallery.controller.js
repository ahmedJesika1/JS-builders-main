const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const GalleryService = require("./gallery.service.js");

class GalleryController {
  createGallery = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    console.log(payloadFiles)

    const payload = {
      title: req?.body?.title,
      description: req?.body?.description,
      detail: req?.body?.detail,
      event: req?.body?.event || [],
      // type: req?.body?.type,
      // isActive: req?.body?.isActive,
    };
    console.log(payload, "payload from controller------------");
    const galleryResult = await GalleryService.createGallery(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Gallery Created successfully",
      galleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllGallery = catchError(async (req, res) => {
    const { type } = req.query;

    const galleryResult = await GalleryService.getAllGallery(type);
    const resDoc = responseHandler(200, "Get All Gallerys", galleryResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getGalleryWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const gallery = await GalleryService.getGalleryWithPagination(payload);
    const resDoc = responseHandler(200, "Gallerys get successfully", gallery);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleGallery = catchError(async (req, res) => {
    const id = req.params.id;
    const galleryResult = await GalleryService.getSingleGallery(id);
    const resDoc = responseHandler(
      201,
      "Single Gallery successfully",
      galleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateGallery = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      description: req?.body?.description,
      detail: req?.body?.detail,
      event: req?.body?.event || [],
      isActive: req?.body?.isActive,
    };
    const galleryResult = await GalleryService.updateGallery(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Gallery Update successfully",
      galleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateGalleryStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const galleryResult = await GalleryService.updateGalleryStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Gallery Status Update successfully",
      galleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteGallery = catchError(async (req, res) => {
    const id = req.params.id;

    const galleryResult = await GalleryService.deleteGallery(id);
    const resDoc = responseHandler(
      200,
      "Gallery Deleted successfully",
      galleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new GalleryController();
