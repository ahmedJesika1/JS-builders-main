const { BrochureSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class BrochureRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBrochure(payload, session) {
    const existingBrochure = await this.#model
      .find({}, null, { session })
      .sort({ createdAt: -1 });
    const deleteResult = await this.#model.deleteMany({}, { session });
    if (deleteResult.deletedCount > 0) {
      for (const aboutUs of existingBrochure) {
        if (aboutUs.photo) {
          try {
            // await removeUploadFile(aboutUs.photo);
            console.log("removed photo");
          } catch (fileError) {
            console.error(`Failed to remove file: ${aboutUs.photo}`, fileError);
          }
        }
      }
    }

    const newBrochure = await this.#model.create(payload);
    return newBrochure;
  }

  async getBrochureWithPagination(payload) {
    try {
      const brochures = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const brochures = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalBrochure = await this.#model.countDocuments();

          return { doc: brochures, totalDoc: totalBrochure };
        }
      );

      return brochures;
    } catch (error) {
      console.error("Error getting brochures with pagination:", error);
      throw error;
    }
  }
}

module.exports = new BrochureRepository(BrochureSchema);
