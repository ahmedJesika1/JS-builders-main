const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ContactService = require("./contact.service.js");

class ContactController {
  createContact = withTransaction(async (req, res, next, session) => {
    const payload = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      visitDate: req?.body?.visitDate,
      visitTime: req?.body?.visitTime,
      message: req?.body?.message,
      productID: req?.body?.productID,
      // isActive: req?.body?.isActive,
    };

    const contactResult = await ContactService.createContact(payload, session);
    const resDoc = responseHandler(
      201,
      "Contact Created successfully",
      contactResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllContact = catchError(async (req, res) => {
    const contactResult = await ContactService.getAllContact();
    const resDoc = responseHandler(200, "Get All Contacts", contactResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getContactWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const contact = await ContactService.getContactWithPagination(payload);
    const resDoc = responseHandler(200, "Contacts get successfully", contact);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleContact = catchError(async (req, res) => {
    const id = req.params.id;
    const contactResult = await ContactService.getSingleContact(id);
    const resDoc = responseHandler(
      201,
      "Single Contact successfully",
      contactResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateContact = catchError(async (req, res) => {
    const id = req.params.id;

    const payload = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      visitDate: req?.body?.visitDate,
      message: req?.body?.message,
      isActive: req?.body?.isActive,
    };

    const contact = await ContactService.updateContact(id, payload);
    const resDoc = responseHandler(201, "Contact Update successfully", contact);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateContactStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const contact = await ContactService.updateContactStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Contact Status Update successfully",
      contact
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteContact = catchError(async (req, res) => {
    const id = req.params.id;

    const contact = await ContactService.deleteContact(id);
    const resDoc = responseHandler(
      200,
      "Contact Deleted successfully",
      contact
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ContactController();
