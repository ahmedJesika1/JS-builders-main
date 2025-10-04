const { ExperienceSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class ExperienceRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createExperience(payload, session) {
    const existingExperience = await this.#model
      .find({}, null, { session })
      .sort({ createdAt: -1 });
    const deleteResult = await this.#model.deleteMany({}, { session });
    if (deleteResult.deletedCount > 0) {
      for (const aboutUs of existingExperience) {
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

    const newExperience = await this.#model.create(payload);
    return newExperience;
  }

  async getExperienceWithPagination(payload) {
    try {
      const experiences = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const experiences = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalExperience = await this.#model.countDocuments();

          return { doc: experiences, totalDoc: totalExperience };
        }
      );

      return experiences;
    } catch (error) {
      console.error("Error getting experiences with pagination:", error);
      throw error;
    }
  }
}

module.exports = new ExperienceRepository(ExperienceSchema);
