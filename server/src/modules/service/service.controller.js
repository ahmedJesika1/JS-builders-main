const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ServiceService = require("./service.service.js");

class ServiceController {
  createService = withTransaction(async (req, res, next, session) => {
    const { title, category, details, location, youtubeLink, status } =
      req.body;

    const payloadFiles = {
      files: req.files,
    };
    let { isActive } = req.body;

    isActive = isActive === "true" || isActive === true;

    // Normalize amenities: accept array of ids or objects
    let amenities = req?.body?.amenities;
    if (Array.isArray(amenities)) {
      amenities = amenities.map((a) =>
        typeof a === "object" ? a._id || a : a
      );
    } else if (typeof amenities === "object" && amenities !== null) {
      amenities = [amenities._id || amenities];
    }

    // Normalize featuredItems: accept array of ids, objects, or JSON string.
    let featuredItems = req?.body?.featuredItems;

    // If featuredItems is a JSON string (from form-data), try to parse it
    if (typeof featuredItems === "string") {
      const trimmed = featuredItems.trim();
      if (
        (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
        (trimmed.startsWith("{") && trimmed.endsWith("}"))
      ) {
        try {
          featuredItems = JSON.parse(featuredItems);
        } catch {
          // leave as string (will be handled below)
        }
      }
    }

    if (Array.isArray(featuredItems)) {
      featuredItems = featuredItems
        .map((f) => {
          if (typeof f === "string") return { item: f, quantity: 1 };
          if (typeof f === "object" && f !== null) {
            // if frontend sent nested object with _id or item
            const id = f._id || f.item || null;
            const qty = Number(f.quantity ?? f.qty ?? 1) || 1;
            return id ? { item: id, quantity: qty } : null;
          }
          return null;
        })
        .filter(Boolean);
    } else if (typeof featuredItems === "string") {
      // single id string
      featuredItems = [{ item: featuredItems, quantity: 1 }];
    } else if (typeof featuredItems === "object" && featuredItems !== null) {
      const id = featuredItems._id || featuredItems.item || null;
      const qty = Number(featuredItems.quantity ?? featuredItems.qty ?? 1) || 1;
      featuredItems = id ? [{ item: id, quantity: qty }] : [];
    } else {
      featuredItems = [];
    }

    // Validate featuredItems item ids
    const mongoose = require("mongoose");
    for (const fi of featuredItems) {
      if (!mongoose.Types.ObjectId.isValid(fi.item)) {
        const err = new Error(`Invalid featured item id: ${fi.item}`);
        err.statusCode = 400;
        throw err;
      }
    }

    const payload = {
      title,
      category,
      details,
      location,
      amenities,
      featuredItems,
      youtubeLink,
      status,
      isActive,
    };

    const serviceResult = await ServiceService.createService(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Service Created successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllService = catchError(async (req, res) => {
    const { category, location, status, id } = req.params;
    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (status) filter.status = status;
    if (id) filter._id = id

    console.log(filter);
    

    const serviceResult = await ServiceService.getAllService(filter);
    const resDoc = responseHandler(200, "Get All Services", serviceResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getServiceWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const service = await ServiceService.getServiceWithPagination(payload);
    const resDoc = responseHandler(200, "Services get successfully", service);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleService = catchError(async (req, res) => {
    const id = req.params.id;
    const serviceResult = await ServiceService.getSingleService(id);
    const resDoc = responseHandler(
      201,
      "Single Service successfully",
      serviceResult
    );
    console.log(serviceResult);

    res.status(resDoc.statusCode).json(resDoc);
  });

  updateService = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };

    // Normalize amenities
    let amenities = req?.body?.amenities;
    if (Array.isArray(amenities)) {
      amenities = amenities.map((a) =>
        typeof a === "object" ? a._id || a : a
      );
    } else if (typeof amenities === "object" && amenities !== null) {
      amenities = [amenities._id || amenities];
    }

    // Normalize featuredItems (same shape as createService)
    let featuredItems = req?.body?.featuredItems;
    if (typeof featuredItems === "string") {
      const trimmed = featuredItems.trim();
      if (
        (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
        (trimmed.startsWith("{") && trimmed.endsWith("}"))
      ) {
        try {
          featuredItems = JSON.parse(featuredItems);
        } catch {
          // leave as string, handled below
        }
      }
    }

    if (Array.isArray(featuredItems)) {
      featuredItems = featuredItems
        .map((f) => {
          if (typeof f === "string") return { item: f, quantity: 1 };
          if (typeof f === "object" && f !== null) {
            const id = f._id || f.item || null;
            const qty = Number(f.quantity ?? f.qty ?? 1) || 1;
            return id ? { item: id, quantity: qty } : null;
          }
          return null;
        })
        .filter(Boolean);
    } else if (typeof featuredItems === "string") {
      featuredItems = [{ item: featuredItems, quantity: 1 }];
    } else if (typeof featuredItems === "object" && featuredItems !== null) {
      const id = featuredItems._id || featuredItems.item || null;
      const qty = Number(featuredItems.quantity ?? featuredItems.qty ?? 1) || 1;
      featuredItems = id ? [{ item: id, quantity: qty }] : [];
    } else {
      featuredItems = undefined; // don't overwrite if not provided
    }

    // Validate featuredItems ids if provided
    const mongoose = require("mongoose");
    if (Array.isArray(featuredItems)) {
      for (const fi of featuredItems) {
        if (!mongoose.Types.ObjectId.isValid(fi.item)) {
          const err = new Error(`Invalid featured item id: ${fi.item}`);
          err.statusCode = 400;
          throw err;
        }
      }
    }

    const isActive =
      req?.body?.isActive === "true" || req?.body?.isActive === true;

    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      amenities,
      category: req?.body?.category,
      youtubeLink: req?.body?.youtubeLink,
      location: req?.body?.location,
      status: req?.body?.status,
      isActive,
    };

    if (Array.isArray(featuredItems)) {
      payload.featuredItems = featuredItems;
    }

    const serviceResult = await ServiceService.updateService(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Service Update successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateServiceStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const serviceResult = await ServiceService.updateServiceStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Service Status Update successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteService = catchError(async (req, res) => {
    const id = req.params.id;

    const serviceResult = await ServiceService.deleteService(id);
    const resDoc = responseHandler(
      200,
      "Service Deleted successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ServiceController();
