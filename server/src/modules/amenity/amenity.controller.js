const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const AmenityService = require("./amenity.service.js");

class AmenityController {
  createAmenity = withTransaction(async (req, res, next, session) => {
    const payloadFiles = { files: req.files };
    const payload = {
      label: req?.body?.label,
      isActive: req?.body?.isActive,
    };

    const amenityResult = await AmenityService.createAmenity(
      payload,
      payloadFiles,
      session
    );

    const resDoc = responseHandler(201, "Amenity Created successfully", amenityResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllAmenities = catchError(async (req, res) => {
    const result = await AmenityService.getAllAmenities();
    const resDoc = responseHandler(200, "Get All Amenities", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAmenityWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };

    const result = await AmenityService.getAmenityWithPagination(payload);
    const resDoc = responseHandler(200, "Amenities fetched successfully", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleAmenity = catchError(async (req, res) => {
    const id = req.params.id;
    const result = await AmenityService.getSingleAmenity(id);
    const resDoc = responseHandler(200, "Single Amenity fetched successfully", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateAmenity = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = { files: req.files };
    const payload = {
      label: req?.body?.label,
      isActive: req?.body?.isActive,
    };

    const result = await AmenityService.updateAmenity(id, payloadFiles, payload);
    const resDoc = responseHandler(200, "Amenity updated successfully", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteAmenity = catchError(async (req, res) => {
    const id = req.params.id;
    const result = await AmenityService.deleteAmenity(id);
    const resDoc = responseHandler(200, "Amenity deleted successfully", result);
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new AmenityController();
