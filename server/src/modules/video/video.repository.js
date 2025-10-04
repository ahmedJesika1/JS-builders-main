const { VideoSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class VideoRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createVideo(payload) {
    const newVideo = await this.#model.create(payload);
    return newVideo;
  }

  async getVideoWithPagination(payload) {
    try {
      const videos = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const videos = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalVideo = await this.#model.countDocuments();

          return { doc: videos, totalDoc: totalVideo };
        }
      );

      return videos;
    } catch (error) {
      console.error("Error getting videos with pagination:", error);
      throw error;
    }
  }
}

module.exports = new VideoRepository(VideoSchema);
