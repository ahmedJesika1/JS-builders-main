const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ExperienceService = require("./experience.service.js");

class ExperienceController {
  createExperience = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      description: req?.body?.description,
      detail: req?.body?.detail,
      // pdf: req?.body?.pdf,
      quote: req?.body?.quote,
      honorName: req?.body?.honorName,
      honorDesignation: req?.body?.honorDesignation,
      video: req?.body?.video,
      // isActive: req?.body?.isActive,
    };

    const experienceResult = await ExperienceService.createExperience(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Experience Created successfully",
      experienceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllExperience = catchError(async (req, res) => {
    const experienceResult = await ExperienceService.getAllExperience();
    const resDoc = responseHandler(
      200,
      "Get All Experiences",
      experienceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getExperienceWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const experience = await ExperienceService.getExperienceWithPagination(
      payload
    );
    const resDoc = responseHandler(
      200,
      "Experiences get successfully",
      experience
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleExperience = catchError(async (req, res) => {
    const id = req.params.id;
    const experienceResult = await ExperienceService.getSingleExperience(id);
    const resDoc = responseHandler(
      201,
      "Single Experience successfully",
      experienceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateExperience = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      description: req?.body?.description,
      detail: req?.body?.detail,
      // pdf: req?.body?.pdf,
      quote: req?.body?.quote,
      honorName: req?.body?.honorName,
      honorDesignation: req?.body?.honorDesignation,
      video: req?.body?.video,
      isActive: req?.body?.isActive,
    };

    const experienceResult = await ExperienceService.updateExperience(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Experience Update successfully",
      experienceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateExperienceStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const experienceResult = await ExperienceService.updateExperienceStatus(
      id,
      status
    );
    const resDoc = responseHandler(
      201,
      "Experience Status Update successfully",
      experienceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteExperience = catchError(async (req, res) => {
    const id = req.params.id;

    const experienceResult = await ExperienceService.deleteExperience(id);
    const resDoc = responseHandler(
      200,
      "Experience Deleted successfully",
      experienceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ExperienceController();
