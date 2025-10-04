const { Router } = require("express");
const controller = require("../../modules/jobApplicant/job.applicant.controller");
// const jwtAuth = require("../../middleware/auth/jwtAuth.js");
const { upload } = require("../../middleware/upload/upload.js");

const JobApplicantRoute = Router();
// JobApplicantRoute.use(jwtAuth());

JobApplicantRoute.route("/")
  .post(upload.any(), controller.createJobApplicant)
  .get(controller.getAllJobApplicant);

JobApplicantRoute.get("/pagination", controller.getJobApplicantWithPagination);

JobApplicantRoute.route("/:id")
  .get(controller.getSingleJobApplicant)
  .put(upload.any(), controller.updateJobApplicant)
  .delete(controller.deleteJobApplicant);




module.exports = JobApplicantRoute;
