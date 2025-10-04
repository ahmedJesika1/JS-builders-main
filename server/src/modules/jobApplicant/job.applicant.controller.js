const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const JobApplicantService = require("./job.applicant.service.js");

class JobApplicantController {
  createJobApplicant = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      
      // isActive: req?.body?.isActive,
    };

    const jobApplicantResult = await JobApplicantService.createJobApplicant(payload, payloadFiles, session);
    const resDoc = responseHandler(
      201,
      "JobApplicant Created successfully",
      jobApplicantResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllJobApplicant = catchError(async (req, res) => {
    const jobApplicantResult = await JobApplicantService.getAllJobApplicant();
    const resDoc = responseHandler(200, "Get All JobApplicants", jobApplicantResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getJobApplicantWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const jobApplicant = await JobApplicantService.getJobApplicantWithPagination(payload);
    const resDoc = responseHandler(200, "JobApplicants get successfully", jobApplicant);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleJobApplicant = catchError(async (req, res) => {
    const id = req.params.id;
    const jobApplicantResult = await JobApplicantService.getSingleJobApplicant(id);
    const resDoc = responseHandler(
      201,
      "Single JobApplicant successfully",
      jobApplicantResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateJobApplicant = catchError(async (req, res) => {
    const id = req.params.id;

    const payload = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      isActive: req?.body?.isActive,
    };

    const jobApplicant = await JobApplicantService.updateJobApplicant(id, payload);
    const resDoc = responseHandler(201, "JobApplicant Update successfully", jobApplicant);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateJobApplicantStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const jobApplicant = await JobApplicantService.updateJobApplicantStatus(id, status);
    const resDoc = responseHandler(
      201,
      "JobApplicant Status Update successfully",
      jobApplicant
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteJobApplicant = catchError(async (req, res) => {
    const id = req.params.id;

    const jobApplicant = await JobApplicantService.deleteJobApplicant(id);
    const resDoc = responseHandler(
      200,
      "JobApplicant Deleted successfully",
      jobApplicant
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new JobApplicantController();
