const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const AboutUsService = require("./about.us.service.js");

class AboutUsController {
  createAboutUs = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      mission: req?.body?.mission,
      vision: req?.body?.vision,
      value: req?.body?.value,
      // isActive: req?.body?.isActive,
    };
    const aboutUsResult = await AboutUsService.createAboutUs(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "AboutUs Created successfully",
      aboutUsResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllAboutUs = catchError(async (req, res) => {
    const aboutUsResult = await AboutUsService.getAllAboutUs();
    const resDoc = responseHandler(200, "Get All AboutUss", aboutUsResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAboutUsWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const aboutUs = await AboutUsService.getAboutUsWithPagination(payload);
    const resDoc = responseHandler(200, "AboutUss get successfully", aboutUs);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleAboutUs = catchError(async (req, res) => {
    const id = req.params.id;
    const aboutUsResult = await AboutUsService.getSingleAboutUs(id);
    const resDoc = responseHandler(
      201,
      "Single AboutUs successfully",
      aboutUsResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateAboutUs = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      mission: req?.body?.mission,
      vision: req?.body?.vision,
      value: req?.body?.value,
      isActive: req?.body?.isActive,
    };
    const aboutUsResult = await AboutUsService.updateAboutUs(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "AboutUs Update successfully",
      aboutUsResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateAboutUsStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const aboutUsResult = await AboutUsService.updateAboutUsStatus(id, status);
    const resDoc = responseHandler(
      201,
      "AboutUs Status Update successfully",
      aboutUsResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteAboutUs = catchError(async (req, res) => {
    const id = req.params.id;

    const aboutUsResult = await AboutUsService.deleteAboutUs(id);
    const resDoc = responseHandler(
      200,
      "AboutUs Deleted successfully",
      aboutUsResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new AboutUsController();
