const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const DevelopmentProcessService = require("./development.process.service.js");

class DevelopmentProcessController {
  createDevelopmentProcess = withTransaction(
    async (req, res, next, session) => {
      const payloadFiles = {
        files: req.files,
      };
      const payload = {
        title: req?.body?.title,
        details: req?.body?.details,
        // isActive: req?.body?.isActive,
      };
      const developmentProcessResult =
        await DevelopmentProcessService.createDevelopmentProcess(
          payload,
          payloadFiles,
          session
        );
      const resDoc = responseHandler(
        201,
        "DevelopmentProcess Created successfully",
        developmentProcessResult
      );
      res.status(resDoc.statusCode).json(resDoc);
    }
  );

  getAllDevelopmentProcess = catchError(async (req, res) => {
    const developmentProcessResult =
      await DevelopmentProcessService.getAllDevelopmentProcess();
    const resDoc = responseHandler(
      200,
      "Get All DevelopmentProcesss",
      developmentProcessResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getDevelopmentProcessWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const developmentProcess =
      await DevelopmentProcessService.getDevelopmentProcessWithPagination(
        payload
      );
    const resDoc = responseHandler(
      200,
      "DevelopmentProcesss get successfully",
      developmentProcess
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleDevelopmentProcess = catchError(async (req, res) => {
    const id = req.params.id;
    const developmentProcessResult =
      await DevelopmentProcessService.getSingleDevelopmentProcess(id);
    const resDoc = responseHandler(
      201,
      "Single DevelopmentProcess successfully",
      developmentProcessResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateDevelopmentProcess = catchError(async (req, res) => {
    const id = req.params.id;
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      isActive: req?.body?.isActive,
    };

    const payloadFiles = {
      files: req.files,
    };
    const developmentProcessResult =
      await DevelopmentProcessService.updateDevelopmentProcess(
        id,
        payload,
        payloadFiles
      );
    const resDoc = responseHandler(
      201,
      "DevelopmentProcess Update successfully",
      developmentProcessResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateDevelopmentProcessStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const developmentProcessResult =
      await DevelopmentProcessService.updateDevelopmentProcessStatus(
        id,
        status
      );
    const resDoc = responseHandler(
      201,
      "DevelopmentProcess Status Update successfully",
      developmentProcessResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteDevelopmentProcess = catchError(async (req, res) => {
    const id = req.params.id;

    const developmentProcessResult =
      await DevelopmentProcessService.deleteDevelopmentProcess(id);
    const resDoc = responseHandler(
      200,
      "DevelopmentProcess Deleted successfully",
      developmentProcessResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new DevelopmentProcessController();
