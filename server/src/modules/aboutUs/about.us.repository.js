const { AboutUsSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class AboutUsRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createAboutUs(payload, session) {
    const existingAboutUs = await this.#model
      .find({}, null, { session })
      .sort({ createdAt: -1 });
    const deleteResult = await this.#model.deleteMany({}, { session });

    
    if (deleteResult.deletedCount > 0) {
      for (const aboutUs of existingAboutUs) {
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

    const newAboutUs = await this.#model.create(payload);
    return newAboutUs;
  }

  async getAboutUsWithPagination(payload) {
    try {
      const aboutUss = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const aboutUss = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalAboutUs = await this.#model.countDocuments();

          return { doc: aboutUss, totalDoc: totalAboutUs };
        }
      );

      return aboutUss;
    } catch (error) {
      console.error("Error getting aboutUss with pagination:", error);
      throw error;
    }
  }
}

module.exports = new AboutUsRepository(AboutUsSchema);
