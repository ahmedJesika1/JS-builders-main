const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ClientService = require("./client.service.js");

class ClientController {
  createClient = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      name: req?.body?.name,
      designation: req?.body?.designation,
      details: req?.body?.details,
      // isActive: req?.body?.isActive,
    };
    const clientResult = await ClientService.createClient(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Team Created successfully",
      clientResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllClient = catchError(async (req, res) => {
    const teamResult = await ClientService.getAllClient();
    const resDoc = responseHandler(200, "Get All Teams", teamResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getClientWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const team = await ClientService.getClientWithPagination(payload);
    const resDoc = responseHandler(200, "Teams get successfully", team);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleClient = catchError(async (req, res) => {
    const id = req.params.id;
    const teamResult = await ClientService.getSingleClient(id);
    const resDoc = responseHandler(
      201,
      "Single Team successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateClient = catchError(async (req, res) => {
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
    const teamResult = await ClientService.updateClient(
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

  updateClientStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const teamResult = await ClientService.updateClientStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Team Status Update successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteClient = catchError(async (req, res) => {
    const id = req.params.id;

    const teamResult = await ClientService.deleteClient(id);
    const resDoc = responseHandler(
      200,
      "Team Deleted successfully",
      teamResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ClientController();
