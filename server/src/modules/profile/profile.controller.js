const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ProfileService = require("./profile.service.js");

class ProfileController {
  createProfile = withTransaction(async (req, res, next, session) => {
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

    const profileResult = await ProfileService.createProfile(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Profile Created successfully",
      profileResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllProfile = catchError(async (req, res) => {
    const profileResult = await ProfileService.getAllProfile();
    const resDoc = responseHandler(200, "Get All Profiles", profileResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getProfileWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const profile = await ProfileService.getProfileWithPagination(payload);
    const resDoc = responseHandler(200, "Profiles get successfully", profile);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleProfile = catchError(async (req, res) => {
    const id = req.params.id;
    const profileResult = await ProfileService.getSingleProfile(id);
    const resDoc = responseHandler(
      201,
      "Single Profile successfully",
      profileResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateProfile = catchError(async (req, res) => {
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

    const profile = await ProfileService.updateProfile(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Profile Update successfully",
      profile
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateProfileStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const profile = await ProfileService.updateProfileStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Profile Status Update successfully",
      profile
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteProfile = catchError(async (req, res) => {
    const id = req.params.id;

    const profile = await ProfileService.deleteProfile(id);
    const resDoc = responseHandler(
      200,
      "Profile Deleted successfully",
      profile
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ProfileController();
