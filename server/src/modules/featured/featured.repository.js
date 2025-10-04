const FeaturedSchema = require("../../models/featured/featuredSchema");
const BaseRepository = require("../base/base.repository.js");
const pagination = require("../../utils/pagination.js");

class FeaturedRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async getFeaturedWithPagination(payload) {
    try {
      const items = await pagination(payload, async (limit, offset, sortOrder) => {
        const docs = await this.#model.find({}).sort({ createdAt: sortOrder }).skip(offset).limit(limit);
        const totalDocs = await this.#model.countDocuments();
        return { doc: docs, totalDoc: totalDocs };
      });

      return items;
    } catch (error) {
      console.error("Pagination error:", error);
      throw error;
    }
  }
}

module.exports = new FeaturedRepository(FeaturedSchema);
