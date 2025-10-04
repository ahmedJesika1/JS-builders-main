const { ProfileSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class ProfileRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createProfile(payload, session) {
    const existingProfile = await this.#model
      .find({}, null, { session })
      .sort({ createdAt: -1 });
    const deleteResult = await this.#model.deleteMany({}, { session });
    if (deleteResult.deletedCount > 0) {
      for (const aboutUs of existingProfile) {
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

    const newProfile = await this.#model.create(payload);
    return newProfile;
  }

  async getProfileWithPagination(payload) {
    try {
      const profiles = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const profiles = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalProfile = await this.#model.countDocuments();

          return { doc: profiles, totalDoc: totalProfile };
        }
      );

      return profiles;
    } catch (error) {
      console.error("Error getting profiles with pagination:", error);
      throw error;
    }
  }
}

module.exports = new ProfileRepository(ProfileSchema);
