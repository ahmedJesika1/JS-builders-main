const amenitySchema = require("../../models/amenity/amenitySchema.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class AmenityRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async getAmenityWithPagination(payload) {
    try {
      const amenities = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const docs = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);

          const totalDocs = await this.#model.countDocuments();

          return { doc: docs, totalDoc: totalDocs };
        }
      );

      return amenities;
    } catch (error) {
      console.error("Error getting amenities with pagination:", error);
      throw error;
    }
  }
}

module.exports = new AmenityRepository(amenitySchema);
