const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const TeamService = require("./team.service.js");

class TeamController {
  createTeam = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      name: req?.body?.name,
      designation: req?.body?.designation,
      details: req?.body?.details,
      // isActive: req?.body?.isActive,
    };
    const teamResult = await TeamService.createTeam(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Team Created successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllTeam = catchError(async (req, res) => {
    const teamResult = await TeamService.getAllTeam();
    const resDoc = responseHandler(200, "Get All Teams", teamResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getTeamWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const team = await TeamService.getTeamWithPagination(payload);
    const resDoc = responseHandler(200, "Teams get successfully", team);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleTeam = catchError(async (req, res) => {
    const id = req.params.id;
    const teamResult = await TeamService.getSingleTeam(id);
    const resDoc = responseHandler(
      201,
      "Single Team successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateTeam = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      name: req?.body?.name,
      designation: req?.body?.designation,
      details: req?.body?.details,
      isActive: req?.body?.isActive,
    };
    const teamResult = await TeamService.updateTeam(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Team Update successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateTeamStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const teamResult = await TeamService.updateTeamStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Team Status Update successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteTeam = catchError(async (req, res) => {
    const id = req.params.id;

    const teamResult = await TeamService.deleteTeam(id);
    const resDoc = responseHandler(
      200,
      "Team Deleted successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new TeamController();
