const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const PublicationService = require("./publication.service.js");

class PublicationController {
  createPublication = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      author: req?.body?.author,
      link: req?.body?.link,
      // isActive: req?.body?.isActive,
    };
    const publicationResult = await PublicationService.createPublication(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Publication Created successfully",
      publicationResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllPublication = catchError(async (req, res) => {
    const publicationResult = await PublicationService.getAllPublication();
    const resDoc = responseHandler(
      200,
      "Get All Publications",
      publicationResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getPublicationWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const publication = await PublicationService.getPublicationWithPagination(
      payload
    );
    const resDoc = responseHandler(
      200,
      "Publications get successfully",
      publication
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSinglePublication = catchError(async (req, res) => {
    const id = req.params.id;
    const publicationResult = await PublicationService.getSinglePublication(id);
    const resDoc = responseHandler(
      201,
      "Single Publication successfully",
      publicationResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatePublication = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      author: req?.body?.author,
      link: req?.body?.link,
      isActive: req?.body?.isActive,
    };
    const publicationResult = await PublicationService.updatePublication(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Publication Update successfully",
      publicationResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatePublicationStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const publicationResult = await PublicationService.updatePublicationStatus(
      id,
      status
    );
    const resDoc = responseHandler(
      201,
      "Publication Status Update successfully",
      publicationResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deletePublication = catchError(async (req, res) => {
    const id = req.params.id;

    const publicationResult = await PublicationService.deletePublication(id);
    const resDoc = responseHandler(
      200,
      "Publication Deleted successfully",
      publicationResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new PublicationController();
