const { PublicationSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class PublicationRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createPublication(payload) {
    const newPublication = await this.#model.create(payload);
    return newPublication;
  }

  async getPublicationWithPagination(payload) {
    try {
      const publications = await pagination(payload, async (limit, offset, sortOrder) => {
        const publications = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalPublication = await this.#model.countDocuments();

        return { doc: publications, totalDoc: totalPublication };
      });

      return publications;
    } catch (error) {
      console.error("Error getting publications with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new PublicationRepository(PublicationSchema);

