const { DevelopmentProcessSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class DevelopmentProcessRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createDevelopmentProcess(payload) {
    const newDevelopmentProcess = await this.#model.create(payload);
    return newDevelopmentProcess;
  }

  async getDevelopmentProcessWithPagination(payload) {
    try {
      const developmentProcesss = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const developmentProcesss = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalDevelopmentProcess = await this.#model.countDocuments();

          return {
            doc: developmentProcesss,
            totalDoc: totalDevelopmentProcess,
          };
        }
      );

      return developmentProcesss;
    } catch (error) {
      console.error(
        "Error getting developmentProcesss with pagination:",
        error
      );
      throw error;
    }
  }
}

module.exports = new DevelopmentProcessRepository(DevelopmentProcessSchema);
