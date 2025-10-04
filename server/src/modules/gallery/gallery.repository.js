const { GallerySchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class GalleryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createGallery(payload) {
    // const existingGallery = await this.#model
    //   .find({}, null, {})
    //   .sort({ createdAt: -1 });
    // const deleteResult = await this.#model.deleteMany({}, {});
    // if (deleteResult.deletedCount > 0) {
    //   for (const aboutUs of existingGallery) {
    //     if (aboutUs.photo) {
    //       try {
    //         // await removeUploadFile(aboutUs.photo);
    //         console.log("removed photo");
    //       } catch (fileError) {
    //         console.error(`Failed to remove file: ${aboutUs.photo}`, fileError);
    //       }
    //     }
    //   }
    // }

    const newGallery = await this.#model.create(payload);
    return newGallery;
  }

  async getGalleryWithPagination(payload) {
    try {
      const gallerys = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const gallerys = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalGallery = await this.#model.countDocuments();

          return { doc: gallerys, totalDoc: totalGallery };
        }
      );

      return gallerys;
    } catch (error) {
      console.error("Error getting gallerys with pagination:", error);
      throw error;
    }
  }
}

module.exports = new GalleryRepository(GallerySchema);
