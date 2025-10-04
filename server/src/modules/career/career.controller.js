const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const CareerService = require("./career.service.js");

class CareerController {
  createCareer = withTransaction(async (req, res, next, session) => {
    // const payloadFiles = {
    //   files: req.files,
    // };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      // isActive: req?.body?.isActive,
    };
    const careerResult = await CareerService.createCareer(
      payload,
      // payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Career Created successfully",
      careerResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllCareer = catchError(async (req, res) => {
    const careerResult = await CareerService.getAllCareer();
    const resDoc = responseHandler(200, "Get All Careers", careerResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getCareerWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const career = await CareerService.getCareerWithPagination(payload);
    const resDoc = responseHandler(200, "Careers get successfully", career);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleCareer = catchError(async (req, res) => {
    const id = req.params.id;
    const careerResult = await CareerService.getSingleCareer(id);
    const resDoc = responseHandler(
      201,
      "Single Career successfully",
      careerResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateCareer = catchError(async (req, res) => {
    const id = req.params.id;
    // const payloadFiles = {
    //   files: req?.files,
    // };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      isActive: req?.body?.isActive,
    };
    const careerResult = await CareerService.updateCareer(
      id,
      // payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Career Update successfully",
      careerResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateCareerStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const careerResult = await CareerService.updateCareerStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Career Status Update successfully",
      careerResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteCareer = catchError(async (req, res) => {
    const id = req.params.id;

    const careerResult = await CareerService.deleteCareer(id);
    const resDoc = responseHandler(
      200,
      "Career Deleted successfully",
      careerResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new CareerController();
