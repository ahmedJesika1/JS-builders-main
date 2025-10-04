const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const OurValuesService = require("./our.values.service.js");

class OurValuesController {
  createOurValues = withTransaction(async (req, res, next, session) => {
    const payload = {
      title: req.body.title,
      details: req.body.details,
      info: req.body.info || [],
      // isActive: req?.body?.isActive,
    };
    
    const ourValuesResult = await OurValuesService.createOurValues(
      payload,
      session
    );
    
    const resDoc = responseHandler(
      201,
      "OurValues created successfully",
      ourValuesResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllOurValues = catchError(async (req, res) => {
    const ourValuesResult = await OurValuesService.getAllOurValues();
    const resDoc = responseHandler(
      200,
      "All OurValues retrieved",
      ourValuesResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getOurValuesWithPagination = catchError(async (req, res) => {
    const payload = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      order: req.query.order || "desc",
    };
    const ourValues = await OurValuesService.getOurValuesWithPagination(
      payload
    );
    const resDoc = responseHandler(
      200,
      "OurValues retrieved with pagination",
      ourValues
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleOurValues = catchError(async (req, res) => {
    const id = req.params.id;
    const ourValuesResult = await OurValuesService.getSingleOurValues(id);
    const resDoc = responseHandler(
      200,
      "Single OurValues retrieved successfully",
      ourValuesResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateOurValues = catchError(async (req, res) => {
    const id = req.params.id;
    const payload = {
      title: req.body.title,
      details: req.body.details,
      info: req.body.info || [],
      isActive: req?.body?.isActive,
    };
    const ourValuesResult = await OurValuesService.updateOurValues(id, payload);
    const resDoc = responseHandler(
      200,
      "OurValues updated successfully",
      ourValuesResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteOurValues = catchError(async (req, res) => {
    const id = req.params.id;
    await OurValuesService.deleteOurValues(id);
    const resDoc = responseHandler(200, "OurValues deleted successfully", null);
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new OurValuesController();
