const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const FeaturedService = require("./featured.service.js");

class FeaturedController {
  createFeatured = withTransaction(async (req, res, next, session) => {
    const payloadFiles = { files: req.files };
    const payload = {
      label: req?.body?.label,
      isActive: req?.body?.isActive,
    };
    
    const featuredResult = await FeaturedService.createFeatured(payload, payloadFiles, session);
    const resDoc = responseHandler(201, "Featured item create সফল", featuredResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllFeatured = catchError(async (req, res) => {
    const result = await FeaturedService.getAllFeatured();
    const resDoc = responseHandler(200, "সব Featured items fetch করা হল", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getFeaturedWithPagination = catchError(async (req, res) => {
    const payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const result = await FeaturedService.getFeaturedWithPagination(payload);
    const resDoc = responseHandler(200, "Featured items pagination সহ fetch করা হল", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleFeatured = catchError(async (req, res) => {
    const id = req.params.id;
    const result = await FeaturedService.getSingleFeatured(id);
    const resDoc = responseHandler(200, "Single Featured item fetch করা হল", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateFeatured = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = { files: req.files };
    const payload = {
      label: req?.body?.title,
      isActive: req?.body?.isActive,
    };

    const result = await FeaturedService.updateFeatured(id, payloadFiles, payload);
    const resDoc = responseHandler(200, "Featured item update করা হল", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteFeatured = catchError(async (req, res) => {
    const id = req.params.id;
    const result = await FeaturedService.deleteFeatured(id);
    const resDoc = responseHandler(200, "Featured item delete করা হল", result);
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new FeaturedController();
