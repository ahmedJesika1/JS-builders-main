const { OurValuesSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class OurValuesRepository extends BaseRepository {
  #model;

  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createOurValues(payload, session) {
    const existingOurValues = await this.#model
      .find({}, null, { session })
      .sort({ createdAt: -1 });
    const deleteResult = await this.#model.deleteMany({}, { session });
    if (deleteResult.deletedCount > 0) {
      for (const aboutUs of existingOurValues) {
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

    return await this.#model.create(payload);
  }

  async getOurValuesWithPagination(payload) {
    return await pagination(payload, async (limit, offset, sortOrder) => {
      const ourValuesList = await this.#model
        .find({})
        .sort({ createdAt: sortOrder })
        .skip(offset)
        .limit(limit);

      const totalDocuments = await this.#model.countDocuments();
      return { doc: ourValuesList, totalDoc: totalDocuments };
    });
  }
}

module.exports = new OurValuesRepository(OurValuesSchema);
