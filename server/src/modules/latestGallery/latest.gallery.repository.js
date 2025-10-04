const { LatestGallerySchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class LatestGalleryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createLatestGallery(payload) {
    const newLatestGallery = await this.#model.create(payload);
    return newLatestGallery;
  }

  async getLatestGalleryWithPagination(payload) {
    try {
      const latestGallerys = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const latestGallerys = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalLatestGallery = await this.#model.countDocuments();

          return { doc: latestGallerys, totalDoc: totalLatestGallery };
        }
      );

      return latestGallerys;
    } catch (error) {
      console.error("Error getting latestGallerys with pagination:", error);
      throw error;
    }
  }
}

module.exports = new LatestGalleryRepository(LatestGallerySchema);
