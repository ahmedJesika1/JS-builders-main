const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BrochureService = require("./brochure.service.js");

class BrochureController {
  createBrochure = withTransaction(async (req, res, next, session) => {
    const { title, description, successStory } = req.body;

    const file = req.files?.[0]; // single file
    if (!file) throw new Error("image is required");

    const payload = { title, description, successStory, file };

    const brochureResult = await BrochureService.createBrochure(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Brochure Created successfully",
      brochureResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBrochure = catchError(async (req, res) => {
    const brochureResult = await BrochureService.getAllBrochure();
    const resDoc = responseHandler(200, "Get All Brochures", brochureResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getBrochureWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const brochure = await BrochureService.getBrochureWithPagination(payload);
    const resDoc = responseHandler(200, "Brochures get successfully", brochure);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleBrochure = catchError(async (req, res) => {
    const id = req.params.id;
    const brochureResult = await BrochureService.getSingleBrochure(id);
    const resDoc = responseHandler(
      201,
      "Single Brochure successfully",
      brochureResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBrochure = catchError(async (req, res) => {
    const id = req.params.id;
    const files = req.files || [];

    const payload = {
      title: req.body.title,
      description: req.body.description,
      successStory: req.body.successStory,
    };

    const brochure = await BrochureService.updateBrochure(id, payload, files);
    const resDoc = responseHandler(
      201,
      "Brochure Updated successfully",
      brochure
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBrochureStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const brochure = await BrochureService.updateBrochureStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Brochure Status Update successfully",
      brochure
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteBrochure = catchError(async (req, res) => {
    const id = req.params.id;

    const brochure = await BrochureService.deleteBrochure(id);
    const resDoc = responseHandler(
      200,
      "Brochure Deleted successfully",
      brochure
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BrochureController();
