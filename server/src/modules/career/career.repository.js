const { CareerSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class CareerRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createCareer(payload) {
    const newCareer = await this.#model.create(payload);
    return newCareer;
  }

  async getCareerWithPagination(payload) {
    try {
      const careers = await pagination(payload, async (limit, offset, sortOrder) => {
        const careers = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalCareer = await this.#model.countDocuments();

        return { doc: careers, totalDoc: totalCareer };
      });

      return careers;
    } catch (error) {
      console.error("Error getting careers with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new CareerRepository(CareerSchema);

